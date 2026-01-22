import './App.css'
import Listing from './Listing';
import AdminRoute from './AdminRoute';
import Login from './Login';
import Menu from './Menu';
import { AuthProvider } from './contex';
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
 

  return (
    <div className='bg-blue-100'>
      {/* <Login/> */}

      <AuthProvider>
      <Menu/>

      {/* <Listing></Listing> */}
      

      <Router>
        <Routes>
          <Route path = '/login' element= {<Login></Login>}></Route>
          <Route path = '/listing' element= 

          <AdminRoute>
          <Listing></Listing>
          </AdminRoute>
          ></Route>
        </Routes>
      </Router>

      </AuthProvider>
    </div>
  )
}

export default App
