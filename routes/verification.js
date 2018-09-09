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



module.exports = router;