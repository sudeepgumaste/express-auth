import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 256
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 256
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 256
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export const User = model("User", userSchema);
