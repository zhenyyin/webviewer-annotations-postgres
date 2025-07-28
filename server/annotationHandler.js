// WARNING: In this sample, the query inputs are not sanitized. For production use, you should use sql builder
// libraries like Knex.js (https://knexjs.org/) to prevent SQL injection.

const { Pool } = require('pg');
const TABLE = 'annotations';

// Load environment variables from .env file (for local development)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Database configuration using environment variables
const getDatabaseConfig = () => {
  // Use Heroku DATABASE_URL if available (production)
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    };
  }
  
  // Use local environment variables (development)
  return {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: false
  };
};

// Configure PostgreSQL connection
const pool = new Pool(getDatabaseConfig());

module.exports = (app) => {
  // Create annotations table with columns documentId, annotationID and xfdfString
  pool.query(
    `CREATE TABLE IF NOT EXISTS ${TABLE} (
      id SERIAL PRIMARY KEY,
      document_id TEXT,
      annotation_id TEXT UNIQUE,
      xfdf_data TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`
  ).catch(console.error);

  // Handle POST request sent to '/server/annotationHandler.js'
  app.post('/api/annotations', async (req, res) => {
    try {
      const documentId = req.query.documentId;
      const { annotationId, xfdfString } = JSON.parse(req.body);
      const isDeleteCommand = /<delete>(.*)<\/delete>/s.test(xfdfString);

      if (isDeleteCommand) {
        // Remove the row from the database
        await pool.query(
          `DELETE FROM ${TABLE} WHERE annotation_id = $1`,
          [annotationId]
        );
      } else {
        // Save document ID, annotation ID and XFDF string to database
        await pool.query(
          `INSERT INTO ${TABLE} (document_id, annotation_id, xfdf_data)
           VALUES ($1, $2, $3)
           ON CONFLICT (annotation_id) DO UPDATE SET document_id = EXCLUDED.document_id, xfdf_data = EXCLUDED.xfdf_data`,
          [documentId, annotationId, xfdfString]
        );
      }
      res.status(200).end();
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });

  // Handle GET request sent to '/server/annotationHandler.js'
  app.get('/api/annotations', async (req, res) => {
    try {
      const documentId = req.query.documentId;
      const result = await pool.query(
        `SELECT id, annotation_id, xfdf_data, created_at FROM ${TABLE} WHERE document_id = $1`,
        [documentId]
      );
      res.header('Content-Type', 'application/json');
      res.status(200).send(result.rows);
    } catch (err) {
      console.error(err);
      res.status(204).end();
    }
  });

  // Temporary route to drop the table (for development only!)
  app.post('/api/annotations/droptestonly', async (req, res) => {
    try {
      await pool.query(`DROP TABLE IF EXISTS ${TABLE}`);
      res.status(200).send('Table dropped');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error dropping table');
    }
  });

  // Admin route to view database data (for development/debugging)
  app.get('/api/admin/annotations-data', async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${TABLE} ORDER BY created_at DESC LIMIT 100`);
      res.header('Content-Type', 'application/json');
      res.status(200).json({
        count: result.rows.length,
        data: result.rows
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  // Admin route to view table stats
  app.get('/api/admin/annotations-stats', async (req, res) => {
    try {
      const countResult = await pool.query(`SELECT COUNT(*) as total FROM ${TABLE}`);
      const recentResult = await pool.query(`SELECT COUNT(*) as recent FROM ${TABLE} WHERE created_at > NOW() - INTERVAL '24 hours'`);
      
      res.header('Content-Type', 'application/json');
      res.status(200).json({
        total_annotations: countResult.rows[0].total,
        recent_annotations_24h: recentResult.rows[0].recent
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });
}
