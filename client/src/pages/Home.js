import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import templateimg from "../resources/templates/template1.png";
import template2img from "../resources/templates/template2.png";
import "../resources/template.css";



const Home = ()=>{

    const navigate = useNavigate();

    const templates = [
        {
          title: "Simple Resume",
          image: templateimg,
        },
        {
          title: "Highlighted Sections Resume",
          image: template2img,
        },
      ];
    
    return(
        <Layout>
               <div className="row home">
        {templates.map((template, index) => {
          return (
            <div className="col-md-4">
                
              <div className="template">
                <img
                  src={template.image}
                  height="400"
                  alt=""
                  style={{ width: "100%" }}
                />
                <div className="text">
                  <p>{template.title}</p>
                  <button onClick={() => navigate(`/templates/${index + 1}`)}>
                    TRY
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
        
    )

}

export default Home;