const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const lodash = require("lodash");
const Main = require("../../models/Main");
const Participants = require("../../models/Participants");
const FillerWords = require("../../models/FillerWords");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("../../config/keys");
const validateMainInput = require("../../validation/main");
const validateEmail = require("../../validation/emailValidation");
const validateGetRecordInput = require("../../validation/getRecord");
const validateParticipantsInput = require("../../validation/participants");
const validateFillerWordsInput = require("../../validation/fillerWord");
const user = require("../../models/user");
const { result } = require("lodash");
const { count } = require("../../models/Main");

//router.get("/test", (req, res) => res.json({ msg: "Main works" }));
// @route   POST /api/main
// @desc    Meeting filler words record
// @access  Private
router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const name = req.body.name;
    const meetingID = req.body.meetingID;
    const fillerWord = req.body.fillerWord;
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
    if (req.body.meetingID) mainFields.meetingID = req.body.meetingID;

    new Main(mainFields).save().then((main) => {
      //res.json(main);
      Main.find({ name, meetingID, fillerWord })
        .then((user) => {
          if (!user) {
            return res
              .status(400)
              .json({ name: "No record for this meeting ID" });
          } else {
            let count = 0;
            for (let i = 0; i < user.length; i++) {
              count = count + user[i].count;
            }
            return res.status(200).json({ count });
          }
        })
        .catch();
    });
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
// @route   POST /api/main/sendemail
// @desc    sending data via email
// @access  Private
router.post(
  "/sendemail",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEmail(req.body);
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    const email = req.body.email;
    const data = req.body.Data;

    console.log(email);
    console.log(data);

    var transporter = nodemailer.createTransport(keys.smtp);

    function TableHeader() {
      let Header = Object.keys(data[0]);
      let header = Header.splice(1, Header.length);
      return header.map((key, index) => {
        return `<th key=${index}>
            ${key}
          </th>`;
      });
    }
    function TableData() {
      return data.map((person, index) => {
        const {
          meetingID,
          ah,
          um,
          so,
          but,
          well,
          ok,
          falseStart,
          wordRepititor,
          other,
        } = person; //destructuring
        return ` <tr 
          key=${meetingID}>
            <td>${meetingID}</td>
            '<td>${ah}</td>
            '<td>${um}</td>
            '<td>${so}</td>
            '<td>${but}</td>
            '<td>${well}</td>
            '<td>${ok}</td>
            '<td>${falseStart}</td>
            '<td>${wordRepititor}</td>
            '<td>${other}</td>
          </tr>`;
      });
    }

    let htmlTemplate = `
<!DOCTYPE html>
<html>
<body>

<h4 style="color: #072975;">Hello ${data[0].name}</h4>
<p style="color: #072975;">Here is your Filler Words Counter Report from Toastmasters International</p>
 <table id="students" border= "2px" style="color: #072975; background-color: #E9EFEF; border-color: white;">
              <tbody>
                <tr>
                 ${TableHeader()}
                </tr>
                ${TableData()}
              </tbody>
            </table>
            <img style="display: inline; margin: 0 5px;" title="Toastmasters_logo" src="./img/toastmastersLogo1.jpg" alt="Logo" width="150" height="150" />
            <h2 style="color:#072975;">Relax, present confidently</h2>
<h3 style="color: #072975;">Improve your public speaking skill through Toastmasters</h3>
</body>
</html>
`;

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: req.body.name + req.body.email, // sender address
      to: email, // list of receivers
      subject: "Data for all meetingIds", // Subject line
      html: htmlTemplate,
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
      if (!error) {
        res.send("Email sent");
      } else {
        res.send("Failed, error : ");
      }
      transporter.close();
      console.log("Message sent: " + info.response);
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

      let names = [];
      for (let i = 0; i < participants.length; i++) {
        names.push(participants[i].name);
      }
      return res.status(200).json(participants);
    });
  }
);
// @route   GET /api/main/allMeetingIDs
// @desc    all participants
// @access  Private
router.get(
  "/allMeetingIDs",
  //passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Main.find().then((Data) => {
      if (!Data) {
        return res.status(400).json({ MeetingID: "MeetingID not found" });
      }
      console.log("till here");
      let meetingIDs = [];
      for (let i = 0; i < Data.length; i++) {
        if (meetingIDs.indexOf(Data[i].meetingID) === -1) {
          meetingIDs.push(Data[i].meetingID);
        }
      }

      return res.status(200).json(meetingIDs);
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
      Participants.deleteOne({ name: req.body.name })
        .then((participant) => res.json(participant))
        .catch((err) => console.log(err));
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
router.post(
  "/getRecord",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const name = req.body.name;
    let ahCount = 0;
    let umCount = 0;
    let soCount = 0;
    let butCount = 0;
    let wellCount = 0;
    let okCount = 0;
    let falseStartCount = 0;
    let wordRepititorCount = 0;
    let otherCount = 0;
    let temp = {};
    let result = [];
    const { errors, isValid } = validateGetRecordInput(req.body);
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Main.find({ name })
      .then((user) => {
        if (!user) {
          return res
            .status(400)
            .json({ name: "This name doesn't have record" });
        } else {
          let meetingIDArr = [];
          for (let i = 0; i < user.length; i++) {
            if (meetingIDArr.indexOf(user[i].meetingID) === -1) {
              meetingIDArr.push(user[i].meetingID);
            }
          }

          for (let j = 0; j < meetingIDArr.length; j++) {
            for (let k = 0; k < user.length; k++) {
              if (meetingIDArr[j] === user[k].meetingID) {
                if (user[k].fillerWord === "ah") {
                  ahCount += 1;
                }
                if (user[k].fillerWord === "um") {
                  umCount += 1;
                }
                if (user[k].fillerWord === "so") {
                  soCount += 1;
                }
                if (user[k].fillerWord === "but") {
                  butCount += 1;
                }
                if (user[k].fillerWord === "well") {
                  wellCount += 1;
                }
                if (user[k].fillerWord === "ok") {
                  okCount += 1;
                }
                if (user[k].fillerWord === "falseStart") {
                  falseStartCount += 1;
                }
                if (user[k].fillerWord === "wordRepititor") {
                  wordRepititorCount += 1;
                }
                if (user[k].fillerWord === "other") {
                  otherCount += 1;
                }
                temp.name = name;
                temp.meetingID = meetingIDArr[j];
                temp.ah = ahCount;
                temp.um = umCount;
                temp.so = soCount;
                temp.but = butCount;
                temp.well = wellCount;
                temp.ok = okCount;
                temp.falseStart = falseStartCount;
                temp.wordRepititor = wordRepititorCount;
                temp.other = otherCount;
              }
            }
            result.push(temp);
            temp = {};
          }

          console.log(result);

          return res.status(200).json(result);
        }
      })
      .catch((err) => console.log(err));
  }
);
router.post(
  "/getWordCount",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const name = req.body.name;
    const meetingID = req.body.meetingID;
    const fillerWord = req.body.fillerWord;
    Main.find({ name, meetingID, fillerWord })
      .then((user) => {
        if (!user) {
          return res
            .status(400)
            .json({ name: "No record for this meeting ID" });
        } else {
          let count = 0;
          for (let i = 0; i < user.length; i++) {
            count = count + user[i].count;
          }
          return res.status(200).json({ count });
        }
      })
      .catch((err) => console.log(err));
  }
);
module.exports = router;

// router.post(
//   "/GetRecord",
//   // passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const meetingID = req.body.meetingID;
//     const name = req.body.name;
//     let ahCount = 0;
//     let umCount = 0;
//     let soCount = 0;
//     let butCount = 0;
//     let wellCount = 0;
//     let okCount = 0;
//     let falseStartCount = 0;
//     let wordRepititorCount = 0;
//     let otherCount = 0;
//     const { errors, isValid } = validateGetRecordInput(req.body);
//     if (!isValid) {
//       // Return any errors with 400 status
//       return res.status(400).json(errors);
//     }
//     Main.find({ meetingID, name })
//       .then((user) => {
//         if (!user) {
//           return res
//             .status(400)
//             .json({ name: "This name doesn't have record" });
//         } else {
//           for (let i = 0; i < user.length; i++) {
//             if (user[i].fillerWord === "ah") {
//               ahCount += 1;
//             }
//             if (user[i].fillerWord === "um") {
//               umCount += 1;
//             }
//             if (user[i].fillerWord === "so") {
//               soCount += 1;
//             }
//             if (user[i].fillerWord === "but") {
//               butCount += 1;
//             }
//             if (user[i].fillerWord === "well") {
//               wellCount += 1;
//             }
//             if (user[i].fillerWord === "ok") {
//               okCount += 1;
//             }
//             if (user[i].fillerWord === "falseStart") {
//               falseStartCount += 1;
//             }
//             if (user[i].fillerWord === "wordRepititor") {
//               wordRepititorCount += 1;
//             }
//             if (user[i].fillerWord === "other") {
//               otherCount += 1;
//             }
//           }
//         }
//         return res.status(200).json({
//           meetingID: meetingID,
//           name: name,
//           ahCount: ahCount,
//           umCount: umCount,
//           so: soCount,
//           but: butCount,
//           well: wellCount,
//           ok: okCount,
//           falseStart: falseStartCount,
//           wordRepititor: wordRepititorCount,
//           other: otherCount,
//         });
//       })
//       .catch((err) => console.log(err));
//   }
//);
