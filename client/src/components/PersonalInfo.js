import React from "react";
import { Container, Form } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Alert, Spinner } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import axios from "axios";

const PersonalInfo = ({
    firstName: initialFirstName,
    lastName: initialLastName,
    mobileNumber: initialMobileNumber,
    linkedIn: initialLinkedIn,
    address: initialAddress,
    careerObjective: initialCareerObjective
}
)=>{
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [mobileNumber, setMobileNumber] = useState(initialMobileNumber);
    const [linkedIn, setLinkedIn] = useState(initialLinkedIn);
    const [address, setAddress] = useState(initialAddress);
    const [objective, setobjective] = useState(
      initialCareerObjective
    );
    const handleMobileNumberChange = (event) => {
        setMobileNumber(event.target.value);
        const mobileNumberRegex = /^[0-9]{10}$/;
        if (!mobileNumberRegex.test(event.target.value)) {
          event.target.setCustomValidity('Please enter a valid 10-digit mobile number');
        } else {
          event.target.setCustomValidity('');
        }
      };
    
      const handleLinkedInChange = (event) => {
        setLinkedIn(event.target.value);
        const linkedInRegex = /^(https?:\/\/)?([\w]+\.)?linkedin\.com\/.+$/i;
        if (!linkedInRegex.test(event.target.value)) {
          event.target.setCustomValidity('Please enter a valid LinkedIn URL');
        } else {
          event.target.setCustomValidity('');
        }
      };

    const handleSubmit = async (event) => {
      
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setLoading(true);
      const token = localStorage.getItem('token');
      if(!token){
        navigate('/')
      }
      const headers = {
        'x-access-token': token,
      };

      const formData = new FormData(event.target);

      const data = {
        first_name: formData.get('formGridFirstName'),
        last_name: formData.get('formGridLastName'),
        mobile_number: formData.get('formGridMobileNumber'),
        portfolio: formData.get('formGridLinkedIn'),
        address: formData.get('formGridAddress'),
        carrier_objective: formData.get('formGridCareerObjective')
      };

      try{
        const response = await axios.post('http://localhost:3000/api/updateProfile', data, {headers});
        setLoading(false);
        console.log("Registration Successful")
        console.log(response.data)

      }
      catch(error){
        setLoading(false);
        if (error.response) {
            setError(error.response.data.msg);
          } else {
            setError('Something went wrong');
          }


      }

      
      setValidated(true);
    };

    return (
        <div>
        {loading && <Spinner size="large"/>}
          <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
              <Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder={firstName}
                    onChange={(e)=>{
                        setFirstName(e.target.value)
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid first name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder={lastName} 
                  onChange={(e)=>{
                    setLastName(e.target.value);
                  }}
                  required/>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Last name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridMobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control type="text" placeholder={mobileNumber} 
                  onChange={handleMobileNumberChange}
                  pattern="[0-9]{10}"
                  required/>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Mobile Number.
                  </Form.Control.Feedback>
                </Form.Group>
    
                <Form.Group as={Col} controlId="formGridLinkedIn">
                  <Form.Label>LinkedIn</Form.Label>
                  <Form.Control type="text" placeholder={linkedIn} 
                  onChange={handleLinkedInChange}
                  required/>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid LinkedIn Id.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder={address}
                onChange={(e)=>{
                    setAddress(e.target.value)

                }}
                required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid address.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridCareerObjective">
                <Form.Label>Career Objective</Form.Label>
                <Form.Control placeholder={objective}
                onChange={(e)=>{
                    setobjective(e.target.value)

                }}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </div>
      );
}

export default PersonalInfo;
