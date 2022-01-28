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
      .populate("manufacturer", "company")
      .populate("createdBy", "username");
    res.status(200).json({ cars });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    })
      .populate("manufacturer")
      .populate("createdBy", "username");
    if (!car) {
      return res.status(404).json({ msg: "Vozilo nepostoji u bazi" });
    }
    res.status(200).json({ car });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const car = await Car.findOneAndRemove({
      _id: req.params.id,
      createdBy: req.user.id,
    });
    if (!car) {
      return res.status(404).json({ msg: "Vozilo nepostoji u bazi" });
    }
    res.status(200).send();
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ msg: "Popunite polja" });
    }
    console.log(req.body);
    console.log("neso");
    const car = await Car.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    console.log(car);
    if (!car) {
      return res.status(404).json({ msg: "Vozilo nepostoji u bazi" });
    }
    return res.status(200).json({ car });
  } catch (error) {
    console.log("nesto2");
    return res.status(400).json(error);
  }
});

module.exports = router;
