const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: [true, "Username must be unique!"],
    minLength: [4, "Username length must be at least 4 characters!"],
    maxLength: [10, "Username length must be no more than 10 characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "Email must be unique!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [4, "Password length must be at least 4 characters!"],
    maxLength: [8, "Password length must be no more than 10 characters!"],
  },
  favoriteBooks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Book",
    default: [],
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
