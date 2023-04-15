import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Alert, Spinner } from "react-bootstrap";
import { FormControl } from "react-bootstrap";

import '../resources/Auth.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const Login = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ///^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

  const handleSubmit = async (e)=>{
    e.preventDefault();

    setLoading(true);

    var payload = {
        'email':username,
        'password':password
    }
    try {

        const response = await axios.post('http://localhost:3000/api/login', payload);
        setLoading(false);
        console.log("Registration Successful")
        console.log(response.data)
        if(response.data.auth === true){
            localStorage.setItem('token', response.data.token)
            //console.log("result is ",response.data.result);
            localStorage.setItem('user',JSON.stringify(response.data.result))
            console.log(localStorage.getItem('user'))
            alert("Login Success");
            navigate('/home')
        }
        // alert("Registered Successfully!")
        // navigate('/login')
      } catch (error) {
        setLoading(false);
        if (error.response) {
            setError(error.response.data.msg);
          } else {
            setError('Something went wrong');
          }

       // console.log("Registration Failed",error.response.data)
      }


  }

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(()=>{
    if(localStorage.getItem('token'))
    {
      navigate('/home')
    }
  })



    return(

        <div className="auth-parent">
        <h1 className="brand">ResumeBuild</h1>
        
        {loading && <Spinner size="large"/>}

        <Form onSubmit={handleSubmit}>
        <h1>LogIn</h1>
        <hr />
        <Form.Group controlId="Email">
          {error && <Alert variant="danger">{error}</Alert>}
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
          <Form.Label >Password:</Form.Label>
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

        <br/>
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/register">Click Here to SignUp</Link>
           <Button variant="primary" type="submit" disabled={!formValid}>LogIn</Button>

        </div>

        </Form>

        </div>
    )

}

export default Login;