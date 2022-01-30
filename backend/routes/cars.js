const express = require("express");
const router = express.Router();
const fs = require("fs");
const Car = require("../models/cars");
const { upload } = require("../middleware/multer");

router.post("/", upload.array("images"), async (req, res) => {
  try {
    let imgArray = [];
    req.files.forEach((element) => {
      const image = {
        imageName: element.originalname,
        imagePath: element.path,
        imageType: element.mimetype,
      };
      imgArray.push(image);
    });

    req.body.createdBy = req.user.id;
    req.body.images = imgArray;
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
      .select("-images")
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
    car.images.forEach((image) => {
      fs.unlink(image.imagePath, (err) => {
        if (err) throw err;
      });
    });
    return res.status(200).send();
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.patch("/:id", upload.array("newimages"), async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ msg: "Popunite polja" });
    }
    let imgArray = [];
    req.files.forEach((element) => {
      const image = {
        imageName: element.originalname,
        imagePath: element.path,
        imageType: element.mimetype,
      };
      imgArray.push(image);
    });
    const images = JSON.parse(req.body.images);
    images.forEach((element) => {
      imgArray.push(element);
    });

    req.body.images = imgArray;
    const car = await Car.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });
    if (!car) {
      return res.status(404).json({ msg: "Vozilo nepostoji u bazi" });
    }

    const deleteImages = car.images.filter(
      (imgs) => !req.body.images.some((img) => img.imagePath === imgs.imagePath)
    );

    const updateCar = await Car.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updateCar) {
      return res.status(404).json({ msg: "Vozilo nepostoji u bazi" });
    }
    if (deleteImages.length) {
      deleteImages.forEach((image) => {
        fs.unlink(image.imagePath, (err) => {
          if (err) throw err;
        });
      });
    }

    return res.status(200).json({ msg: "Uspjesno ste izmijenili podatke" });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
