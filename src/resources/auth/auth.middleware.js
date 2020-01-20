import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log("verified:", verified);
    req.user = verified;
  } catch (err) {
    return res.status(401).json({ msg: "Access denied" });
  }
  next();
};
