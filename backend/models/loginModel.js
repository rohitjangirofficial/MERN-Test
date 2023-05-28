const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  password: {
    type: String,
  },
});

const Login = mongoose.model("login", loginSchema);

module.exports = Login;
