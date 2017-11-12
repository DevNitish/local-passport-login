
// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port=process.env.PORT||8080;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our database
app.use(function(req, res, next) {
    if (mongoose.connection.readyState != 1) {
      mongoose.connect(configDB.url, function(error) {
        if (error) {
          console.log("error while connecting to mongo");
          throw error;
        } // Handle failed connection
        console.log('conn ready:  ' + mongoose.connection.readyState);
        next();
      });
    } else {
      next();
    }
  });

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));

//app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(__dirname + '/views'));
// required for passport
app.use(session({ secret: 'thisisnitish' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
