const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "Record works" }));

module.exports = router;
