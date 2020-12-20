const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

//models
const userSchema = require("../../../models/user");

//constants
const { USER_ADMIN_ROLE } = require("../../../constants");

//helpers
const { sign, verify } = require("../../../helpers/jwt");

router.post("/signup", async function (req, res, next) {
  try {
    const { role, password, email } = req.body;
    if (role !== USER_ADMIN_ROLE) {
      const hash = await bcrypt.hash(password, 10);
      const user = await new userSchema({ ...req.body, password: hash }).save();
      const token = sign({ _id: user._id, email, role });
      if (token) res.json({ token });
      else next({ message: "Ups something went wrong!", code: 300 });
    } else next({ message: "Its not your business!", code: 103 });
  } catch (error) {
    if (error.code == 11000) {
      next({ message: "Email already exists!", code: 100 });
    } else next(error);
  }
});

router.post("/signin", async function (req, res, next) {
  try {
    const { password, email } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) next({ message: "This email does not exist!", code: 101 });

    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = await sign({ _id: user._id, email, role: user.role });
        if (token) res.json({ token });
      } else next({ message: "Wrong password!", code: 102 });
    } else next({ message: "Ups something went wrong!", code: 300 });
  } catch (error) {
    next(error);
  }
});

router.post("/auth", async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token && token !== "null") {
      const user = await verify(token);
      return res.json({ user });
    } else {
      next({
        message: "Authentication failed, please sign in again!",
        code: 150,
      });
    }
  } catch (error) {
    next({
      message: "Authentication failed, please sign in again!",
      code: 150,
    });
  }
});

module.exports = router;
