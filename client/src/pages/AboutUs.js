import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AboutUs() {
  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>About Us</h1>
          <h2>Build Your Resume with Ease</h2>
        </Col>
      </Row>
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
  );
}

export default AboutUs;
