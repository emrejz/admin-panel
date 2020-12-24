const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

//models
const userSchema = require("../../models/user");
const productSchema = require("../../models/customer/product");

router.get("/user/list", async function (req, res, next) {
  try {
    const users = await userSchema
      .find({}, "_id email role createdAt")
      .sort({ email: 1 });
    if (users) {
      res.json({ users });
    } else {
      return next({ message: "Ups something went wrong!", code: 300 });
    }
  } catch (error) {
    return next(error);
  }
});
router.delete("/user/delete", async function (req, res, next) {
  const { _id, deleteProducts } = req.body;
  try {
    const user = await userSchema.findByIdAndDelete(_id);
    if (deleteProducts) {
      const products = await productSchema.remove({ customerID: _id });
    }
    if (user) {
      res.json({ user });
    } else {
      return next({ message: "Ups something went wrong!", code: 300 });
    }
  } catch (error) {
    return next(error);
  }
});

router.put("/user/edit", async function (req, res, next) {
  const { _id, role, email } = req.body;
  try {
    const user = await userSchema.findByIdAndUpdate(_id, { role, email });
    if (user) {
      res.json({ user });
    } else next({ message: "Ups something went wrong!", code: 300 });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
