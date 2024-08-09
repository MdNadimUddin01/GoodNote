import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate  } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/"  element={<Home></Home>}></Route>
        <Route path="/Login"  element={<Login></Login>}></Route>
        <Route path="/SignUp"  element={<SignUp></SignUp>}></Route>
      </Routes>

      {/* <ToastContainer position='bottom-right'></ToastContainer> */}

      <ToastContainer/>

      {/* <SignUp></SignUp> */}
    </BrowserRouter>

  )
}

export default App
