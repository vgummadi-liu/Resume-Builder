import React from 'react'
import '../resources/intro.css';

import { Button,Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const Intro = ()=>{
    return (

        <div className='App-header'>
          <div className='App'>
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