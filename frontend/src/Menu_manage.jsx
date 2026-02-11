import React from "react";
import { fetch_menuitems, post_menuitems } from "./Menu_manage_api";
import { useState } from "react";
import { useEffect } from "react";
function Menu_manage() {
  const [items, setitems] = useState([]);
  const [open, setopen] = useState(false);
  const [categories, setcategories] = useState([])

  const [menudata, setmenudata] = useState({name: "",
    description: "",
    price: "",
    image_url: "",
    is_available: "",
    is_vegetarian: "1",
    is_vegan:"1",
    preparation_time:"",
    category_id: ""
  })

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

    fetchCategories()

    fetch_menuitems().then((data) => {
      // console.log(data)
      setitems(data);
    });
  }, []);

  console.log(menudata, "this is the menu_manage items");
  return (
    <div className="">
      <nav className="flex m-5 mb-10 bg-blue-400">
        <>gghgh</>
        <button onClick={() => setopen(true)} className=" fixed right-10 ">
          {" "}
          + Add Menu
        </button>
      </nav>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50   ">
          <div className="flex flex-col max-w-screen-sm align-middle justify-center mx-auto  bg-slate-50 space-y-3 max-h-[90vh] overflow-y-scroll snap-y py-7">

            <span onClick={()=> setopen(!open)} className="cursor-pointer">X</span>
            <label className="my-2">name</label>
            <input value={menudata.name} onChange={(e)=> setmenudata({...menudata, name:e.target.value}) } type="text" placeholder="Item name"></input>


            <label className="my-2">description</label>
            <input value={menudata.description} onChange={(e)=> setmenudata({...menudata, description:e.target.value})} type="text" placeholder="description"></input>

            <label className="my-2">price</label>
            <input value={menudata.price} onChange={(e)=> setmenudata({...menudata, price:e.target.value})} className="text-black" type="number" placeholder="0.00"></input>

            <lable > image_url</lable>
            <input value={menudata.image_url} onChange={(e)=> setmenudata({...menudata, image_url:e.target.value})} type="text" placeholder=" Paste image URL"></input>

            <label>category</label>

             <select value={menudata.category_id} onChange={(e)=> setmenudata({...menudata, category_id: e.target.value})}>
            {
              categories.map((e)=>(
               
                  <option value={e.id}>{e.name}</option>
                
                
              ))
            }
            </select>

            <label className="my-2">is_vegetarian</label>
            <select  value={menudata.is_vegetarian} onChange={(e)=> setmenudata({...menudata, is_vegetarian:e.target.value})} >
            <option value={1}>true</option>
            <option value={0}>false</option>
          </select>

          <label className="my-2">is_available</label>
            <select value={menudata.is_available} onChange={(e)=> setmenudata({...menudata, is_available:e.target.value})}>

            <option value="">Select category</option>
            <option value={1}>true</option>
            <option value={0}>false</option>
          </select>

          <label className="my-2">is_vegan</label>
            <select  value={menudata.is_vegan} onChange={(e)=> setmenudata({...menudata, is_vegan:e.target.value})}>
            <option value={1}>true</option>
            <option value={0}>false</option>
          </select>

          <label className="my-2">preparation time</label>
            <input value={menudata.preparation_time} onChange={(e)=> setmenudata({...menudata, preparation_time:e.target.value})} className="text-black" type="number" placeholder="in minutes"></input>
          </div>

          <div className="">
            <button className="bg-slate-400" onClick={()=> post_menuitems(menudata)}>submit</button>
          </div>
        </div>
      )}

      {items.rlt?.map((e) => (
        <div className="  w-[350px] h-[200px] border border-solid border-black align-middle justify-center mx-auto">
          <div className="flex align-middle my-auto ">
            <img width={150} src={e.image_url} className="m-3"></img>

            <div className="w-[px]">
              <p className="my-2">{e.name}</p>
              <p>${e.price}</p>
              <p className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
                veg
              </p>
              {/* <span className="badge bg-yellow-500">Veg</span> */}
              <span className="badge"> Preperation 30 min</span>
            </div>

            <div className="flex flex-col mx-3 my-2">
              {e.is_available === 1 ? "Available" : "Unavailable"}
            </div>
          </div>

          <div>
            <button className=" m-5 px-4 py-1">Edit</button>
            <button>delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menu_manage;
