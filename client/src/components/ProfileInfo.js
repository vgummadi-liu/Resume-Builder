import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProfileForm({ user }) {
  const [formData, setFormData] = useState({

    first_name: '',
    last_name: '',
    mobile_number: '',
    portfolio: '',
    address: '',
    carrier_objective: '',
  });

  const [formErrors, setFormErrors] = useState({

  });
  useEffect(() => {
    // Fetch user's profile data and populate the form
    fetch('http://localhost:3000/api/getprofile', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {

        setFormData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);


  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate First Name
    if (!formData.first_name) {
      errors.first_name = 'Please enter your first name';
      isValid = false;
    }

    // Validate Last Name
    if (!formData.last_name) {
      errors.last_name = 'Please enter your last name';
      isValid = false;
    }

    // Validate Mobile Number
    if (!formData.mobile_number) {
      errors.mobile_number = 'Please enter your mobile number';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile_number)) {
      errors.mobile_number = 'Please enter a valid 10 digit mobile number';
      isValid = false;
    }

    // Validate Portfolio
    if (formData.portfolio && !/^https?:\/\/\S+$/.test(formData.portfolio)) {
      errors.portfolio = 'Please enter a valid URL starting with http:// or https://';
      isValid = false;
    }

    // Validate Address
    if (formData.address && formData.address.length < 5) {
      errors.address = 'Please enter a valid address';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    const token = localStorage.getItem('token');
    event.preventDefault();
    if (validateForm()) {
      fetch('http://localhost:3000/api/update/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if(!data.auth){
            useNavigate('/login')
          }
          // do something with the response data
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        {formErrors.first_name && (
          <Form.Text className="text-danger">{formErrors.first_name}</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter last name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        {formErrors.last_name && (
          <Form.Text className="text-danger">{formErrors.last_name}</Form.Text>
        )}
      </Form.Group>

  <Form.Group controlId="formMobileNumber">
  <Form.Label>Mobile Number</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter mobile number"
    name="mobile_number"
    value={formData.mobile_number}
    onChange={handleChange}
    pattern="^(\d{3}[-.\s]??|\(\d{3}\)[-.\s]??|\d{3}[-.\s]??\d{3}[-.\s]??)\d{4}$"
    required
  />
  <Form.Control.Feedback type="invalid">
    Please enter a valid mobile number.
  </Form.Control.Feedback>
</Form.Group>
<Form.Group controlId="formPortfolio">
  <Form.Label>Portfolio</Form.Label>
  <Form.Control
    type="text"
    placeholder="e.g. https://www.example.com/portfolio"
    name="portfolio"
    value={formData.portfolio}
    onChange={handleChange}
  />
</Form.Group>
<Form.Group controlId="formAddress">
  <Form.Label>Address</Form.Label>
  <Form.Control
    type="text"
    placeholder="e.g. 123 Main St, Anytown, USA"
    name="address"
    value={formData.address}
    onChange={handleChange}
  />
</Form.Group>
<Form.Group controlId="formCarrierObjective">
        <Form.Label>Carrier Objective</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter carrier objective"
          name="carrier_objective"
          value={formData.carrier_objective}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
      );
    }
    
    export default ProfileForm;