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

    const {id,name,display_order,is_active} = req.body
    

    // const isActive = is_active === "true" ? 1 : 0;
    // console.log(is_active, isActive);

    console.log(is_active, id,name,display_order )

    if(!id || !name || !display_order){
           return res.json({message: "all fields are required"})
        }
    db.query("insert into categories ( id , name, is_active, display_order) values (?,?,?,?)",[id,name, is_active, display_order ], (err,rlt)=>{
        if (err) {
            return res.json({error: err})
        }
        else{
            return res.json({msg: "data posted succesfully"})
        }
        
    })
})

router.get("/category", (req, res)=> {
    db.query("select * from categories where is_active = 1 order by display_order asc ",(err, rlt) => {
        if(err){
            res.json({message: "error feching catogories"})
        }

        else{
            res.json({data: rlt})
        }
    } )
})


router.get("/categories", (req, res)=> {
    db.query("select * from categories where is_active = 1 order by display_order asc ",(err, rlt) => {
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


router.get("/menuitems", (req, res)=>{
    db.query("select * from menu_items where is_available = 1", (err, rlt)=>{
        if(err){
            return res.json({err})
        }else{
            res.json({rlt})
        }
    })
})

export default router;