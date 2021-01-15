const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEmail(data) {
  let errors = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = " Email is invalid";
  }

  if (isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
