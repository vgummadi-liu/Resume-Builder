import React from 'react';
import { useState,useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';


function Skills({ userid, onSave }) {
  const [skills, setSkills] = useState([{ name: '', rating: 1 }]);
  const [errors, setErrors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddSkill = () => {
    setSkills([...skills, { name: '', rating: 1 }]);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/getskills', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(data => {
      setSkills(Object.values(data));
      
    })
    .catch(error => {
      console.error(error);
    });
  }, []);


  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleChangeSkill = (index, fieldName, value) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills];
      updatedSkills[index][fieldName] = value;
      return updatedSkills;
    });
  };

  const validateForm = () => {
    const validationErrors = [];
    const skillNames = skills.map((skill) => skill.name);
    const duplicateSkill = skillNames.find((name, index) => skillNames.indexOf(name) !== index);
    if (duplicateSkill) {
      validationErrors.push(`Skill "${duplicateSkill}" is entered more than once`);
    }
    return validationErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length === 0) {
      try {
        fetch('http://localhost:3000/api/update/skills', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
          },
          body: JSON.stringify(skills),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setShowSuccess(true);
            Alert(data.msg);
            setTimeout(() => {
              setShowSuccess(false);
            }, 5000);
            onSave(skills);
            // do something with the response data
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } catch (error) {
        console.error(error);
        setErrors(['Failed to update skills']);
      }
    } else {
      setErrors(validationErrors);
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
          Skills updated successfully!
        </div>
      )}
      <h5><b>Skills</b></h5>
      <hr/>
      <Form onSubmit={handleSubmit}>
        {skills.map((skill, index) => (
          <div key={`skill-${index}`}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={skill.name}
                onChange={(e) => handleChangeSkill(index, 'name', e.target.value)}
                placeholder="Enter skill name"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Rating</Form.Label>

                <Form.Control
                  as="select"
                  value={skill.rating}
                  onChange={(e) => handleChangeSkill(index, 'rating', e.target.value)}
                >
                  <option value="1">1 (Novice)</option>
                  <option value="2">2 (Beginner)</option>
                  <option value="3">3 (Intermediate)</option>
                  <option value="4">4 (Advanced)</option>
                  <option value="5">5 (Expert)</option>
                </Form.Control>
              
            </Form.Group>

            {skills.length > 1 && (
              <Button variant="danger" onClick={() => handleRemoveSkill(index)}>
                Remove
              </Button>
            )}

            <hr />
          </div>
        ))}

        <Button variant="primary" onClick={handleAddSkill}>
          Add skill
        </Button>

        <Button variant="success" type="submit" className="float-right">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default Skills;
