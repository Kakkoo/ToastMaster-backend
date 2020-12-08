const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const participants = require("../validation/participants");
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
    default: "+",
  },
  AH: {
    type: String,
    default: "-",
  },

  um: {
    type: String,
    default: "+",
  },
  UM: {
    type: String,
    default: "-",
  },
  so: {
    type: String,
    default: "+",
  },
  SO: {
    type: String,
    default: "-",
  },
  but: {
    type: String,
    default: "+",
  },
  BUT: {
    type: String,
    default: "-",
  },
  well: {
    type: String,
    default: "+",
  },
  WELL: {
    type: String,
    default: "-",
  },
  ok: {
    type: String,
    default: "+",
  },
  OK: {
    type: String,
    default: "-",
  },
  falseStart: {
    type: String,
    default: "+",
  },
  FALSESTART: {
    type: String,
    default: "-",
  },
  wordRepititor: {
    type: String,
    default: "+",
  },
  WORDREPITITOR: {
    type: String,
    default: "-",
  },
  other: {
    type: String,
    default: "+",
  },
  OTHER: {
    type: String,
    default: "-",
  },
  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = Participants = mongoose.model("ParticipantNames", UserSchema);
