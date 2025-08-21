import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: [true, "name is required"] },
    name: { type: String, required: [true, "name is required"] },
    email: { type: String, unique: true, required: [true, "name is required"] },
    resume: { type: String },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
