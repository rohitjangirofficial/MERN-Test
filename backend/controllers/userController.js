const UserModel = require("../models/userModel");
const LoginModel = require("../models/loginModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const ErrorHandler = require("../utils/errorHandler");

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, mobileNumber, userType } = req.body;
    if (!firstName || !lastName || !email || !mobileNumber || !userType) {
      return next(new ErrorHandler("All Fields Are Required", 422));
    }

    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      return next(new ErrorHandler("User Already Exists", 409));
    }

    const User = await UserModel.create({
      firstName,
      lastName,
      email,
      mobileNumber,
      userType,
    });

    const Login = await LoginModel.create({
      userId: User._id,
      password: Math.floor(Math.random() * 1000000000),
    });

    sendEmail(
      email,
      `Login Info - ${firstName} ${lastName}`,
      `Email - ${email} , Password - ${Login.password} , User Type - ${userType}`
    );

    res.status(201).json({
      message: "We Have Sent You Email Or Password On You Email Address",
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler());
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password, userType } = req.body;
    if (!email || !password || !userType) {
      return next(new ErrorHandler("All Fields Are Required", 422));
    }

    const User = await UserModel.findOne({ email });

    if (!User) {
      return next(new ErrorHandler("Invalid Email Or Password", 422));
    }

    const checkUser = await LoginModel.findOne({ userId: User._id }).populate(
      "userId"
    );

    if (
      password === checkUser.password &&
      userType === checkUser.userId.userType
    ) {
      const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET);
      return res
        .status(200)
        .cookie("token", token)
        .json({ message: "Logged In Successful", success: true });
    }

    next(new ErrorHandler("Invalid Email Or Password", 422));
  } catch (error) {
    return next(new ErrorHandler());
  }
};

const profile = async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user, success: true });
  } catch (error) {
    return next(new ErrorHandler());
  }
};

module.exports = { register, login, profile };
