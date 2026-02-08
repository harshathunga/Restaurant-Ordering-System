import './App.css'
import Listing from './Listing';
import AdminRoute from './AdminRoute';
import Login from './Login';
import Menu from './Menu';
import { AuthProvider } from './contex';
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from './Cart';
import { useState } from 'react';
function App() {

  const [open, setOpen] = useState(false);
  const [cart_open, setcart_open] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role; 

  return (
    <div className=''>
      {/* <Login/> */}

      <nav className="flex justify-between m-10">
          <h1 className="text-xl font-medium ">company name</h1>

          <div className="flex justify-between gap-4">
            <span onClick={()=> setcart_open(!cart_open)}>cart</span>
            {/* <a href="#" onClick={()=> setcart_open(!cart_open)}><span>cart</span></a> */}
            <a href="/login"><span>login</span></a>
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
                      <li>Manage menu items</li>
                    </>
                  )}

                  { (
                    <>
                      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                        My Orders
                      </li>
                      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                        Cart
                      </li>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>


        
          <div className='  '>
            {
          cart_open &&(<div className='fixed inset-0 bg-black bg-opacity-50 z-50 '>
            <Cart  onClose={() => setcart_open(false)}></Cart>
          </div>)
            }

          </div>
      

      <AuthProvider>
      {/* <Menu/> */}
      {/* <Cart/> */}

      {/* <Listing></Listing> */}
      

      <Router>
        <Routes>
          <Route path = '*' element= {<Menu></Menu>}></Route>
          <Route path = '/login' element= {<Login></Login>}></Route>
          <Route path = '/listing' element= 

          <AdminRoute>
          <Listing></Listing>
          </AdminRoute>
          ></Route>
          {/* <Route path='/cart' element={<Cart></Cart>}></Route> */}
        </Routes>
      </Router>

      </AuthProvider>
    </div>
  )
}

export default App
