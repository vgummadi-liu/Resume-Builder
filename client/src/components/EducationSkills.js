

import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

function Education({ onSave }) {
  const [educationFields, setEducationFields] = useState([
    { degree: '', major: '', school: '', startDate: '', endDate: '', description: '' }
  ]);
  const [errors, setErrors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/getEducation', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(data => {
      setEducationFields(Object.values(data));
      
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  const handleAddField = () => {
    setEducationFields([...educationFields, { degree: '', major: '', school: '', startDate: '', endDate: '', description: '' }]);
  };

  const handleRemoveField = (index) => {
    setEducationFields(educationFields.filter((_, i) => i !== index));
  };

  const handleChangeField = (index, fieldName, value) => {
    setEducationFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index][fieldName] = value;
      return updatedFields;
    });
  };
  
  


  const handleSubmit =  (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (validationErrors.length === 0) {
      try {
        fetch('http://localhost:3000/api/update/Education', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify(educationFields),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setShowSuccess(true);
          Alert(data.msg)
          setTimeout(() => {
            setShowSuccess(false);
          }, 5000);

          onSave(educationFields);
          // do something with the response data
        })
        .catch((error) => {
          console.error('Error:', error);
        });

        console.log(educationFields)

      } catch (error) {
        console.error(error);
        setErrors(['Failed to update education']);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = [];

    for (let i = 0; i < educationFields.length; i++) {
      const field = educationFields[i];

      if (!field.degree) {
        errors.push(`Degree is required for education #${i + 1}`);
      }

      if (!field.school) {
        errors.push(`School is required for education #${i + 1}`);
      }

      if (!field.startDate) {
        errors.push(`Start date is required for education #${i + 1}`);
      }
    }

    return errors;
  }
    return (
        <div>
          {errors.length > 0 &&
            errors.map((error) => (
              <Alert key={error} variant="danger">
                {error}
              </Alert>
            ))}
          {showSuccess && (
            <Alert variant="success">
              Education successfully updated!
            </Alert>
          )}
          <h5>
            <b>Education</b>
          </h5>
          <hr />
          <Form onSubmit={handleSubmit}>

            {educationFields.map((field, index) => (
              <div key={`education-${index}`}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Degree</Form.Label>
                      <Form.Control
                        type="text"
                        value={field.degree}
                        onChange={(e) =>
                          handleChangeField(index, 'degree', e.target.value)
                        }
                        placeholder="Enter degree"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Major</Form.Label>
                      <Form.Control 
                      type = "text"
                      value = {field.major}
                      onChange={(e)=> handleChangeField(index, 'major', e.target.value)}
                      placeholder='Enter Major'
                      required
                      />
                    </Form.Group>
                    </Col>
                    </Row>
                    <Row>
            <Col>
              <Form.Group>
                <Form.Label>School</Form.Label>
                <Form.Control
                  type="text"
                  value={field.school}
                  onChange={(e) => handleChangeField(index, 'school', e.target.value)}
                  placeholder="Enter school"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Start date</Form.Label>
                <Form.Control
                  type="date"
                  value={field.startDate}
                  onChange={(e) => handleChangeField(index, 'startDate', e.target.value)}
                  placeholder="Enter start date"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>End date</Form.Label>
                <Form.Control
                  type="date"
                  value={field.endDate}
                  onChange={(e) => handleChangeField(index, 'endDate', e.target.value)}
                  placeholder="Enter end date"
                />
              </Form.Group>
            </Col>
          </Row>


                    <Form.Group>
            <Form.Label>Description</Form.Label>
             <Form.Control
               as="textarea"
               rows={3}
               value={field.description}
               onChange={(e) => handleChangeField(index, 'description', e.target.value)}
               placeholder="Enter description"
             />
           </Form.Group>

           {educationFields.length > 1 && (
             <Button variant="danger" onClick={() => handleRemoveField(index)}>
               Remove
             </Button>
           )}

           <hr />
         </div>

            ))}
        
      <Button variant="primary" onClick={handleAddField}>
        Add education
      </Button>
      

    <Button type="submit" variant="success" className="float-right">
          Save
        </Button>
    
    </Form>
    </div>
  );
}
export default Education;




                    

    
    
    
    
    
    
  