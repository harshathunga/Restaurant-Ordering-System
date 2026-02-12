import dotenv from "dotenv";
dotenv.config();
import db from "./db.js";

// import bcrypt from "bcrypt";

// import jwt from "jsonwebtoken";
import express from "express";
import cors from "cors";

import { verifyToken } from "../middleware/verifyToken.js";

import { verifyAdmin } from "../middleware/verifyToken.js";
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

// this will post the category by verifying the token and admin status
router.post("/catogories", verifyToken,verifyAdmin,(req, res) =>{

    const {id,name,display_order,is_active} = req.body
    

    // const isActive = is_active === "true" ? 1 : 0;
    // console.log(is_active, isActive);

    console.log(is_active, id,name,display_order,"this is posting data of cat" )

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

router.put('/catogories/:id',verifyToken,verifyAdmin, (req,res)=> {
    const id = req.params.id

    const {name,display_order,is_active,description} = req.body
    console.log(name,display_order,is_active,description,id)


    db.query("update categories set name = ?, display_order = ?, is_active = ?, description = ? where id = ? ",[name,display_order,is_active,description,id], (err,rlt) => {
        if(err){
            return res.json({msg: err})
        }else{
            return res.json({rlt: rlt})
        }
    })

})

router.get("/catogories/:id",(req,res)=>{
    const id = req.params.id
    db.query("select * from categories where id = ?", [id], (err, rlt)=> {
        if(err){
            return res.json({"msg":err})
        }else{
            return res.json({rlt: rlt})
        }
    })
})

// this will delete the category by verifying the token and admin status
router.delete("/catogories/:id", verifyToken,verifyAdmin, (req,res)=> {

    const id = req.params.id

    console.log(id)
    db.query("delete from categories where id = ?",[id],(err, rlt)=>{
        if(err){
            return res.json({msg: err})
        }
        else{
            return res.json({msg: "data has been deleted"})
        }
    } )
} )

// this will fetch categories based on active or not
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

// this will fetch categories based on active or not
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



// this is to fetch menu based on the categories id
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

//  this is to fetchmenu items bassed on the avalibility
router.get("/menuitems", (req, res)=>{
    db.query("select * from menu_items where is_available = 1", (err, rlt)=>{
        if(err){
            return res.json({err})
        }else{
            res.json({rlt})
        }
    })
})

//  this is to fetchmenu items 
router.get("/menuitem", (req, res)=>{
    db.query("select * from menu_items ", (err, rlt)=>{
        if(err){
            return res.json({err})
        }else{
            res.json({rlt})
        }
    })
})

//  this is to fetchmenu items by id
router.get("/menuitem/:id", (req, res)=>{
    const id =  req.params.id
    db.query("select * from menu_items where id = ?", [id], (err, rlt)=>{
        if(err){
            return res.json({err})
        }else{
            res.json({rlt:rlt})
        }
    })
})

router.post("/menuitems",verifyToken,verifyAdmin,(req, res) => {
    const{name,price,image_url,is_available, is_vegetarian, is_vegan,preparation_time, category_id} = req.body

    console.log(name,price,image_url,is_available, is_vegetarian, is_vegan,preparation_time, category_id, "dataof this post")

    db.query("insert into menu_items(name,price,image_url,is_available, is_vegetarian, is_vegan,preparation_time, category_id) values (?,?,?,?,?,?,?,?)", [name,price,image_url,is_available, is_vegetarian, is_vegan,preparation_time, category_id], (err, rlt)=>{
        if (err){
            return res.status(400).json({err: err})
        }

        else{
            return res.status(200).json({msg: "data posted succesfully"})
        }
    })
})

router.delete("/menuitems/:id",verifyToken,verifyAdmin,(req, res) => {
    const id =  req.params.id

    console.log(id)

    db.query("delete from menu_items where id = ?", [id],(err, rlt)=> {
        if(err){
            res.status(400).json({err: err})
        }
        else{
            res.status(200).json({msg: "data has succsfully deleted"})
        }
    })
})


// this nees work
router.post("/place-order", verifyToken, (req, res) => {
  const { cart, total_amount, address } = req.body;
  const userId = req.user.id;

  // 1️⃣ Create order
  const orderQuery = `
    INSERT INTO orders (user_id, order_number, status, total_amount, payment_status, delivery_address)
    VALUES (?, ?, 'pending', ?, 'pending', ?)
  `;

  const orderNumber = `ORD-${Date.now()}`;

  db.query(orderQuery, [userId, orderNumber, total_amount, address], (err, result) => {
    if (err) return res.status(500).json(err);

    const orderId = result.insertId;

    // 2️⃣ Insert order items
    const itemQuery = `
      INSERT INTO order_items (order_id, menu_item_id, item_name, item_price, quantity)
      VALUES ?
    `;

    const values = cart.map(item => [
      orderId,
      item.id,
      item.name,
      item.price,
      item.qty
    ]);

    db.query(itemQuery, [values], (err2) => {
      if (err2) return res.status(500).json(err2);

      res.json({
        message: "Order placed successfully",
        order_number: orderNumber
      });
    });
  });
});


export default router;