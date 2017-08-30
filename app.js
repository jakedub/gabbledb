// Day 1
// create bcrypt, new user page, view all messages const array = [];
// Templates: new user page, log in page (username/password), view all messages, create new message
// Delete only applicable to own

// Create log in page
// Create templates/views
const express = require ("express");
const app = express ();
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
const session = require("express-session");


//mustache
app.engine("mustache", mustacheExpress());
app.set("views", "./views")
app.set("view engine", "mustache");

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//bcrypt
const bcrypt = require ("bcryptjs");
const hash = bcrypt.hashSync(password, 8);


//Session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

//login. Uses session to store. Has no users at the moment so won't work. Not using bcrypt here. TODO: Update for bcrypt
app.get('/', function(req, res){
  let newUser = {};
  newUser.username = req.session.username
  newUser.password = req.session.password
  if (typeof req.session.username !== 'undefined'){
    res.render('index', newUser);
  }
  else{
    console.log('redirected to login!');
    res.redirect('/login');
  }
});

app.get('/login', function(req, res){
  res.render('login');
})

app.post('/login/home', function(req, res){
  let name = req.body.username;
  let password = req.body.password;
  console.log(req.body);
  if (users[name] === password){
    req.session.username = name
    req.session.password = password
    res.redirect('/');
  }
  else{
    res.redirect('/login');
    console.log('nope');
  }
});

//register
app.get("/register", function(req,res){
//need to get something like:
newUser.username = req.session.username
newUser.password = req.session.password
newUser.confirm = req.session.confirm
if (newUser.password !== newUser.cofirm){
  res.redirect('/');
}
else {
  res.redirect('/home');
  console.log("confirm matches password in session");
}
})

app.post('/register/auth', function(req,res){

})

app.get("/register", function(req,res){
  res.render("register");
})

//logging out
app.get("/logout", function(req,res) {
  req.session.destroy();
  res.redirect("/");
})

app.listen(3000,function () {
  console.log('Started');
})
