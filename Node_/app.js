const express = require('express');
const { connectToDb } = require('./db'); // Import only connectToDb
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
app.set('view engine', 'ejs'); // Set EJS as the view engine
// var bodyParser = require('body-parser');

app.use(express.json()); // Parse incoming JSON data

// Connect to MongoDB first, ensuring routes are defined only after success
connectToDb()
  .then(db => {
    console.log('Connected to MongoDB database');


    // Use the db object in your routes
    // for contact form
    app.get('/contact', function(req, res) {
      res.render('contact');
    });
    app.post('/contact', urlencodedParser, (req, res) => {
      const titaniumData = req.body; // Access form data from request body
      console.log(req);
      db.collection('contact')
        .insertOne(titaniumData)
        .then(result => {
          res.status(201).json({ message: 'Titanium information added successfully!', result });
        })
        .catch(err => {
          console.error('Error adding titanium:', err);
          res.status(500).json({ message: 'Could not add titanium information' });
        });
    });


    // for signup form
    app.get('/signup', function(req, res) {
      res.render('signup');
    });
    app.post('/signup', urlencodedParser, (req, res) => {
      const titaniumData = req.body; // Access form data from request body
      console.log(req);
      db.collection('signup')
        .insertOne(titaniumData)
        .then(result => {
          res.status(201).json({ message: 'Titanium information added successfully!', result });
        })
        .catch(err => {
          console.error('Error adding titanium:', err);
          res.status(500).json({ message: 'Could not add titanium information' });
        });
    });

    app.get('/', function(req, res) {
      res.render('home');
    });

    app.get('/consult', function(req, res) {
      res.render('consult');
    });

    app.get('/about', function(req, res) {
      res.render('about');
    });

    app.get('/consultWithDoctor', function(req, res) {
      res.render('consultWithDoctor');
    });

    app.post('/consultWithDoctor', urlencodedParser, (req, res) => {
      const titaniumData = req.body; // Access form data from request body
      console.log(req);
      db.collection('consultancy')
        .insertOne(titaniumData)
        .then(result => {
          res.status(201).json({ message: 'Titanium information added successfully!', result });
        })
        .catch(err => {
          console.error('Error adding titanium:', err);
          res.status(500).json({ message: 'Could not add titanium information' });
        });
    });


    // code starts listening after completing of code 
    // Start listening after successful connection
    app.listen(3000, () => {
      console.log('app listening on port 3000');
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    // Handle connection error gracefully (e.g., exit the application)
    process.exit(1); // Example: Exit with non-zero code to indicate failure
  });

