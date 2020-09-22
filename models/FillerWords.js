const mongoose = require("mongoose");
const fillerWord = require("../validation/fillerWord");
const Schema = mongoose.Schema;
//Create schema
const UserSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "ToastMasterUsers",
  },
  fillerWord: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = FillerWords = mongoose.model("FillerWords", UserSchema);
