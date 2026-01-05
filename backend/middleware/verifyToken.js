import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.cookies.token; // read JWT from HttpOnly cookie
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  jwt.verify(token, process.env.secret_key, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded; // attach user info to request
    next();
  });
}