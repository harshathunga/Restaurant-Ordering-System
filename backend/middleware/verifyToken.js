import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {

  console.log("iam tapped")
  const token = req.cookies.token; // read JWT from HttpOnly cookie

  console.log(token,"this is token")
  if (!token) return res.status(401).json({ msg: "Not authenticated" });

  jwt.verify(token, process.env.secret_key, (err, decoded) => {
    if (err) return res.status(401).json({ msg: "Invalid token" });
    req.user = decoded; // attach user info to request

    console.log(req.user)
    next();
  });
}


export function verifyAdmin(req, res, next) {

  console.log("i am verify role")
  if (req.user.role.toLowerCase() !== "admin") {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
  next();
}