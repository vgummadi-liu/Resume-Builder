import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../resources/template.css";

const Template2 = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('user').email;
        const token = localStorage.getItem('token');
        const headers = {
            'x-access-token': token
          };

        const profile = await axios.get(`http://localhost:3000/api/getprofile`, { headers });
        const education = await axios.get(`http://localhost:3000/api/getEducation`, { headers });
        const skills = await axios.get(`http://localhost:3000/api/getskills`, { headers });
        const experience = await axios.get(`http://localhost:3000/api/getExperience`, { headers });

        setUser({
          email: email,
          profile: profile.data,
          education: education.data,
          skills: skills.data,
          experience: experience.data
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {user &&
        <div className="template2-parent">
          <div className="header d-flex justify-content-between">
            <div>
              <h1 className="name">{user.profile.first_name} {user.profile.last_name}</h1>
              <p className="title">{user.profile.title}</p>
            </div>
            <div className="contact-info">
              <p>{user.email}</p>
              <p>{user.profile.address}</p>
              <p>{user.profile.mobile_number}</p>
            </div>
          </div>
          <hr className="divider"/>

          <div className="summary mt-3">
            <h3>Summary</h3>
            <p>{user.profile.carrier_objective}</p>
          </div>
          <hr className="divider"/>

          <div className="education mt-3">
            <h3>Education</h3>
            {user.education.map((education) => {
              return (
                <div className="d-flex flex-column" key={education.id}>
                  <h5>{education.school}</h5>
                  <p className="degree">{education.degree}</p>
                  <p>{new Date(education.start_date).getFullYear()} - {new Date(education.end_date).getFullYear()}</p>
                  <p className="description">{education.description}</p>
                </div>
              );
            })}
          </div>
          <hr className="divider"/>

          <div className="experience mt-3">
            <h3>Experience</h3>
            {user.experience.map((exp) => {
              return (
                <div className="d-flex flex-column" key={exp.id}>
                  <h5>{exp.company}</h5>
                  <p className="title">{exp.title}</p>
                  <p>{new Date(exp.start_date).getFullYear()} - {new Date(exp.end_date).getFullYear()}</p>
                  <p className="description">{exp.description}</p>
                </div>
              );
            })}
          </div>
          <hr className="divider"/>

          <div className="skills mt-3">
            <h3>Skills</h3>
            <ul>
              {user.skills.map((skill) => {
                return <li key={skill.id}>{skill.name} (Rating: {skill.rating})</li>;
              })}
            </ul>
          </div>
        </div>
      }
    </>
  );
}

export default Template2;
