import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, Nav, Navbar } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout(props) {


   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    history("/");
  };

  const username = user.email.split('@')[0];
  const role = user.role;

  const Menu = (
    <Dropdown>
    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
      <PersonFill /> {username}
    </Dropdown.Toggle>
    
    <Dropdown.Menu>
    {role === 'client' && (
          <>
            <Dropdown.Item as={Link} to="/profile">
              Profile
            </Dropdown.Item>
            <Dropdown.Divider />
          </>
        )}

      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  )

  return (
  
        <div className="layout">
        <div className="header">
        <Navbar bg="dark" variant="dark" sticky="top">
       <Navbar.Brand as={Link} to="/home">Resume Build</Navbar.Brand>
       <Navbar.Toggle />
       <Navbar.Collapse  className="justify-content-end">
       {Menu}
       </Navbar.Collapse>
          
        </Navbar>
        </div>
        <div className="content" style={{overflowX:'hidden'}}>
          {props.children}</div>
      </div>
  );
}

export default Layout;
