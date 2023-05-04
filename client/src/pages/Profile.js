import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Tab,Tabs } from "react-bootstrap";
import ProfileForm from "../components/ProfileInfo";
import Education from "../components/EducationSkills";
import Skills from '../components/Skills';
import Experience from "../components/Experience";
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () =>{
    const navigate = useNavigate();
    return(
        <Layout>
            <Tabs
      defaultActiveKey="Personal Info"
      id="justify-tab-example"
      className="mb-3"
      justify

    >
      <Tab eventKey="Personal Info" title="Personal Information">
        <ProfileForm/>
      </Tab>
      <Tab eventKey="Education" title="Education">
        <Education/>
      </Tab>
      <Tab eventKey="Skills" title = "Skills">
        <Skills/>
      </Tab>
      <Tab eventKey="Experience / Projects " title="Experience">
         <Experience/>
      </Tab>
    </Tabs>
    </Layout>
        
    )

}

export default Profile;