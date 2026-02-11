import React from 'react'



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
