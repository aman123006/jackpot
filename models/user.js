const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    unique : true,
    required: true
  },
  username:{
    type: String,
    unique : true,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  phone:
  {
    type:Number,
    //unique : true,
    required: true
  },
  
});

const User = module.exports = mongoose.model('User', UserSchema);
