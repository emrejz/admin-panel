const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const userSchema = require("../../models/user");
const { USER_ADMIN_ROLE } = require("../../constants");
const { sign, verify } = require("../../helpers/jwt");

router.post("/add", async function (req, res, next) {
  try {
    const { role, password, email } = req.body;
    if (role !== USER_ADMIN_ROLE) {
      const hash = await bcrypt.hash(password, 10);
      const user = await new userSchema({ ...req.body, password: hash }).save();
      const token = await sign({ email, role });

      if (token) res.json({ token });
      else next({ message: "Ups something went wrong!" });
    } else next({ message: "Its not your business!" });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const { password, email } = req.body;
    const user = await userSchema.findOne({ email });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = await sign({ email, role: user.role });
        if (token) res.json({ token });
      } else next({ message: "Ups something went wrong!" });
    } else next({ message: "Ups something went wrong!" });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
