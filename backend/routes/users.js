const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const verifyUser = require("../middleware/verifyUser");
require("dotenv").config();

// registracija
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    return res.status(200).json({ msg: "Uspjesna registracija" });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ msg: "Pogresno ime" });
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ msg: "Pogresna sifra" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );
    return res.status(200).json({
      msg: "Uspjesna prijava",
      user: { username: user.username },
      token,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/check", verifyUser, (req, res) => {
  const token = jwt.sign(
    { id: req.user._id, username: req.user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  return res.status(200).json({ user: { username: req.user.username }, token });
});

module.exports = router;
