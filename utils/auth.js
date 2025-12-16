import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userAuth = async (req, res) => {
  console.log("headers", req.headers);
  const userinfo = req.headers.authorization;
  const verifyToken = jwt.verify(userinfo, process.env.JWT_SECRET);
  if (verifyToken) {
    console.log("token verified");
    req.user.id = userinfo;
  } else {
    console.log("error verifying token");
  }
};
