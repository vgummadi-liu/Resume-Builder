import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../resources/template.css";

const Template1 = () => {
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
        <div className="template1-parent">
          <div className="top d-flex justify-content-between">
            <h1>
              {user.profile.first_name.toUpperCase()} {user.profile.last_name.toUpperCase()}
            </h1>
            <div>
              <p>{user.email}</p>
              <p>{user.profile.address}</p>
              <p>{user.profile.mobile_number}</p>
            </div>
          </div>

          <div className="divider mt-3"></div>

          <div className="objective mt-3">
            <h3>Objective</h3>
            <hr />
            <p>{user.profile.carrier_objective}</p>
          </div>

          <div className="divider mt-3"></div>

          <div className="education mt-3">
            <h3>Education</h3>
            <hr />
            <div className="education mt-3">
  
  {user.education.map((education) => {
    return (
      <div className="d-flex flex-column" key={education.id}>
        <div className="d-flex align-items-center">
          <h6 style={{ width: 120 }}>
            <b>
              {new Date(education.start_date).getFullYear()} - {new Date(education.end_date).getFullYear()}:
            </b>
          </h6>
          <div>
            <p>
              <b>{education.degree}</b> in {education.major} from {education.school}
            </p>
            <p>{education.description}</p>
          </div>
        </div>
      </div>
    );
  })}
</div>
          </div>

          <div className="divider mt-3"></div>

          <div className="experience mt-3">
  <h3>Experience</h3>
  <hr />
  {user.experience.map((exp) => {
    return (
      <div className="d-flex flex-column" key={exp.id}>
        <div className="d-flex align-items-center">
          <h6 style={{ width: 120 }}>
            <b>
              {new Date(exp.start_date).getFullYear()} - {new Date(exp.end_date).getFullYear()}:
            </b>
          </h6>
          <div>
            <p>
              <b>{exp.title}</b> at <b>{exp.company}</b>, {exp.location}
            </p>
            <p>{exp.description}</p>
          </div>
        </div>
      </div>
    );
  })}
</div>








          <div className="divider mt-3"></div>

          <div className="skills mt-3">
            <h3>Skills</h3>
            <hr />
            {user.skills.map((skill) => {
              return <p key={skill.id}>{skill.name} (Rating: {skill.rating})</p>;
            })}
          </div>
        </div>
      }
    </>
  );
}

export default Template1;
