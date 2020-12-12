const express = require("express");
const router = express.Router();
const Main = require("../../models/Main");
const Participants = require("../../models/Participants");
const FillerWords = require("../../models/FillerWords");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("../../config/keys");
const validateMainInput = require("../../validation/main");
const validateGetRecordInput = require("../../validation/getRecord");
const validateParticipantsInput = require("../../validation/participants");
const validateFillerWordsInput = require("../../validation/fillerWord");
const User = require("../../models/User");
//router.get("/test", (req, res) => res.json({ msg: "Main works" }));
// @route   POST /api/main
// @desc    Meeting filler words record
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMainInput(req.body);
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    const mainFields = {};
   // mainFields.user = req.user.id;
    if (req.body.name) mainFields.name = req.body.name;
    if (req.body.fillerWord) mainFields.fillerWord = req.body.fillerWord;
    if (req.body.count) mainFields.count = req.body.count;
    new Main(mainFields).save().then((main) => res.json(main));
  }
);
// @route   POST /api/main/add Participants
// @desc    adding new participants
// @access  Private
router.post(
  "/addparticipant",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateParticipantsInput(req.body);
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    Participants.findOne({ name: req.body.name }).then((user) => {
      if (user) {
        return res.status(400).json({ name: "Name already exist" });
      }
      const newParticiapnt = new Participants({
        name: req.body.name,
      });
      newParticiapnt
        .save()
        .then((participant) => res.json(participant))
        .catch();
    });
  }
);
// @route   GET /api/main/allParticipants
// @desc    all participants
// @access  Private
router.get(
  "/allparticipants",
 //passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Participants.find().then((participants) => {
      if (!participants) {
        return res.status(400).json({ name: "No participants" });
      }
      console.log("till here");
      let names = [];
      for (let i = 0; i < participants.length; i++) {
        names.push(participants[i].name);
      }
      return res.status(200).json(participants);
      //return res.status(200).json(names);
    });
  }
);
// @route   POST /api/main/add Participants
// @desc    removing participants
// @access  Private
router.post(
  "/removeparticipant",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateParticipantsInput(req.body);
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    Participants.findOne({ name: req.body.name }).then((user) => {
      if (!user) {
        return res.status(400).json({ name: "Name does not exist" });
      }
     Participants.deleteOne({name:req.body.name})
     .then((participant) => res.json(participant)).catch(err => (console.log(err)));
      
    });
  }
);
// @route   POST /api/main/add fillerWords
// @desc    adding new fillerWords
// @access  Private
router.post(
  "/fillerWord",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateFillerWordsInput(req.body);
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    const fillerWordsFields = {};
    fillerWordsFields.user = req.user.id;
    if (req.body.fillerWord) fillerWordsFields.fillerWord = req.body.fillerWord;
    new FillerWords(fillerWordsFields)
      .save()
      .then((fillerWords) => res.json(fillerWords));
  }
);
// @route   GET /api/main/get Participant record
// @desc    getting record for participant
// @access  Private

router.get(
  "/getRecord",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const meetingID = req.body.meetingID;
    const name = req.body.name;
    let aaCount = 0;
    let umCount = 0;
    let hmCount = 0;
    let thisCount = 0;
    let thatCount = 0;
    const { errors, isValid } = validateGetRecordInput(req.body);
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Main.find({ meetingID, name })
      .then((user) => {
        if (!user) {
          return res
            .status(400)
            .json({ name: "This name doesn't have record" });
        } else {
          for (let i = 0; i < user.length; i++) {
            if (user[i].fillerWord === "aa") {
              aaCount += 1;
            }
            if (user[i].fillerWord === "um") {
              umCount += 1;
            }
            if (user[i].fillerWord === "hm") {
              hmCount += 1;
            }
            if (user[i].fillerWord === "this") {
              thisCount += 1;
            }
            if (user[i].fillerWord === "that") {
              thatCount += 1;
            }
          }
        }
        return res.status(200).json({
          meetingID,
          name,
          aaCount,
          umCount,
          hmCount,
          thisCount,
          thatCount,
        });
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
