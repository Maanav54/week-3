import React from 'react'
import "./App.css"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from './page/Home'
import Truck from './page/Truck'
import Signup from './auth/Signup'
import Login from './auth/Login'
import Admin from './auth/Admin'
import Use from './auth/Use'
import UpdateUser from './auth/UpdateUser'
import Pagination from './page/Pagination'

function App() {
  console.log(" fruit : 🍑");
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route   path="/"   element={<Home/>}  />
      <Route   path="/truck"   element={<Truck/>}  />
      <Route   path="/signup"   element={<Signup/>}  />
      <Route   path="/login"   element={<Login/>}  />
      <Route   path="/admin"   element={<Admin/>}  />
      <Route   path="/u"   element={<Use/>}  />
      <Route   path="/update/:id"   element={<UpdateUser/>}  />
      <Route   path="/pagination"   element={<Pagination/>}  />
    </Routes>
    
    
    </BrowserRouter>
    
    
    </>
  )
}

export default App
