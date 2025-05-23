import jwt from "jsonwebtoken";
import { config } from "dotenv";

config({ path: "./config/config.env" });

export const protect = (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded; 
      next();
    } catch (err) {
     return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
