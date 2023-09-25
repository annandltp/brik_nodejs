const express = require("express");
const authHandler = require("../handlers/auth");

const router = express.Router();

// auth
router.post("/login", authHandler.login);
router.post("/register", authHandler.register);

router.get("*", (req, res) => {
  res.json({ message: "404 Not Found" });
});

module.exports = router;
