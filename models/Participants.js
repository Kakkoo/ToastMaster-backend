const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create schema
const UserSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "ToastMasterUsers",
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Participants = mongoose.model("ParticipantNames", UserSchema);
