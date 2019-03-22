var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
const port= process.env.PORT || 3000;
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ks", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

 
app.get("/", function(req, res){
    res.render("index");
 });

 app.get('/login', function(req, res){
     res.render('login');
 });

 app.get('/register', function(req, res){
     res.render('register');
 });

 app.post('/register', function(req, res){
     console.log(req.body);
     res.redirect('/');
 })
 
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

 let users = require('./routes/users');
 app.use('/users', users);
 app.listen(port, ()=>{
    console.log(`Server initialised at port ${port}`);
  });