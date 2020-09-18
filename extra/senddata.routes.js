module.exports = (app) => {
  const senddata = require("../controllers/senddata.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", senddata.sendmail);

  app.use("/api/senddatas", router);
};
