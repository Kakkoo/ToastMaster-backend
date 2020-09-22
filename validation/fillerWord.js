const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateFillerWordsInput(data) {
  let errors = {};

  if (!Validator.isLength(data.fillerWord, { min: 2, max: 10 })) {
    errors.name = "name needs to between 2 and 10 characters";
  }

  if (isEmpty(data.fillerWord)) {
    errors.fillerWord = "fillerWord is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
