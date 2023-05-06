import React from 'react';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../resources/intro.css';

function AboutUs() {
  const navigate = useNavigate();
  return (
    <div className='App-header'>
      <div className="d-flex justify-content-end my-5 mx-5">
      <Button className="back-btn" onClick={() => navigate("/")}>
          Back
        </Button>
      </div>
    <Container>
      <div className='App'>
      
      <Row className="text-center">
        <Col>
          <h1>About Us</h1>
          <h2>Build Your Resume with Ease</h2>
        </Col>
      </Row>
      </div>
      <Row className="mt-3 mb-3">
        <Col>
          <p>Our resume builder application makes it easy for you to create a professional-looking resume in just a few minutes. With our templates and easy-to-use interface, you can customize your resume to highlight your skills, experience, and education.</p>
        </Col>
      </Row>
      <Row className="mt-3 mb-3">
        {/* <Col md={6}>
          <img src="./AboutUsPic.jpg" alt="Resume Builder Logo" />
        </Col> */}
        <Col md={6}>
          <ul>
            <li>Choose from a variety of resume templates</li>
            <li>Add your personal information, work experience, education, and skills</li>
            <li>Download your resume in PDF or Word format</li>
            <li>Share your resume online or print it out</li>
          </ul>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default AboutUs;
