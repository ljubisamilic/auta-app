const express = require("express");
const router = express.Router();
const Car = require("../models/cars");

router.post("/", async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    await Car.create(req.body);
    return res.status(200).json("Uspjesno dodano novo auto");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find({ createdBy: req.user.id })
      .sort("createdAt")
      .populate("manufacturer")
      .populate("createdBy", "username");
    res.status(200).json({ cars });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
