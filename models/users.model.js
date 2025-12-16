import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['author', 'reader'],
    default: 'reader'
  },
});

const users = mongoose.model("users", userSchema);
export default users;
