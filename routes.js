const express = require('express');
const router = express.Router();
const models = require("./models");

//Home Page. Need to add in name for the view mustache file
router.get("/view", function (req, res) {
    models.Message.findAll().then(function (message) {
        res.render("view", {
          data: data,
          name: req.session.username
        });
    })
});

router.post('/view', function(req,res){
  let message = models.Messages.create({
    body: req.body.body = req.session.message
  })
  res.redirect('/view')
});

// //Loggin Into System. Needs to check against db. Then store in session. TODO: Works but doesn't hit view.

router.get('/login', function(req, res){
  res.render('login')
});

router.post('/login', function(req, res){
  let username = req.body.username;
  let password = req.body.password;
  models.User.findOne({
    where: {
      username: username,
      password: password
    }
  }).then(function(user){
    if (user.password === password){
      req.session.password = password;
      req.session.userId = user.id;
      res.redirect('/view');
    } else {
      res.redirect('/register');
      console.log("Session login" + req.session);
    }
  })
})


//Register Render Page
router.get("/register", function(req,res){
  res.render("register");
})

//Register but only create. Should be storing the password in bcrypt. Bcrypt not working. Redirects and appears to store. Does not confirm password.
router.post('/register', function(req,res){
  let newUser = {
    username: req.body.username,
    password: req.body.password
  }
  models.User.create(newUser).then(function(user){
    req.username = user.username;
    req.password = user.password;
    res.redirect('/login');
  })
});

//Logging out and redirect to Login Page
router.get('/logout', function(req, res){
  req.session.destroy(function(err){})
  res.redirect('/login');
  console.log(req.session);
});

//Gab
router.post('/message', function(req, res){
  let newMessage = models.Message.build({
    userId: req.body.userId,
    title: req.body.title,
    body: req.body.body
  })
  newMessage.save().then(function(message) {
    console.log(message);
  })
});

router.get('/message', function(req, res){
  models.Message.findAll().then(function(message){
    res.render('view', {
      message: message,
      name: req.session.username
    })
  })
});

//home Page




//Likes
router.post('/like', function(req, res){
  let like = models.like.create({
    like: true,
    userId: req.session.userId,
    messageId: req.session.messageId
  })
});


router.get('/likes', function(req, res){
  models.Like.findall({
    include: [{
      model: models.User,
      as: 'user'
    }]
  }).then(function(likes){
    res.render('likes', {data:data})
  });
});


//Edit Gab...doesn't work
// router.post("/home/:id/edit", function(req,res){
//   console.log("Do you see me?");
//   let input = req.body.body;
//   models.Messages.findById(req.body.id).then(function(edit){
//     req.edit.update(input).then(function(){
//       res.redirect('/todo');
//     })
//   })
// })


//Like A Gab
router.get("/home/:messageId",function (req, res) {
    req.body.likes += 1;
    req.body.save().then(function () {
        res.redirect('/home');
    });
});


//Delete Gab. Ideally works
router.post("/home/:id/delete", function (req, res) {
  models.Messages.findById(req.params.id).then(function(message){
    message.destroy().then(function () {
        res.redirect("/");
      })
    });
});

module.exports = router;
