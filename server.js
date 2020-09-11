const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const main = require("./routes/api/main");
const record = require("./routes/api/record");
const app = express();

//Body parser configuration
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//First route
app.get("/", (req, res) => res.send("Hello World"));

//Use routes
app.use("/api/users", users);
app.use("/api/main", main);
app.use("/api/record", record);

const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));

//Db config
const db = require("./config/keys").mongoURI;
//Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

//Passport configuration
app.use(passport.initialize());
require("./config/passport")(passport);
