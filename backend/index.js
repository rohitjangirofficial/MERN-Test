const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const userRoute = require("./routes/userRoute");

app.use("/api/v1", userRoute);

app.get("/api", (req, res) => {
  res.json({ msg: "Api Is Working" });
});

app.use((err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({ message: err.message, success: false });
});

app.listen(PORT, () => console.log(`Server Is Running On Port ${PORT}`));
