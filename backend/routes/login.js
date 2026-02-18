import db from "./db.js";

import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import express from "express";
import cors from "cors";
const router = express.Router();

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["POST", "GET", "DELETE", 'PUT'],

//     credentials: true,
//   })
// ); 

// app.use(
//   cors({
//     origin: "http://localhost:5173", // your frontend URL
//      methods: ["POST", "GET", "DELETE", "PUT"],
//     credentials: true, // allow cookies to be sent
//   })
// );


router.post("/register", async (req, res) => {
  const { email, password, full_name, phone } = req.body;

  console.log(email, password, full_name, phone);

  if (!email || !password || !full_name || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.query("select * from users where email = ?", [email], (err, rlt) => {
    if (err) {
      console.log(err);
    }
    if (rlt.length > 0) {
      console.log("User already exists");
      res.json({ msg: "User already exists" });
    }
  });

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      console.log(hash);
      db.query(
        "INSERT INTO users (email, password, full_name, phone) VALUES (?, ?, ?, ?)",
        [email, hash, full_name, phone],
        (err, rlt) => {
          if (err) {
            console.log(err);
          } else {
            res.json({ msg: "Account has been created " });
          }
        }
      );
    }
  });
});



router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if(!email ||!password){
    return res.json({message: "fill all the fields" })
    
  }
 
  db.query("select *  from users where email = ?", [email], (err, rlt) => {
    if (err) {
      console.log(err);
    }

    if (rlt.length === 0) {
      res.json("no user found please register");
    } else {
      console.log(rlt[0].password);

      // res.json({rlt: rlt[0].password})

      bcrypt.compare(password, rlt[0].password, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error checking password" });
        }

        if (results) {

          const token = jwt.sign(
            {
              id: rlt[0].id,
              email: rlt[0].email,
              role: rlt[0].role,
            },
            process.env.secret_key,
            { expiresIn: "1h" }
          );

           res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge:  60 * 60 * 1000,
      });

          // res.cookie("token", token, {
          //   httpOnly: true, // cannot be accessed by JS
          //   secure: false, // set true if using HTTPS
          //   sameSite: "none",
          //   maxAge: 60 * 60 * 1000, // 1 hour
          // });

          res.json({
            message: "Login successful",
            // token: token,
            details: {
              id: rlt[0].id,
              role: rlt[0].role,
              email: rlt[0].email,
              full_name: rlt[0].full_name,
            },
          });
        } else {
          res.json({ message: "login failed" });
        }
      });
    }
  });
});

export default router;
