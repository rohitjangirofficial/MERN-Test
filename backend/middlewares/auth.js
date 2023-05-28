const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token)
      return res.status(401).json({ message: "Not Logged In", success: false });
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const User = await UserModel.findById(decode.id);
    req.user = User;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

module.exports = isAuthenticated;
