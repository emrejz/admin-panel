const express = require("express");
const customerProductSchema = require("../../../models/customer/product");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const products = await customerProductSchema.find({}).sort({
      createdAt: 1,
    });
    if (products) res.json(products);
    else next({ message: "Ups something went wrong!" });
  } catch (error) {
    next(error);
  }
});
router.post("/add", async function (req, res, next) {
  try {
    const product = await new customerProductSchema({ ...req.body }).save();
    if (product) res.json(product);
    else next({ message: "Ups something went wrong!" });
  } catch (error) {
    next(error);
  }
});
router.put("/edit", async function (req, res, next) {
  try {
    const product = await customerProductSchema.findByIdAndUpdate(
      req.body._id,
      { ...req.body },
      { new: true }
    );
    if (product) res.json(product);
    else next({ message: "Ups something went wrong!" });
  } catch (error) {
    next(error);
  }
});
router.delete("/delete", async function (req, res, next) {
  try {
    const product = await customerProductSchema.findByIdAndRemove(req.body._id);
    if (product) res.json(product);
    else next({ message: "Ups something went wrong!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
