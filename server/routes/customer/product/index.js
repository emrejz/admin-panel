const express = require("express");
const customerProductSchema = require("../../../models/customer/product");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const products = await customerProductSchema.find({}).sort({
      createdAt: 1,
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});
router.post("/add", async function (req, res, next) {
  try {
    const product = await new customerProductSchema({ ...req.body }).save();
    res.json(product);
  } catch (error) {
    next(error);
  }
});
router.put("/edit", async function (req, res, next) {
  try {
    console.log(req.body);
    const product = await customerProductSchema.findByIdAndUpdate(
      req.body._id,
      { ...req.body },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    next(error);
  }
});
router.delete("/delete", function (req, res) {
  res.send("delete");
});

module.exports = router;
