const express = require("express");
const bcrypt = require("bcryptjs");
const Main = require("../../extra/StudentName");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
const User = require("../../models/User");
const router = express.Router();
router.get("/test", (req, res) => res.json({ msg: "studentName works" }));

//@route POST  /api/main/newPerson
//@desc  Add new person
//@access private
router.post("/studentName", (req, res) => {
  const { errors, isValid } = validateNewPerson(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ studentName: req.body.studentName }).then((user) => {
    if (user) {
      return res.status(400).json({ name: "This person name already exists" });
    } else {
      const newPerson = new User({
        studentName: req.body.studentName
      });
      newPerson
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    }
  });
});

module.exports = router;
