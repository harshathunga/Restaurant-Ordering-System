import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export const edit_menuitems = async(editid, menudata) =>{

  console.log(editid, menudata, "this is the test of efit_menu")

    try {
      const res = await fetch(`http://localhost:3002/menu/menuitem/${editid}`, {
        method: "put",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menudata)
      });

      const data = await res.json();
      console.log(data)
      alert(data.msg)
      
      return data;
      
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
}


export const delete_menuitems = async (id) =>{
    console.log(id)
 
    try{
        const res = await fetch(`http://localhost:3002/menu/menuitems/${id}`,{
            method: 'delete',
            credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(menudata)
        })
        const data = await res.json();
        console.log(data)
        
        // return data
    }catch (error) {
      console.error("Failed to fetch menu:", error);
    }

}
export const fetch_menuitems = async () =>{

    
        try {
      const res = await fetch("http://localhost:3002/menu/menuitem", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
    
      return data;

      
      
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
    }


export const post_menuitems = async (menudata) =>{

     try {
      const res = await fetch("http://localhost:3002/menu/menuitems", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menudata)
      });

      const data = await res.json();
      console.log(data)
      alert(data.msg)
      loadMenu()
      return data;
      
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
}

function Menu_manage_api() {


//     const menuitems = async () => {
//     try {
//       const res = await fetch("http://localhost:3002/menu/menuitems", {
//         method: "get",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await res.json();
//       console.log(data.rlt, "this is menu items");
//       setmenu(data.rlt);
//     } catch (error) {
//       console.error("Failed to fetch categories:", error);
//     }
//   };

    
  return (
    <div>
      
    </div>
  )
}

export default Menu_manage_api
