const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateParticipantsInput(data) {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 2, max: 40 })) {
    errors.name = "name needs to between 2 and 40 characters";
  }

  if (isEmpty(data.name)) {
    errors.name = "name is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
