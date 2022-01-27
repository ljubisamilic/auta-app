const express = require("express");
const router = express.Router();
const Brand = require("../models/brand");

router.post("/", async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    await Brand.create(req.body);
    return res.status(200).json({ msg: "Uspjesno dodan novi brend" });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find({});
    return res.status(200).json({ brands });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
