import React, { useState,useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';


function Experience({ onSave }) {
  const [experienceFields, setExperienceFields] = useState([
    { title: '', company: '', location: '', startDate: '', endDate: '', description: '' }
  ]);

  useEffect(() => {
    fetch('http://localhost:3000/api/getexperience', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(data => {
      setExperienceFields(Object.values(data));
      
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  const [errors, setErrors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleAddField = () => {
    setExperienceFields([...experienceFields, { title: '', company: '', location: '', startDate: '', endDate: '', description: '' }]);
  };

  const handleRemoveField = (index) => {
    setExperienceFields(experienceFields.filter((_, i) => i !== index));
  };

  const handleChangeField = (index, fieldName, value) => {
    setExperienceFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index][fieldName] = value;
      return updatedFields;
    });
  };
  
  const handleValidation = () => {
    const errors = [];
    experienceFields.forEach((field, index) => {
      if (!field.title.trim()) {
        errors.push(`Title for experience ${index + 1} is required`);
      }
      if (!field.company.trim()) {
        errors.push(`Company for experience ${index + 1} is required`);
      }
      if (!field.startDate) {
        errors.push(`Start date for experience ${index + 1} is required`);
      } else {
        const startDate = new Date(field.startDate);
        if (startDate.toString() === 'Invalid Date') {
          errors.push(`Invalid start date for experience ${index + 1}`);
        }
      }
      
      if (field.endDate) {
        const endDate = new Date(field.endDate);
        if (endDate.toString() === 'Invalid Date') {
          errors.push(`Invalid end date for experience ${index + 1}`);
        } else {
          const startDate = new Date(field.startDate);
          if (endDate < startDate) {
            errors.push(`End date for experience ${index + 1} must be after start date`);
          }
        }
      }
      
    });
    setErrors(errors);
    return errors.length === 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = handleValidation();
    if (validationErrors) {
      try {
        fetch('http://localhost:3000/api/update/Experience', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
          },
          body: JSON.stringify(experienceFields),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            Alert(data.msg);
            setShowSuccess(true);
            onSave(experienceFields);
            // do something with the response data
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } catch (error) {
        console.error(error);
        setErrors(['Failed to update skills']);
      }
    } 
    
  };

  return (
    <div>
      {errors.length > 0 && (
        <div className="alert alert-danger" role="alert">
          {errors.map((error, index) => (
            <p key={`error-${index}`}>{error}</p>
          ))}
        </div>
      )}

      {showSuccess && (
        <div className="alert alert-success" role="alert">
          Experience updated successfully!
        </div>
      )}
      <h5><b>Experience</b></h5>
      <hr />
      <Form onSubmit={handleSubmit}>
        {experienceFields.map((field, index) => (
          <div key={`experience-${index}`}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={field.title}
                    onChange={(e) => handleChangeField(index, 'title', e.target.value)}
                    placeholder="Enter title"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    value={field.company}
                    onChange={(e) => handleChangeField(index, 'company', e.target.value)}
                    placeholder="Enter company"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={field.location}
                    onChange={(e) => handleChangeField(index, 'location', e.target.value)}
                    placeholder="Enter Location"
                    required />
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
           {experienceFields.length > 1 && (
             <Button variant="danger" onClick={() => handleRemoveField(index)}>
               Remove
             </Button>
           )}

           <hr />
         </div>

            ))}
        
      <Button variant="primary" onClick={handleAddField}>
        Add Experience
      </Button>
      

    <Button type="submit" variant="success" className="float-right">
          Save
        </Button>
    
    </Form>
    </div>
  );
}
export default Experience;

                
