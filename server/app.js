var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
//var session = require('express-session');
//var cookieParser = require('cookie-parser');
var _ = require('lodash');
//var flash = require('connect-flash');
const port= process.env.PORT || 3000;
var mongoose = require("mongoose");

var {User} = require('./../models/user');
var {authenticate} = require('./middleware/authenticate');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ks", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));
//app.use(flash());
app.set("view engine", "ejs");


 
app.get("/", function(req, res){
    console.log(req.user);
    res.render("index");
 });

 app.get('/user/:id', function(req, res){
    User.findById(req.params._id).then((user)=>{
       res.render(user, {
          user: user
       });
    }).catch((e)=>{
       res.render()
    })
 })

 app.post('/login', function(req, res){
   var body = _.pick(req.body, ['email', 'password']);
   //console.log(body);
   User.findByCredentials(body.email, body.password).then((user)=>{
      //console.log(user);
     return user.generateAuthToken().then((token)=>{
       res.header('x-auth', token).send(user);
     })
   }).catch((e)=>{
     res.status(400).send();
   })
 })


 app.get('/register', function(req, res){
     res.render('register');
 });

 app.get('/login', function(req, res){
    res.render('login');
 })

 app.post('/register', (req,res)=>{
   var body = _.pick(req.body, ["email", "password"]);
   //console.log(body);
   var newUser = new User(body);
   newUser.save().then(()=>{
     //xconsole.log('amen1')
     return newUser.generateAuthToken();
   }).then((token)=>{
     //console.log("amen2");
     console.log(token);
     res.header('x-auth', token).send("hehe");
   }).catch((e)=>{
     console.log('amen3');
     res.status(400).send(e);
   })
 });
  
 app.get('/profile',authenticate,(req, res)=>{
    res.render('profile', {
       user: req.user
    });
 });
 
 app.get("/introduction", function(req, res){
    res.render("introduction");
 });
 app.get("/class12", function(req, res){
    res.render("class12");
 });
 app.get("/ourteam", function(req, res){
    res.render("ourteam");
 });
 app.get("/reviews", function(req, res){
    res.render("reviews");
 });
 app.get("/vedicmaths", function(req, res){
    res.render("vedicmaths");
 });
 app.get("/walloffame", function(req, res){
    res.render("walloffame");
 });
 app.get("/#updates", function(req, res){
    res.render("index#updates");
 });
 
 app.get("/#gallery", function(req, res){
    res.render("index#gallery");
 });
 
 app.get("/#contact-us", function(req, res){
    res.render("index#contact-us");
 });
 
 app.get("/#contact-details", function(req, res){
    res.render("index#footer");
 });
 
 app.get("/#location", function(req, res){
    res.render("index#map-location");
 });
 
 app.get("/form",function(req, res) {
    ke.find({},function(err,allkes){
        if(err)
        console.log(err);
        else
        {
            res.render("form",{kes:allkes});
        }
 
    });
 
 });
 
 app.post("/form", function(req, res){
 
         var name=req.body.name;
         var email=req.body.email;
         var message=req.body.message;
         var newke= {name: name,email:email,message:message}
         ke.create(newke,function(err,newlycreated){
             if(err)
             console.log(err);
             else
             {
                res.redirect("/form");
             }
         });
 
 
 });
 
 
 
 app.use(express.static('stylesheets'));
 app.use(express.static('views'));
 app.use(express.static('js'));
 app.use(express.static('img'));
 app.use(express.static('fonts'));

 let users = require('../routes/users');
 app.use('/users', users);
 app.listen(port, ()=>{
    console.log(`Server initialised at port ${port}`);
  });