const express = require("express");
const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
router.get("/", function (req, res) {
  res.send("get");
});
router.post("/add", function (req, res) {
  res.send("add");
});
router.put("/edit", function (req, res) {
  res.send("edit");
});
router.delete("/delete", function (req, res) {
  res.send("delete");
});

module.exports = router;
