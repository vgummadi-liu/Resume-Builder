import React from 'react';
import { Link } from 'react-router-dom';
import '../resources/intro.css';

import { Button,Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';



const Intro = ()=>{
    return (
        <div className='App-header'>
          <div className='App'>
            <h3><strong><Link to="/Aboutus">Know About US </Link></strong></h3>
          <h1> Resume Builder Application </h1>


          
          
          <Stack direction="horizontal" gap={2} >
          
          <Button as="a" variant="primary" href='/login' className="col-md-2">
            Login
          </Button>
    
          <Button as="a" variant="success" href='/register' className="col-md-2">
            SignUp
           </Button>
          
    
          </Stack>
          
    
          </div>
            
    
        </div>
        
        );
    

}

export default Intro