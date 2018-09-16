const mongoose = require('mongoose');

UserVerificationSchema = mongoose.Schema({
  username:{
    type: String,
    required: true,
   
  },
  emailotp:{
    type: Number,
    
  },
 
  phoneotp:
  {
    type:Number,
    
  },
emailverified:
{
    type:Boolean,
    },
phoneverified:{
      type:Boolean,
},
    emailotpgenerated:{
    type: String,
    
  },
 phoneotpgenerated:{
    type: String,
    
  },

  
});

const UserVerification = module.exports = mongoose.model('UserVerification', UserVerificationSchema)
