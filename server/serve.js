// This file is to run a server in localhost:3000
// Code to handle annotations is in annotationHandler.js

// const express = require('express');
// const bodyParser = require('body-parser');
// const open = (...args) => import('open').then(({default: open}) => open(...args));
// const annotationHandler = require('./annotationHandler');

// const app = express();

// app.use(bodyParser.text());
// app.use('/client', express.static('client')); // For statically serving 'client' folder at '/'

// annotationHandler(app);

// // Run server
// app.listen(3000, '0.0.0.0', () => {
// 	console.info(`Server is listening at http://localhost:3000/client/index.html`);
// 	open('http://localhost:3000/client/index.html');
// });


////
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const annotationHandler = require('./annotationHandler');

// Database configuration
const pool = new Pool({
  user: 'wv1',
  host: 'localhost',
  database: 'webviewer',
  // database: 'webviewer_annotations',
  password: 'wv2Odem25',
  port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.text());
app.use('/client', express.static('client')); // For statically serving 'client' folder at '/'

annotationHandler(app);

// Create annotations table if it doesn't exist
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS annotations (
        id SERIAL PRIMARY KEY,
        document_id VARCHAR(100) NOT NULL,
        xfdf_data TEXT NOT NULL,
        user_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Server running on port ${PORT}`);
});
