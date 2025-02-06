const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Signup method
UserSchema.statics.signup = async function (email, password) {
  if (!email || !password) throw Error("❌ All fields must be filled");

  if (!validator.isEmail(email)) throw Error("❌ Invalid email");

  if (!validator.isStrongPassword(password)) {
    throw Error("❌ Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters");
  }

  const exists = await this.findOne({ email });
  if (exists) throw Error("❌ Email already in use");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return this.create({ email, password: hashedPassword });
};

// Login method
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("❌ All fields must be filled");

  const user = await this.findOne({ email });
  if (!user) throw Error("❌ Incorrect email");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("❌ Incorrect password");

  return user;
};

module.exports = mongoose.model("User", UserSchema);

