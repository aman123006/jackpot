const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var config = require('./config/config');


mongoose.connect(config.DB_URL);
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

const app = express();

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res)=>
{
    res.send("Test");
});

// Route Files
//let articles = require('./routes/articles');
let users = require('./routes/users');
//app.use('/articles', articles);
app.use('/users', users);

let verification = require('./routes/verification');
app.use('/verification', verification);

app.listen(config.PORT, function(){
  console.log('Server started on port 3000...');
});