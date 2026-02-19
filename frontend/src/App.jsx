import "./App.css";
import Listing from "./Listing";
import AdminRoute from "./AdminRoute";
import Login from "./Login";
import Menu from "./Menu";
import { AuthProvider } from "./contex";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./Cart";
import { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

import Menu_manage from "./Menu_manage";
import { CartContext } from "./Cart Contex";
import Register from "../Register";
function App() {
  const { cart } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [cart_open, setcart_open] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)

  console.log("cart length", cart.length);

  const role = user?.role;

  const handleLogout = async () => {

    alert("ia, triggered")
    try {
      await fetch("http://localhost:3002/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");

      // Optional: refresh UI
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="">
      {/* <Login/> */}

      <nav className="flex justify-between m-10">
        <a href="/" className="text-xl font-medium ">company name</a>
        {/* <h1 className="text-xl font-medium ">company name</h1> */}

        <div className="flex justify-between gap-4">
          <div className="relative">
            <span onClick={() => setcart_open(!cart_open)}>
              <FaShoppingCart className="text-2xl" />
            </span>

            <span
              className="absolute -top-2 -right-2 
                     bg-red-500 text-white 
                     text-xs font-bold 
                     w-5 h-5 
                     flex items-center justify-center 
                     rounded-full"
            >
              {/* 2 */}
              {cart.length}
            </span>
          </div>

          {user ? (
            <a className="cursor-pointer hover:text-red-600 transition" onClick={() => handleLogout()}>logout</a>
          ) : (
            <a href="/login"><span>login</span></a>
          )}

          {/* <a href="#" onClick={() => setcart_open(!cart_open)}>
              <span>cart</span>
            </a> */}
          {/* <a href="/login"><span>login</span></a> */}
          <div className="">
            <button
              className="font-medium text-l"
              onClick={() => setOpen(!open)}
            >
              menu
            </button>

            {open && (
              <div className="absolute mr-12 ">
                {/* <>JDJDJD</> */}
                {role === "ADMIN" && (
                  <>
                    <button>
                      <a href="/listing">Manage Categories</a>
                    </button>

                    <button>
                      <a href="/menu-edit">Manage menu items</a>
                    </button>
                    <li></li>
                  </>
                )}

                {
                  <>
                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                      My Orders
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                      Cart
                    </li>
                  </>
                }
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="  ">
        {cart_open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 ">
            <Cart onClose={() => setcart_open(false)}></Cart>
          </div>
        )}
      </div>

      <AuthProvider>
        {/* <Menu/> */}
        {/* <Cart/> */}

        {/* <Listing></Listing> */}

        <Router>
          <Routes>
            <Route path="*" element={<Menu></Menu>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>

            <Route
              path="/listing"
              element=<AdminRoute>
                <Listing></Listing>
              </AdminRoute>
            ></Route>

            <Route
              path="/menu-edit"
              element=<AdminRoute>
                <Menu_manage></Menu_manage>
              </AdminRoute>
            ></Route>
            {/* <Route path='/cart' element={<Cart></Cart>}></Route> */}
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
