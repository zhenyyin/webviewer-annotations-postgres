// This file is to run a server in localhost:3000

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const annotationHandler = require('./annotationHandler');

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.text());

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static files from client directory
const clientPath = path.join(__dirname, '../client');

// Check if client directory exists
if (fs.existsSync(clientPath)) {
  console.log('Client directory exists');
  app.use('/client', express.static(clientPath));
} else {
  console.log('Client directory does not exist');
}

// Serve the main page at root
app.get('/', (req, res) => {
  res.redirect('/client/index.html');
});

annotationHandler(app);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Client directory: ${clientPath}`);
});
