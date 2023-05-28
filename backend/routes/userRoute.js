const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth");

const { register, login, profile } = require("../controllers/userController");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", isAuthenticated, profile);

module.exports = router;
