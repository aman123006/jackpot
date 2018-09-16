const express = require('express');
const router = express.Router();
const config = require('../config/config');
let UserVerification = require('../models/UserVerification');
//const bcrypt = require('bcryptjs');


let User = require('../models/user');




router.post('/changepassword', function(req, res){
  
   let user1={password :req.body.newpasword};
let {password, username}=req.body;
console.log(password);
User.findOne({username:username},(error,user)=>
{
  
  if(error)
    {console.log(error);
    res.send({error});}
    else{console.log("Aman");
    if(!user){
      res.send({error:"No Such User"});
      return;
    }
      if(user.password === password)
        { 
          User.updateOne({username},user1,(error)=>
    {
      if(error) 
        {
          console.log(err);
    res.send({error});
        }else{
          res.send({success:true});
        }
    });
  }
  else
    {
       res.send({error:"Incorrect Password"});
    }
    }
})


});

router.post('/register', function(req, res){
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
    const phone = req.body.phone;
 
    let newUser = new User({
      name:name,
      email:email,
      username:username,
      password:password,
      phone
    });

    newUserVarification = new UserVerification({
      username:username
    });
 console.log('name');
    console.log(name);

    newUser.save(function(err){
          if(err){
           
        
              res.status(500).json({ err })
            return;
          } else { newUserVarification.save((err)=>
          {if(err){
           
        
              res.status(500).json({ err })
            return;}

            res.status(200).json({ message:"sucess"})
          });
           
          }});
});


module.exports = router;