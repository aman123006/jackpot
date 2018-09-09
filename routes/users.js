const express = require('express');
const router = express.Router();
//const bcrypt = require('bcryptjs');

let User = require('../models/user');


router.get('/register', (req, res)=>{});

router.post('/register', function(req, res){
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
 
    let newUser = new User({
      name:name,
      email:email,
      username:username,
      password:password,
    });
 console.log('name');
    console.log(name);

    newUser.save(function(err){
          if(err){
              res.status(500).json({ err })
            return;
          } else {
           res.status(200).json({ message:"sucess"})
          }});
});

module.exports = router;