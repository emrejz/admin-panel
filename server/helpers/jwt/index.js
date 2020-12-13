const jwt = require("jsonwebtoken");

module.exports = {
  sign(user) {
    return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "7 days" });
  },
  verify(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
  },
};
