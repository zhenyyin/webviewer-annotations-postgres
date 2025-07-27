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
console.log('Client path:', clientPath);

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

// Debug route to check what files exist
app.get('/debug/files', (req, res) => {
  const clientDir = path.join(__dirname, '../client');
  const publicDir = path.join(clientDir, 'public');
  const libDir = path.join(clientDir, 'lib');
  
  const files = {
    clientExists: fs.existsSync(clientDir),
    publicExists: fs.existsSync(publicDir),
    libExists: fs.existsSync(libDir),
    clientFiles: fs.existsSync(clientDir) ? fs.readdirSync(clientDir) : [],
    publicFiles: fs.existsSync(publicDir) ? fs.readdirSync(publicDir) : [],
    libFiles: fs.existsSync(libDir) ? fs.readdirSync(libDir) : []
  };
  
  res.json(files);
});

annotationHandler(app);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Client directory: ${clientPath}`);
});
