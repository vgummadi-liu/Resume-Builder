import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route,Navigate, useNavigate } from "react-router-dom";
import Intro from './pages/Intro';
import Login from './pages/Login';
import Register from './pages/SignUp';
import Templates from './pages/templates';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';
import AdminPage from './pages/Admin';
import UnAuthorizedErrorPage from './pages/UnAuthorizedPage';


function App() {
  
  

  return (
    <div className='App'>
      <BrowserRouter>
          <Routes>
          <Route index element = {<Intro/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutUs" element = {<AboutUs />} />
          <Route path = "/errorpage" element = {<UnAuthorizedErrorPage/>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element = {<ProtectedRoute> <Profile/></ProtectedRoute>} />
          <Route path="/Admin" element = {<AdminRoute> <AdminPage/></AdminRoute>} />
          <Route path="/templates/:id" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
          </Routes>
      </BrowserRouter>
    </div>
    );


}

export default App;

export function ProtectedRoute(props) {

  if (localStorage.getItem("token") ) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export function AdminRoute(props){
 var user = localStorage.getItem('user');
 user = JSON.parse(user);
  if(!user){
    return <Navigate to='/login'/>;
  }
  if (user.role == "Admin"){
    return props.children;
  }
  else{
    return <Navigate to='/errorpage'/>;
  }
}
