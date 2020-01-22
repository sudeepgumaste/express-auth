import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader =
    req.header("authorisation") ||
    req.header("authorization");
  // console.log(authHeader);
  //bearer scheme
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("verified:", verified);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Access denied" });
  }
};
