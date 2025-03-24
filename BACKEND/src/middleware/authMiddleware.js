const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET =
  "b7e90b6d0adf9c41ecdb449f4d06cc1b959833a7e4ed8b63da2750b33d88d616";

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
    // }

    if (!token)
      return res.status(401).json({ message: "Not authorized, no token" });
  }
};
