import React from 'react';
import Home from './components/Home';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import SignUp from './components/Signup';
import Login from './components/login';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
    <div className="App">\
      
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/login" element={<Login />} />
      </Routes>

    </div>
  );
}



export default App