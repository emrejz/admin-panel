const express = require("express");
const app = express();
const port = 3001;
require("dotenv").config();

const customerProductRouter = require("./routes/customer/product");

//todo auth middleware
app.use("/api/costomer/product", customerProductRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
