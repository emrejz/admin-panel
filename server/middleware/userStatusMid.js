const userSchema = require("../models/user");

module.exports = async (req, res, next) => {
  console.log(req.user);
  try {
    const { _id, email, role } = req.user;
    const result = await userSchema.findById(_id);
    if (!result && result !== "null") {
      return next({
        message:
          "Authentication failed. Your account may have been removed please contact to admin!",
        code: 152,
      });
    }
    if (result.email !== email || result.role !== role) {
      return next({
        message:
          "Authentication failed. Your account may have been changed please contact to admin!",
        code: 153,
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
