const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
     //required: true,
  },
  avatar: {
    type: String,
  },
 
  newPassword: {
   type: String,
  },
 
  date: {
    type: Date,
    default: Date.now,
  },
  accessToken: {
    type: String,
  },
  signedRequest: {
    type: String,
  },
  userID: {
    type: String
  }

});


module.exports = User = mongoose.model('ToastMasterUsers', UserSchema);

//const User = mongoose.model('ToastMasterUsers', UserSchema);
//module.exports = User;