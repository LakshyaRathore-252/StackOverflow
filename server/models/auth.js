import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] },
  points: { type: Number, default: 0 },
  badges: { type: [String] },
  gotHonor: { type: Boolean, default: false },
  gotSliver: { type: Boolean, default: false },
  gotGold: { type: Boolean, default: false },
  gotPlatinum: { type: Boolean, default: false },
  ansCount: { type: Number, default: 0 },
  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
