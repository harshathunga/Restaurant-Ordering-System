import React, { useState } from 'react'

function Register() {

    const [register, setregister] = useState({
        email: "",
        password: "",
        full_name:"",
        phone: ""
    })

    const handle_register = async() => {

        try {
      const res = await fetch("http://localhost:3002/restro/register", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register)
      });

      const data = await res.json();
      console.log(data)
      alert(data.msg)
     

      setregister({
        email: "",
        password: "",
        full_name:"",
        phone: ""
      })
    //   return data;
      
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
    }
  return (
    <div className='flex flex-col align-middle w-[350px] h-[100vh] mx-auto my-auto justify-center bg-yellow-300 p-6 rounded-lg space-y-3 border border-black '>
        {/* email, password, full_name, phone */}

        <h1 className='mx-auto text-2xl'>Register</h1>
      <label >email</label>

      <input value={register.email} onChange={(e)=> setregister({...register, email: e.target.value})} className="mb-6 px-3 py-2 rounded-md w-full outline-none border" type='email' placeholder='email id'></input>

      <label>password</label>

      <input value={register.password} onChange={(e)=> setregister({...register, password: e.target.value})}  className="mb-6 px-3 py-2 rounded-md w-full outline-none border" type='password' placeholder='Password'></input>

      <label>full_name</label>

      <input value={register.full_name} onChange={(e)=> setregister({...register, full_name: e.target.value})}  className="mb-6 px-3 py-2 rounded-md w-full outline-none border" type='text' placeholder='Full name'></input>

      <label>phone</label>

      <input value={register.phone} onChange={(e)=> setregister({...register, phone: e.target.value})}  className="mb-6 px-3 py-2 rounded-md w-full outline-none border" type='text' placeholder='enter phone number'></input>

      <button onClick={()=> handle_register()} className='p-6 bg-blue-400 rounded-xl'>Submit</button>
    </div>
  )
}

export default Register
