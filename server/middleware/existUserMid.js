const userSchema = require("../models/user");

module.exports = async (req, res, next) => {
  console.log(req.user);
  try {
    const { _id } = req.user;
    const result = await userSchema.findById(_id);
    if (!result && result !== "null") {
      return next({
        message: "Authentication failed, please contact to admin!",
        code: 152,
      });
    } else {
      return next();
    }
  } catch (error) {
    return next({
      message: "Authentication failed, please contact to admin!",
      code: 152,
    });
  }
};
