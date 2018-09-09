var nodemailer = require('nodemailer');
var config = require('../config/config');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASS,
  }
});

/*
var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};*/
let send = () =>{
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});}

module.exports = send;