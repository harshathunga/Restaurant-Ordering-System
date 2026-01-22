import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contex";
import { useNavigate } from "react-router-dom";
//

function Listing() {
  const navigate = useNavigate();
  const { context_categories, setcontext_categories } = useContext(AuthContext);

  const [open, setopen] = useState(false);
  const [eid, seteid] = useState("");
  const [editcategories, seteditcategories] = useState(false);

  const [categories, setcategories] = useState({
    id: "",
    name: "",
    description: "",
    display_order: "",
    is_active: true,
  });

  //   console.log(context_categories, "this is contex cator");

  //   console.log(categories, "this is categories");

  const handlesubmit = async () => {
    try {
      const res = await fetch("http://localhost:3002/menu/catogories", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categories),
      });
      const data = await res.json();
      //   console.log(data);
      fetchCategories();
    } catch (error) {
      console.error("Failed to post categories:", error);
    }
  };

  const setedit = async (id) => {
    seteid(id);
    console.log("-", eid, "==", id);
    const res = await fetch(`http://localhost:3002/menu/catogories/${eid}`);

    const data = await res.json();
    const job = data.rlt[0];

    setcategories({
      id: job.id,
      name: job.name,
      description: job.description || "",
      display_order: job.display_order,
      is_active: true,
    });

    console.log("e-i-d", eid, categories, "this is set edit caterories");
  };

  const handledelete = async (id) => {
    // console.log(id)
    try {
      const res = await fetch(`http://localhost:3002/menu/catogories/${id}`, {
        method: "delete",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(categories),
      });
      const data = await res.json();
      //   console.log(data);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete categories:", error);
    }
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
      //   console.log(data.data, "new lisy");

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
        <button onClick={() => setopen(!open)} className="text-xl">
          + Add
        </button>
      </div>

      {open && (
        <div className="flex mx-auto w-[50%] flex-col align-middle ">
          <label>id</label>
          <input
            value={categories.id}
            onChange={(e) =>
              setcategories({ ...categories, id: e.target.value })
            }
            type="number"
            placeholder="enter unique number"
          ></input>

          <lable>category name</lable>
          <input
            value={categories.name}
            onChange={(e) =>
              setcategories({ ...categories, name: e.target.value })
            }
            type="text"
            placeholder="enter category name like Lunch etc"
          ></input>

          <lable>is active / is avalible</lable>

          <select
            value={categories.is_active}
            onChange={(e) =>
              setcategories({ ...categories, is_active: e.target.value })
            }
          >
            <option value={1}>true</option>
            <option value={0}>false</option>
          </select>

          <label>display_order</label>
          <input
            value={categories.display_order}
            onChange={(e) =>
              setcategories({ ...categories, display_order: e.target.value })
            }
            type="number"
            placeholder="enter unique number"
          ></input>

          {/* <lable>description</lable>
        <input type="text" placeholder="enter category name like Lunch etc"></input> */}

          <button onClick={() => handlesubmit()}>submit</button>
        </div>
      )}

      <div className="grid m-auto gap-5 sm:grid-cols-2 mx-auto md:grid-cols-3">
        {context_categories?.map((e) => (
          <div key={e.id} className="">
            <div className="w-[300px] border-2 boorder-solid border-black gap-2 rounded-lg p-3">
              <div className="flex  justify-between my-3">
                <p>{e.name}</p>
                <span>{e.is_active}</span>
              </div>

              {/* <span className="my-5">{e.description}</span> */}

              <div className="">
                <button
                  onClick={() => {
                    seteditcategories(!editcategories);
                    setedit(e.id);
                  }}
                  className="p-2 m-2 bg-blue-400 rounded-md hover:-translate-y-2 transition-transform duration-300"
                >
                  edit
                </button>

                <button
                  onClick={() => handledelete(e.id)}
                  className="p-2 bg-red-400 rounded-md hover:-translate-y-2 transition-transform duration-300"
                >
                  delete
                </button>
              </div>
            </div>

            {/* <h1>{e.name}</h1> */}
          </div>
        ))}

        {editcategories && (
        //   <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 ">
        //     <div className="flex mx-auto w-[50%] flex-col align-middle ">
        //       {/* <button onClick={()=> navigate("/listing")}>back</button> */}

        //       <label>id</label>
        //       <input
        //         value={categories.id}
        //         onChange={(e) =>
        //           setcategories({ ...categories, id: e.target.value })
        //         }
        //         type="number"
        //         placeholder="enter unique number"
        //       ></input>

        //       <lable>category name</lable>
        //       <input
        //         value={categories.name}
        //         onChange={(e) =>
        //           setcategories({ ...categories, name: e.target.value })
        //         }
        //         type="text"
        //         placeholder="enter category name like Lunch etc"
        //       ></input>

        //       <lable>is active / is avalible</lable>

        //       <select
        //         value={categories.is_active}
        //         onChange={(e) =>
        //           setcategories({ ...categories, is_active: e.target.value })
        //         }
        //       >
        //         <option value={1}>true</option>
        //         <option value={0}>false</option>
        //       </select>

        //       <label>display_order</label>
        //       <input
        //         value={categories.display_order}
        //         onChange={(e) =>
        //           setcategories({
        //             ...categories,
        //             display_order: e.target.value,
        //           })
        //         }
        //         type="number"
        //         placeholder="enter unique number"
        //       ></input>

              {/* <lable>description</lable>
        <input type="text" placeholder="enter category name like Lunch etc"></input> */}

            //   <button onClick={() => handlesubmit()}>submit</button>
        //     </div>
        //   </div>
        )}
      </div>
    </div>
  );
}

export default Listing;
