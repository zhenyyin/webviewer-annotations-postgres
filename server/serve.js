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
const app = express();
const annotationHandler = require('./annotationHandler');

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.text());

// Serve static files from client directory
app.use('/client', express.static(path.join(__dirname, '../client')));

// Serve the main page at root
app.get('/', (req, res) => {
  res.redirect('/client/index.html');
});

annotationHandler(app);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
