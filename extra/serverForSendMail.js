const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require('nodemailer');

const app = express();

var corsOptions = {
  origin: "http://localhost:5000",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to backendAPI" });
});

const PORT = process.env.PORT || 8080;

require("./app/routes/kidsdb.routes")(app);
require("./app/routes/namepassworddb.routes")(app);
require("./app/routes/tdata.routes")(app);
require("./app/routes/tdname.routes")(app);
require("./app/routes/tdfiller.routes")(app);
require("./app/routes/tdmeetingname.routes")(app);
require("./app/routes/senddata.routes")(app);


//require("./app/routes/tdatafillers.routes")(app);
// set port, listen for requests

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
