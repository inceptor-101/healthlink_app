var express = require('express');
var bodyParser = require(('body-parser'));
const { connectToDb } = require('./db'); // Import only connectToDb
var app = express();

app.set('view engine', 'ejs'); // Set EJS as the view engine
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Listen on port 3000
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});

// Route for the profile page
// app.get('/profile', function(req, res) {
//   var data = { // Data object for the profile
//     age: 29,
//     job: 'ninja',
//     hobbies: ['eating', 'fighting', 'fishing']
//   };
//   res.render('profile', { data: data }); // Render the profile.ejs template with the data
// });

// Other routes (assuming they don't have errors)
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// app.get('/contact', function(req, res) {
//   res.send('this is the contactpage');
// });

app.get('/form', function(req, res) {
  res.render('form');
});

app.post('/form', urlencodedParser, function(req, res) {
 console.log(req.body)
  res.render('form');
});

// ... other routes
