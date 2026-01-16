import './App.css'
import Listing from './Listing';

import Login from './Login';
import Menu from './Menu';
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
 

  return (
    <div className='bg-blue-100'>
      {/* <Login/> */}
      <Menu/>

      <Listing></Listing>
      

      <Router>
        <Routes>
          <Route path = '/login' element= {<Login></Login>}></Route>
          <Route path = '/listing' element= {<Listing></Listing>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
