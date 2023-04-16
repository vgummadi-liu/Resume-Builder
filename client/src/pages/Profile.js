import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Tab,Tabs } from "react-bootstrap";
import PersonalInfo from "../components/PersonalInfo";
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
        <PersonalInfo/>
      </Tab>
      <Tab eventKey="Education" title="Education">
        Tab content for Education
      </Tab>
      <Tab eventKey="Experience" title="Experience">
        Tab content for Experience Tab
      </Tab>
      <Tab eventKey="Skills" title="Skillset" >
        Tab content for Skills
      </Tab>
      <Tab eventKey="Projects" title="Projects" >
        Tab content for Projects
      </Tab>
    </Tabs>
        </Layout>
        
    )

}

export default Profile;