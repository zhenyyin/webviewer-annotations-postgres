// WARNING: In this sample, the query inputs are not sanitized. For production use, you should use sql builder
// libraries like Knex.js (https://knexjs.org/) to prevent SQL injection.

const { Pool } = require('pg');
const TABLE = 'annotations';
// const TABLE = 'webviewer_annotations';
const LOCALHOST_DATABASE_URL = 'postgresql://wv1:wv2Odem25@localhost:5432/postgres';

// Configure PostgreSQL connection using environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || LOCALHOST_DATABASE_URL,
  ssl: process.env.DATABASE_URL ? {
    rejectUnauthorized: false
  } : false
});

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
}
