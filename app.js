var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();
var PORT = process.env.port || 3000;

app.locals.moment = require('moment');
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var dbURL = 'mongodb://localhost/movies';
mongoose.connect(dbURL, {useMongoClient: true});

app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'moviestation',
    cookie:{maxAge:1000*60*60*24*30},
    store: new MongoStore({
        url: dbURL,
        collection: 'sessions'
    })
}));

require('./config/route')(app);

app.listen(PORT);
console.log('moviesite started at port: ' + PORT);

