import dotenv from "dotenv";
dotenv.config();
import db from "./db.js";

// import bcrypt from "bcrypt";

// import jwt from "jsonwebtoken";
import express from "express";
import cors from "cors";

import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies to be sent
  })
);
// app.use(cookieParser());


router.post("/catogories", verifyToken, (req, res) =>{

    const {id,name,display_order} = req.body

//     id SERIAL PRIMARY KEY,
//   name VARCHAR(100) NOT NULL,
//   description TEXT,
//   display_order INT DEFAULT 0,
//   is_active BOOLEAN DEFAULT true,
    db.query("insert into categories ( id , name,  display_order) values (?,?,?)", (err,rlt)=>{
        if(!id || !name || !display_order){
            res.json({message: "all fields are required"})
        }
    })
})

router.get("/categories", (req, res)=> {
    db.query("select id,name, is_active from categories order by display_order asc",(err, rlt) => {
        if(err){
            res.json({message: "error feching catogories"})
        }

        else{
            res.json({data: rlt})
        }
    } )
})


router.get("/categories/:id",(req, res)=>{
    const id = req.params.id
    // console.log(id)

    // left join categories on menu_items.category_id = categories.id WHERE
    db.query("select * from menu_items where category_id = ? ", [id], (err, rlt) =>{
        if(err){
            res.json({err})
        }
        else{
            res.json({data: rlt})
        }
    })
})

export default router;