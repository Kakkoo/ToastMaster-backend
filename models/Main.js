const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create schema
const UserSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "ToastMasterUsers",
  },
  meetingID: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fillerWord: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

module.exports = Main = mongoose.model("ParticipantRecords", UserSchema);
