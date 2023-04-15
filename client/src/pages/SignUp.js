import React, { useEffect, useState }from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import '../resources/Auth.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setCPasswordError] = useState('');
  const [formValid, setFormValid] = useState(false);



  


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!e.target.value) {
          setUsernameError('Username is required');
          setFormValid(false);
        } 
        else if(!emailRegex.test(e.target.value)){
            setUsernameError('Invalid email format'); 
            setFormValid(false);
        }
        else {
          setUsernameError('');
          setFormValid(true);
        }


      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 8) {
          setPasswordError('Password must be at least 8 characters');
          setFormValid(false);
        } else {
          setPasswordError('');
          setFormValid(true);
        }
      };
    
      const handleCPasswordChange = (e) => {
        setCPassword(e.target.value);
        if (e.target.value !== password) {
          setCPasswordError('Passwords do not match');
          setFormValid(false);
        } else {
          setCPasswordError('');
          setFormValid(true);
        }
      };
      
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) {
        return;
    }


    var payload = {
        'email': username,
        'password':password,
    }

    setLoading(true);
    try {

        const response = await axios.post('http://localhost:3000/api/register', payload);
        setLoading(false);
        console.log("Registration Successful")
        alert("Registered Successfully!")
        navigate('/login')
      } catch (error) {
        setLoading(false);
        alert("Registeration Failed!")
        console.log("Registration Failed",error.response.data)
      }

  };

  useEffect(()=>{
    if(localStorage.getItem('sheyresume-user'))
    {
      navigate('/home')
    }
  })


    return (
     
      <div className="auth-parent">
        <h1 className="brand">ResumeBuilder</h1>

        {loading && (<Spinner size="large"/>)}
        <Form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <hr />
        <Form.Group controlId="Email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={username}
            
          onChange={handleUsernameChange}
          isInvalid={!!usernameError}
          isValid={!usernameError && username}

          />
           <FormControl.Feedback type="invalid">
                 {usernameError}
            </FormControl.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
             type="password"
             value={password}
             onChange={handlePasswordChange}
             isInvalid={!!passwordError}
             isValid={!passwordError && password}
          />
           <FormControl.Feedback type="invalid">
              {passwordError}
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group controlId="cpassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={cpassword}
          onChange={handleCPasswordChange}
          isInvalid={!!cpasswordError}
          isValid={!cpasswordError && cpassword}
          />      
          <FormControl.Feedback type="invalid">
              {cpasswordError}
          </FormControl.Feedback>   
             
        </Form.Group>
         
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/login">Click Here to Login</Link>
           <Button variant="primary" type="submit" disabled={!formValid}>Register</Button>

        </div>
      </Form>

      </div>

    );
    
}
export default Register;