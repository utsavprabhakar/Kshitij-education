var {User}= require('./../../models/user');

var authenticate = (req, res, next)=>{
    //console.log(req.headers.cookie.substring(11));
    var token= req.headers.cookie.substring(11);
    //console.log(token);
    User.findByToken(token).then((user)=>{
        //console.log('x');
      if(!user){
        console.log('ee');
        return Promise.reject();    // function automatically stops. res.send line never gets executed. catch catches the e. 
      }
      //console.log(req.user);
      req.user= user;
      req.token= token;
      console.log(req.user);
      next();
    }).catch((e)=>{
        console.log('ee');
      res.status(401).send("Unauthorised");
    })
  }

  

  module.exports = {
      authenticate
  };