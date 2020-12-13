const express = require("express");
const userSchema = require("../../models/user");
const { USER_ADMIN_ROLE } = require("../../constants");
const router = express.Router();

router.post("/add", async function (req, res, next) {
  try {
    const { role } = req.body;
    if (role !== USER_ADMIN_ROLE) {
      const user = await new userSchema({ ...req.body }).save();
      if (user) res.json(user);
      else next({ message: "Ups something went wrong!" });
    } else next({ message: "Its not your business!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
