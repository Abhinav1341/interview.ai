import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorizatinon &&
    req.headers.authorizatinon.startsWith("Bearer")
  ) {
    try {
      //Extract token form header
      token = req.headers.authorizatinon.split(" ")[1];
      // Verify
      const decode = jwt.verify(token, process.env.JWT_SECCRET);
      //
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protect;
