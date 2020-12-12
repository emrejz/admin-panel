const express = require("express");
const app = express();
const port = 3001;
const productCostomer = require("./routes/customer/product");

//todo auth middleware
app.use("/api/costomer/product", productCostomer);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
