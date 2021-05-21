import mongoose from "mongoose";

const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  googleId: String,
  token: String,
  email: {
    type: String,
    unique: true,
  },
});

export default mongoose.model("User", user);
