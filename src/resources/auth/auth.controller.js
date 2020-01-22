import Joi from "@hapi/joi";
import { User } from "../../models/user.model";
import {
  registerValidation,
  loginValidation
} from "../../utils/validation/user.validation";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RefreshToken } from "../../models/refreshtoken.model";

export const register = async (req, res) => {
  // res.json({ msg: "Reginster" });

  //validate user input
  try {
    const validate = await registerValidation.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ msg: err.details[0].message });
  }

  //check if user already exists
  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json({ msg: "Email already exists" });
    }
  } catch (err) {
    console.log(err);
  }

  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.json({ _id: savedUser._id });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  // res.json({ msg: "Login" });

  //Input validation
  try {
    const validation = await loginValidation.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ msg: err.details[0].message });
  }

  //check if email exists
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ msg: "Email and Password pair don't match" });
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).json({ msg: "Email and Password pair don't match" });
  }

  //generate auth token
  const accessToken = jwt.sign(
    { _id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15s"
    }
  );

  //generate refresh token
  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.ACCESS_TOKEN_SECRET
  );


  try {
    await RefreshToken.findOneAndUpdate(
      { userId: user._id },
      { token: refreshToken },
      { upsert: true }
    );
  } catch (error) {
    res.sendStatus(500)
  }
  res.json({ accessToken, refreshToken });
};
