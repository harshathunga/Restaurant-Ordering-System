import React, { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import { Link } from "react-router-dom";



function Menu() {
  const [categories, setcategories] = useState([]);

  const [activ, setactiv] = useState("all");
  const [open, setOpen] = useState(false);

  const [menu, setmenu] = useState([]);
  const [filterdata, setfilterdata] = useState([]);

  const [catid, setcatid] = useState("");

  console.log(filterdata, "this is filterdata");

  console.log(catid, "this is the catid");

  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;

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

      setfilterdata(filldata)
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
    filter()
  }, [catid]);

  return (
    <div>
      <div className="flex flex-col mx-6 my-4">
        <nav className="flex justify-between">
          <h1 className="text-xl font-medium ">company name</h1>

          <div className="flex justify-between gap-4">
            <span>login</span>
            <div className="">
              <button
                className="font-medium text-l"
                onClick={() => setOpen(!open)}
              >
                menu
              </button>

              {open && (
                <div className="absolute mt-2">
                  {/* <>JDJDJD</> */}
                  {role === "ADMIN" && (
                    <>
                     <button><a href='/listing'>Manage Categories</a></button> 
                      <li>Manage menu items</li>
                    </>
                  )}

                  {role === "CUSTOMER" && (
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
      </div>
    </div>
  );
}

export default Menu;
