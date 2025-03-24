const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET =
  "b7e90b6d0adf9c41ecdb449f4d06cc1b959833a7e4ed8b63da2750b33d88d616";

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
};

exports.logout = async (req, res) => {
  return res.status(200).json("");
};

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists!" });

    const user = await User.create({ username, email, password });

    res.status(201).json({
      user: {
        token: generateToken(user._id),
        username: user.username,
        email: user.email,
        password: user.password,
        _id: user._id,
        __v: user.__v,
        favoriteBooks: user.favoriteBooks,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    console.log("user", user);
    console.log("password", password);
    console.log("password match", bcrypt.compareSync(password, user.password));

    if (user && (await user.matchPassword(password))) {
      res.status(201).json({
        user: {
          token: generateToken(user._id),
          username: user.username,
          email: user.email,
          password: user.password,
          _id: user._id,
          __v: user.__v,
          favoriteBooks: user.favoriteBooks,
        },
      });
    }

    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editUser = async (req, res) => {
  const userId = req.user._id;
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(userId);
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();

    res.status(201).json({
      user: {
        token: generateToken(user._id),
        username: user.username,
        email: user.email,
        password: user.password,
        _id: user._id,
        __v: user.__v,
        favoriteBooks: user.favoriteBooks,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
