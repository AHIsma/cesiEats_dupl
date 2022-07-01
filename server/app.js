var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')
require('dotenv').config();

var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ordersRouter = require('./routes/orders');
var restaurantsRouter = require('./routes/restaurants');
var blacklistedtokensRouter = require('./routes/blacklistedTokens');

var app = express();
app.use(cors({origin: true, credentials: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/blacklistedtoken', blacklistedtokensRouter);

// Mongoose Login
mongoose.connect(process.env.MONGODB_URL, {
  sslCert: "mdbcert.pem",
  sslKey: "mdbcert.pem",
});

// SQL Server Login
var Connection = require('tedious').Connection;  
var config = {  
    server: 'your_server.database.windows.net',  //to be defined
    authentication: {
        type: 'default',
        options: {
            userName: 'your_username', //to be defined
            password: 'your_password'  //to be defined
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'your_database'  //to be defined
    }
};  
var connection = new Connection(config);  
connection.on('connect', function(err) {
  if (err) {
    console.log(err.message)
  } else {
    // If no error, then good to proceed.
    console.log("SQL Server - Connecté");  
  }
});

connection.connect();
 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function (){
    console.log("MongoDB - Connecté"); 
}); 

module.exports = app;