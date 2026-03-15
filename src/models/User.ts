import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true
    },
    name: String,
    email: {
      type: String,
      unique: true
    },
    photo: String
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);