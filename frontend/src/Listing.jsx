import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contex";

//


function Listing() {
  const { context_categories, setcontext_categories } = useContext(AuthContext);

  const [open,setopen] = useState(false)

  const [categories, setcategories] = useState({
  id: "",
  name: "",
  description: "",
  display_order: "",
  is_active: true    ,
});

console.log(context_categories,"this is contex cator")

console.log(categories, "this is categories")

const handlesubmit = async () => {
    try{
        const res =  await fetch('http://localhost:3002/menu/catogories',{
            method: "post",
            credentials: "include", 
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(categories),
        })
        const data = await res.json();
        console.log(data)
        fetchCategories()
    }catch (error) {
      console.error("Failed to post categories:", error);
}
}

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3002/menu/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data.data, "new lisy");

      setcontext_categories(data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <div className="flex justify-evenly my-5 ">
        categories
        <button onClick={()=> (setopen(!open))} className="text-xl">+ Add</button>
      </div>

      {open&&(<div className="flex mx-auto w-[50%] flex-col align-middle ">
        <label>id</label>
        <input value = {categories.id} onChange={(e)=> setcategories({...categories, id:e.target.value})} type="number" placeholder="enter unique number"></input>

        <lable>category name</lable>
        <input value={categories.name} onChange={(e)=> setcategories({...categories, name:e.target.value})} type="text" placeholder="enter category name like Lunch etc"></input>

        <lable>is active / is avalible</lable>

        <select value={categories.is_active} onChange={(e)=> setcategories({...categories, is_active:e.target.value}) }>
            <option value={1} >true</option>
            <option value={0} >false</option>
        </select>


         <label>display_order</label>
        <input value = {categories.display_order} onChange={(e)=> setcategories({...categories, display_order:e.target.value})} type="number" placeholder="enter unique number"></input>

        {/* <lable>description</lable>
        <input type="text" placeholder="enter category name like Lunch etc"></input> */}

        <button onClick={()=> handlesubmit()}>submit</button>

      </div>)}


      {context_categories?.map((e) => (
        <div key={e.id}>
          {/* <div className="
  grid 
  grid-cols-1 
  sm:grid-cols-1
  md:grid-cols-2 
  xl:grid-cols-2 
  gap-6
"> */}

          <div
            className="w-full 
  sm:w-[90%]
  md:w-1/2 
  lg:w-1/3 
  xl:w-1/2 grid-cols-2
  bg-yellow-100 
  p-4 
  rounded "
          >
            <div className="flex  justify-between my-3">
              <p>{e.name}</p>
              <span>{e.is_active}</span>
            </div>

            <span className="my-5">{e.description}</span>

            <div className="">
              <button className="p-2 m-2 bg-blue-400 rounded-md hover:-translate-y-2 transition-transform duration-300">
                edit
              </button>
              <button className="p-2 bg-red-400 rounded-md hover:-translate-y-2 transition-transform duration-300">
                delete
              </button>
            </div>
          </div>
          <h1>{e.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default Listing;
