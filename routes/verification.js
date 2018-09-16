var nodemailer = require('nodemailer');
const config = require('../config/config');
let User = require('../models/user');
const express = require('express');
const router = express.Router();
let UserVerification = require('../models/UserVerification');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASS,
  }
});



router.post('/emailOtp', (req, res)=>{
   console.log(req.body.id);
   let id = req.body.id;
 User.findById(id,(err,user)=>
{ let firstName = user.name.split(" ")[0];
  let username = user.username;
  let otp =  Math.floor(100000 + Math.random() * 900000);
  let now =  new Date().toISOString();
  let link = `${config.HOST}/verification/email/${otp}${id}`;
   let query = {username:username};
 userVarification = {
      emailotp:otp,
      emailotpgenerated:now
    }    
  
  var mailOptions = {
  from: config.EMAIL,
  to: user.email,
  subject: 'Verification Email',
  html: `Hello ${firstName}, <br> <br> 
  Please Click on the link to verify your email.
  <br><br> 
  <a href="${link}">Click here to verify</a>  <br> 
  <br> 
  Thanks,`
};

  UserVerification.update(query, userVarification, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
res.send("SSS");
     
    }
  });
}
);

});




//Verify Email Route
router.get('/email/:uniquecode', (req, res)=>{

let uniquecode = req.params.uniquecode;

let id = uniquecode.substring(6);
let otp = uniquecode.substring(0,6);

User.findById(id,(err,user)=>
{ 
   if(err){
      console.log(err);
      return;
    } else {
  let username = user.username;
  console.log(username);
  UserVerification.findOne({username:username},(err,uservarification)=>
  {console.log(uservarification);
   
    if(err){
      console.log(err);
      return;
     } else{
       let now = new Date();
       let otpgenrated = new Date(uservarification.emailotpgenerated);
       let timeSpan = now - otpGenrated;
       
       const tenMinutes = 10*60*1000;

          if(timeSpan>tenMinutes)
            {
              res.send({error:"otp Expired"});
              return;
            }

             if(uservarification.emailotp==otp)
        { console.log('verified');
           updatedUserVarification = {
           emailverified:true,
         }
          let query = {username:username};
         UserVerification.updateOne(query,updatedUserVarification,(err)=>{
           
     if(err){
      console.log(err);
      res.send({error:err});
      return;
    } else {

      console.log("userVerified");
      res.send({Success:true});


    }

         });
        }
        else{
          res.send({error:"some issue"})
        }

    }
  }

);
}

});
});

router.get('/isverified/:username',(req,res)=>
{
  let username = req.params.username;
  UserVerification.findOne({username:username}, (err,User)=>
{
  if(err)
    {
      console.log(err);
    res.send({error:err})
    }
  else{
  if(user.emailverified)
   { req.send({verified:true});}
  else
    { req.send({verified:false});}
  }
});
});

module.exports = router;