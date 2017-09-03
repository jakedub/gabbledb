// Day 1
// create bcrypt, new user page, view all messages const array = [];
// Templates: new user page, log in page (username/password), view all messages, create new message
// Delete only applicable to own
const fs = require('fs');
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const routes = require("./routes");
const app = express();
const bcrypt = require ("bcryptjs");
const session = require ('express-session');
// const hash = bcrypt.hashSync(password, 8);

app.use("/css", express.static("./public"));

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache')
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(routes);

//mustache
app.engine("mustache", mustacheExpress());
app.set("views", "./views")
app.set("view engine", "mustache");


//Session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// const hash = bcrypt.hashSync(password, 8);


app.listen(3000,function () {
  console.log('Started');
})
