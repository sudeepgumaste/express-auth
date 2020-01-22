import express from "express";
import dotenv from "dotenv";
import process from "process";
import { router } from "./router";
import mongoose from "mongoose";

//configuring environment
dotenv.config();

//create express app
const app = express();

//db connection
mongoose.connect(
  process.env.DB_URI,
  {  
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false
  },
  () => {
    console.log("Connected to DB");
  },
);

//middlewares
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
