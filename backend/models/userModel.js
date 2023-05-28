const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["retailer", "wholesaler", "vendor"],
    required: true,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
