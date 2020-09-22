const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMainInput(data) {
  let errors = {};

  if (!Validator.isLength(data.meetingID, { min: 2, max: 40 })) {
    errors.meetingID = "MeetingID needs to between 2 and 40 characters";
  }

  if (isEmpty(data.meetingID)) {
    errors.meetingID = "MeetingID is required";
  }

  if (isEmpty(data.name)) {
    errors.name = "name field is required";
  }
  if (isEmpty(data.fillerWord)) {
    errors.fillerWord = "filler word is required";
  }
   if (isEmpty(data.count)) {
     errors.count = "count field is required";
   }
   return {
     errors,
     isValid: isEmpty(errors),
   };
};