const User = require("../models/users");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  // provjera heardr-a
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: "Autentifikacija nije uspjesna" });
  }
  try {
    // provjeravamo token
    const payload = jwt.verify(authHeader, process.env.JWT_SECRET);

    const user = await User.findById(payload.id).select("-password");
    req.user = user;
    //req.user = {id: payload.userId, username: payload.name};
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Autentifikacija nije uspjesna" });
  }
};

module.exports = auth;
