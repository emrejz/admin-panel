const express = require("express");
const customerProductSchema = require("../../../models/customer/product");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const products = await customerProductSchema.find({}).sort({
      createdAt: 1,
    });
    res.json({ products });
  } catch (error) {
    next(error);
  }
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
