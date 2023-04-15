import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Intro from './pages/Intro';
import Login from './pages/Login';
import Register from './pages/SignUp';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';


function App() {

  return (
    <div className='App'>
      <BrowserRouter>
          <Routes>
          <Route index element = {<Intro/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutUs" element = {<AboutUs />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element = {<ProtectedRoute> <Profile/></ProtectedRoute>} />
          </Routes>
      </BrowserRouter>
    </div>
    );


}

export default App;

export function ProtectedRoute(props) {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
