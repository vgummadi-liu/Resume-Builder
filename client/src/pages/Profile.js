import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Profile = () =>{
    const navigate = useNavigate();
    return(
        <Layout>
            This is Profile page
        </Layout>
        
    )

}

export default Profile;