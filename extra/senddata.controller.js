var _ = require("lodash");
//var nodemailer = require("nodemailer");
exports.sendmail = (req, res) => {
  // Validate request
  var nodemailer = require("nodemailer");

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport(
    "smtps://lionvihaan@gmail.com:wyspsslrrbpxnlse@smtp.gmail.com"
  );

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: req.body.name + req.body.email, // sender address
    to: "kanchanji@gmail.com", // list of receivers
    subject: "-- Message from contact us form", // Subject line
    text:
      "Name:" +
      req.body.name +
      
      // "Email: " +
      // req.body.email +
      // "Contact no: " +
      //req.body.contactNo +
      " QUERY: " +
      req.body.newArr1,
    // " House number" +
    //req.body.housename, // plaintext body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send("Email sent");
    } else {
      res.send("Failed, error : ");
    }
    transporter.close();
    console.log("Message sent: " + info.response);
  });
};
