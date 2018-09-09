var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASS,
  }
});



router.get('/register', (req, res)=>{
  console.log(1);
  var mailOptions = {
  from: 'tu369342@gmail.com',
  to: 'amandeep.123006@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};
console.log(mailOptions);
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})
res.send("SSS");

});

module.exports = router;