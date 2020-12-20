const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

//models
const userSchema = require("../../models/user");

router.get("/user/list", async function (req, res, next) {
  try {
    const users = await userSchema
      .find({}, "_id email role createdAt")
      .sort({ email: 1 });
    if (users) {
      res.json({ users });
    } else next({ message: "Ups something went wrong!", code: 300 });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
