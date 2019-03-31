var {User}= require('./../../models/user');

var authenticate = (req, res, next)=>{
    var token= req.header('x-auth');
    console.log(token);
    User.findByToken(token).then((user)=>{
        //console.log('x');
      if(!user){
        //console.log('ee');
        return Promise.reject();    // function automatically stops. res.send line never gets executed. catch catches the e. 
      }
      //console.log(req.user);
      req.user= user;
      req.token= token;
      //console.log(req.user);
      next();
    }).catch((e)=>{
        //console.log('ee');
      res.status(401).send();
    })
  }

  

  module.exports = {
      authenticate
  };