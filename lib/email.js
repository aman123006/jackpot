var nodemailer = require('nodemailer');
var config = require('../config/config');



 var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASS,
  }
});


const email = {

   
    path:"",
     abc: function(mailOptions){ console.log('2');
    console.log(mailOptions);},

}

module.exports = email;