const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
require("dotenv").config();

const verifyUser = require("./middleware/verifyUser");

app.use(cors());

const userRoute = require("./routes/users");
const brandRoute = require("./routes/brand");
const carRoute = require("./routes/cars");

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/user", userRoute);
app.use("/api/brand", verifyUser, brandRoute);
app.use("/api/car", verifyUser, carRoute);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(5000, () => console.log("Server uspjesno pokrenut"));
  } catch (error) {
    console.log(error);
  }
};

start();
