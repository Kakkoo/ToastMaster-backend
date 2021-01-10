const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatefRegisterInput(data) {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

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
