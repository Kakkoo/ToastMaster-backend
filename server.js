const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const nodemailer = require("nodemailer");
const lodash = require("lodash");
const users = require("./routes/api/users");
const main = require("./routes/api/main");
const record = require("./routes/api/record");
const path = require("path");
const app = express();

//Body parser configuration
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
//First route
//app.get("/", (req, res) => res.send("Hello World"));

//Use routes
app.use("/api/users", users);
app.use("/api/main", main);
app.use("/api/record", record);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));

//Db config
const db = require("./config/keys").mongoURI;
//Connect to mongodb
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

//Passport configuration
app.use(passport.initialize());
require("./config/passport")(passport);
