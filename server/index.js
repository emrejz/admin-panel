const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongodb = require("./helpers/db/mongo");

//routes
const customerProductRouter = require("./routes/customer/product");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");

//middlewares
const authMid = require("./middleware/authMid");
const adminMid = require("./middleware/adminMid");
const existUserMid = require("./middleware/existUserMid.js");

const port = process.env.PORT || 3001;

//mongo connection
mongodb();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   console.log("🚀 ~ file: index.js ~ line 24 ~ app.use ~ req.body", req.body);
//   next();
// });

app.use("/api/costomer/product", authMid, existUserMid, customerProductRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminMid, existUserMid, adminRouter);

//error handle
app.use((error, req, res, next) => {
  console.log(error);
  if (error) return res.status(400).json({ error });
  return next();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
