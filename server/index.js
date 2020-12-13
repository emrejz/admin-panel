const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const mongodb = require("./helpers/db/mongo");
const customerProductRouter = require("./routes/customer/product");
const userRouter = require("./routes/user");

const port = 3001;

//mongo connection
mongodb();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//todo auth middleware
app.use("/api/costomer/product", customerProductRouter);
app.use("/api/user", userRouter);

//error handle
app.use((err, req, res, next) => {
  const error = {
    message: err.message,
  };
  if (err) return res.status(400).json({ error });
  return next();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
