import { model, Schema } from "mongoose";

const refreshTokenSchema = new Schema({
  userId : {
    type : String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
});

export const RefreshToken = model("RefreshToken", refreshTokenSchema);