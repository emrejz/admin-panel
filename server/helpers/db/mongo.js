const mongoose = require("mongoose");

module.exports = () =>
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("mongo ok"))
    .catch((err) => console.log("mongo err:" + err.message));
