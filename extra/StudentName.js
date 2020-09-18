const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const MainSchema = new Schema({
  studentName: {
    type: String,
    required: true,
  }
});

module.exports = User = mongoose.model("ToastMasterUsers", MainSchema);

//const User = mongoose.model('ToastMasterUsers', MainSchema);
//module.exports = User;
