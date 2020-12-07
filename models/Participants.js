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
  ah: {
    type: String,
    default: "ah",
  },
  ah: {
    type: String,
    default: "ah",
  },
  um: {
    type: String,
    default: "um",
  },
  so: {
    type: String,
    default: "so",
  },
  but: {
    type: String,
    default: "but",
  },
  well: {
    type: String,
    default: "well",
  },
  ok: {
    type: String,
    default: "ok",
  },
  falseStart: {
    type: String,
    default: "falseStart",
  },
  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = Participants = mongoose.model("ParticipantNames", UserSchema);
