const express = require('express');
const router = express.Router();
const models = require("./models");

//Home Page
router.get('/', function (req,res){
  res.render('view');
})

// Index all messages
router.get("/view", function (req, res) {
    models.Messages.findAll().then(function (message) {
        res.render("view", {message: message});
    })
});

//login. Uses session to store. Has no users at the moment so won't work. Not using bcrypt here. TODO: Update for bcrypt
router.get('/login', function(req, res){
  res.render('login');
})
//Loggin Into System. Needs to check against db. TODO: Doesn't work
router.post('/login', function(req, res){
  let currentUser = {};
  req.body.username = req.session.username
  req.body.password = req.session.password
  models.Users.find(newUser).then(function(userCheck){
    if (currentUser){
      res.redirect('/view')
    }
  });

//Register Render Page
router.get("/register", function(req,res){
  res.render("register");
})

//Register Pull Username/Password. Think I did this correctly. Doesn't really work. The Where would also need an error of not unique.
router.post('register', function(req,res){
  let newUser = {
    username: req.body.username,
    passwordHash: bcrypt.hashSync(req.body.password, 8)
  };
  models.Users.findOrCreate({
    where: {
      username: req.body.username
    },
    defaults: {
      username: req.body.username,
      passwordHash: bcrypt.hashSync(req.body.password, 8);
    }
  }).spread((user, created), function{
    console.log(user.get({
      plain:true;
    }))
    console.log(created);
  })
})

//Logging out and redirect to Login Page
router.get("/logout", function(req,res) {
  req.session.destroy();
  res.redirect("/login");
})

//Create Gab
//Create an action
router.post('/create', function(req,res){
  const newMessage = {
    body: req.body.body
  }
  models.Messages.create(newMessage).then(function(message){
    res.redirect('/');
  })
})

//Index action
router.post('/create', function(req,res) {
  res.render('create');
})

//Render to home?
router.get('/create', function(req,res){
  models.Messages.findAll().then(function(messages){
    res.render('view', {data: data})
  });
});


//Edit Gab...doesn't work
router.post("/view/:id/edit", function(req,res){
  console.log("Do you see me?");
  let input = req.body.body;
  models.Messages.findById(req.body.id).then(function(edit){
    req.edit.update(input).then(function(){
      res.redirect('/todo');
    })
  })
})

//Like A Gab
router.get("/view/:messageId",function (req, res) {
    req.body.likes += 1;
    req.body.save().then(function () {
        res.redirect('/view');
    });
});

//Displaying the likes. Don't know if works based on everything else being broken. Needs to display the username of liked
router.post('/list/:messageId', function (req,res){
  res.render('/list', {data, data})
  })
})

//Delete Gab. TODO: Doesn't appear to work
router.post("/home/:id/delete", function (req, res) {
  models.Messages.findById(req.params.id).then(function(message){
    message.destroy().then(function () {
        res.redirect("/");
      })
    });
});

module.exports = router;
