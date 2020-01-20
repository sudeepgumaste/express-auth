import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ msg: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log('verified:', verified);
    req.user= verified;
  } catch (err) {
    res.status(401).json({ msg: "Access denied" });  
  }
};
