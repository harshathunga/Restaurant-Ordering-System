import React, { useContext, useState } from "react";
import { CartContext } from "./Cart Contex";

function Cart({ onClose }) {
  // console.log(close_cart, "this is the close cart")

  const { cart, reduceQuantity,updatequantity, removeFromCart } = useContext(CartContext);
  let data = cart;

  console.log(cart, "this is the cart")

  const total_price = data.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  console.log("this is the total,  ", total_price);

  // const { context_categories, setcontext_categories } = useContext(AuthContext);
  return (


    <div className="w-[50%] h-screen bg-white flex flex-col">

      <div className=" mt-2 mb-5">
        <nav className="flex justify-between ">
          <h1 className="text-2xl">cart</h1>

          <a className="cursor-pointer text-xl" onClick={onClose}>
            X
          </a>
        </nav>
      </div>

     {cart.length === 0 ? (<div className="justify-center align-middle m-auto"><h1 className="text-2xl">cart is empty </h1></div>) :(<div>

        <div>
             {cart.map((e) => (
        <div className="" key={e.id}>
            <div className="flex ">
                <img className= 'mr-4' src={e.image_url} width={150} height={100}></img>
                <div className="mr-5">
                    <p>{e.name}</p>
                    <p>${e.price}</p>
                </div>

                <div className="  justify-center left-0">
                    <button onClick={()=> reduceQuantity(e.id)} className="  p-3  text-xl"> - </button> 
                    {e.qty}
                    <button onClick={()=> updatequantity(e.id)} className=" p-2 text-xl">+</button>

                    <button onClick={()=> removeFromCart(e.id)} className="text-l"> X </button>
                </div>


            </div>
          
        </div>
      ))}

        </div>
     


      <footer className="fixed bottom-0 left-[0] right-[0] w-1/2 bg-white p-4 border-t">
        <div className="flex justify-between">
            <p>Total:</p>
            <p>${total_price}</p>
        </div>
        <button className="w-full p-2 rounded-md bg-orange-400">Place order</button>
      </footer>

      </div>

      )}
    </div>
  );
}

export default Cart;
