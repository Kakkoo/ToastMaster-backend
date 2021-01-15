const express = require("express");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const nodemailer = require("nodemailer");
const lodash = require("lodash");
const user = require("../../models/user");

const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");
const validatefRegisterInput = require("../../validation/fRegister");

const validateLoginInput = require("../../validation/login");
const router = express.Router();

// @route   POST /api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm",
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
});
router.post("/Fregister", (req, res) => {
  const { errors, isValid } = validatefRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ userID: req.body.userID })
    .then((user) => {
      if (user) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        };

        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
          //const accessToken = user.accessToken;
            return res.json({ token: "Bearer " + token });
          }
        );
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: req.body.avatar,
         //accessToken: req.body.accessToken,
          //signedRequest: req.body.signedRequest,
          userID: req.body.userID,
        });

        newUser
          .save()
          .then((user) => {
              const payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
              };

              //sign token
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  //const accessToken = user.accessToken;
                   return res.json({ token: "Bearer " + token });
                }
              );
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  //Find a user with the email
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(404).json({ email: "User not found" });

      // Check password
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            //User matched
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
            };

            //sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                return res.json({ token: "Bearer " + token });
              }
            );
          } else {
            return res.status(400).json({ password: "Password incorrect" });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// @route   GET /api/users/current
// @desc    Return the current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json(req.user);
  }
);
// @route   POST /api/users/forgotPassword
// @desc    Reset user's password
// @access  Public
router.post("/forgotPassword", (req, res) => {
  const email = req.body.email;
  let newPassword = JSON.stringify(
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
  );
  //Find a user with the email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ email: "User not found" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            newPassword = hash;
            User.updateOne(
              { email: email },
              { $set: { password: newPassword } }
            ).then((user) => {
              res.json(user);
            });
          });
        });
        var transporter = nodemailer.createTransport(keys.smtp);

        // setup e-mail data with unicode symbols
        var mailOptions = {
          from: req.body.name + req.body.email, // sender address
          to: email, // list of receivers
          subject: "Temporary password", // Subject line
          text: "Temporary Password :" + newPassword,
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
    })
    .catch((err) => console.log(err));
});
//@route   POST /api/users/changePassword
//@desc    change user's password
//@access  Private
router.post(
  "/changePassword",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const email = req.body.email;
    const oldPassword = req.body.password;
    let newPassword = req.body.newPassword;

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ email: "User not found" });
        }
        // Check password
        var ID = user.id;
        bcrypt
          .compare(oldPassword, user.password)
          .then((isMatch) => {
            if (isMatch) {
              //User matched
              bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newPassword, salt, (err, hash) => {
                  if (err) throw err;
                  newPassword = hash;
                  User.updateOne(
                    { _id: ID },
                    { $set: { password: newPassword } }
                  ).then((user) => {
                    res.json(user);
                  });
                });
              });
            } else {
              console.log("couldn't change password");
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);
//@route   POST /api/users/changeAvatar
//@desc    change or create user's Avatar
//@access  Private
router.post(
  "/changeAvatar",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newAvatar = req.body.avatar;
    User.updateOne({ _id: req.user.id }, { $set: { avatar: newAvatar } }).then(
      (user) => {
        res.json(user);
      }
    );
  }
);
//@route   POST /api/users/facebookUser
//@desc    register facebook user
//@access  Public
// router.post("/facebookRegister", (req, res) => {
//   User.findOne({ femail: req.body.femail })
//     .then((user) => {
//       if (!user) {
//         const newfacebookUser = new facebookUser({
//           name: req.body.name,
//           femail: req.body.femail,
//           avatar,
//           password: req.body.password,
//         });
//         newfacebookUser
//           .save()
//           .then((user) => res.json(user))
//           .catch((err) => console.log(err));
//       }
//     })
//     .catch((err) => console.log(err));
// });

module.exports = router;
