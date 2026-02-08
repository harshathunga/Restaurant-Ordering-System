import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import "./App.css";

import { AuthContext } from "./contex";
import { CartContext } from "./Cart Contex";

function Menu() {
  const { context_categories, setcontext_categories } = useContext(AuthContext);

  const {addToCart} = useContext(CartContext)

  const [categories, setcategories] = useState([]);

  const [activ, setactiv] = useState("all");
  const [open, setOpen] = useState(false);

  const [menu, setmenu] = useState([]);
  const [filterdata, setfilterdata] = useState([]);

  const [catid, setcatid] = useState(null);

  console.log(filterdata, "this is filterdata");

  console.log(catid, "this is the catid");

  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;

  console.log("this is the role:-", role)

  const menuitems = async () => {
    try {
      const res = await fetch("http://localhost:3002/menu/menuitems", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data.rlt, "this is menu items");
      setmenu(data.rlt);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const filter = () => {
    const filldata =
      catid === null ? menu : menu.filter((i) => i.category_id === catid);

    setfilterdata(filldata);
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3002/menu/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setcategories(data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  

  useEffect(() => {
    fetchCategories();
    menuitems();
  }, [context_categories]);

  useEffect(() => {
    filter();
  }, [catid,menu]);

  return (
    <div>
      <div className="flex flex-col mx-6 my-4">
        <div className="flex gap-3 my-4">
          {/* ALL BUTTON */}
          <button
            className={`m-2 ${
              activ === "all"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => {
              setactiv("all");
              setcatid(null);
            }}
          >
            All
          </button>

          {/* CATEGORY BUTTONS */}
          {categories?.map((e) => (
            <button
              key={e.id}
              className={`m-2 ${
                activ === e.name
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => {
                setactiv(e.name);
                setcatid(e.id);
              }}
            >
              {e.name}
            </button>
          ))}
        </div>

        <div className="flex"></div>

        <input className="outline-none p-2 rounded-xl my-5 "></input>

        <div className="px-4 py-6 ">
          <div
            className="grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-2 
      lg:grid-cols-3 
      gap-6 "
          >
            { filterdata.map((e)=> (
              <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="h-32 bg-gradient-to-b from-orange-100 to-orange-50 flex items-center justify-center text-6xl">
                <img
                  className=""
                  src={e.image_url} width={150} alt="image" loading="lazy"

                ></img>
              </div>

              <div className="p-4">
                <h2 className="font-bold text-lg">{e.name}</h2>
                <p className="text-gray-600 text-sm">
                  {e.description}
                  
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-orange-600">${e.price}</span>
                  <button onClick={()=> addToCart(e)} className="bg-orange-500 text-white px-4 py-1 rounded-lg">
                    + Add
                  </button>
                </div>
              </div>
            </div>
            ))

            
}
            {/* COPY THIS CARD FOR MORE ITEMS */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
