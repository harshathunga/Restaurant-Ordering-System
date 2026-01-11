import React from 'react'
import "./index.css";
import "./App.css";
function Menu() {
  return (
    <div>
      <div className='flex flex-col mx-6'>
        <nav className='flex justify-between'>
          <h1 className='text-lg'>company name</h1>

          <div className='flex justify-between gap-4'>
            <span>login</span>
            
          </div>
        </nav>

      <input className='outline-none p-2 rounded-xl my-5 '></input>
      </div>
    </div>
  )
}

export default Menu
