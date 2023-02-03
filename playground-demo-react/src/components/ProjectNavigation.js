import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import './styles.css'
import { useMediaQuery } from 'react-responsive';


export default function ProjectNavigation(){
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)'})
    return (
        <Nav 
            defaultActiveKey="/home" 
            className="flex-column"
            style = {{
                backgroundColor:"lightgrey",
                border: "2px solid lightgrey",
                borderRadius: "2px",
                padding: "15px",
                paddingLeft: "6vh",
                "font-size": "16px",
                "width": "20vh",
                "width": isDesktop ? "20vh" : "100vh",
                "height": "195vh",
                "align-content": "top",
                "margin-top": "95vh",
                "margin-left": "0vh",
                "margin-bottom": "0vh"
                //"margin-left": isTabletOrMobile ? "10vh" : "5vh",
                //"margin-bottom": isTabletOrMobile ? "10vh" : "5vh"
            }}
        >
            <h4
            className = "projectNavHeader"
            >Projects
            </h4>
            
            <Nav.Link 
            style={{
                "color":"#5332AA",
                fontSize:"15px",
            }}
            href="/ProjectInformation"
            ><b>Project Information</b> 
            </Nav.Link>

            <Nav.Link 
            style={{
                "color":"#5332AA",
                fontSize:"15px",
            }}
            href="/ProjectStructure"
            ><b>Project Structure</b> 
            </Nav.Link>

            <Nav.Link 
            style={{
                fontSize:"15px",
            }}
            eventKey="disabled"
            disabled
            ><b>Help</b> 
            </Nav.Link>
        </Nav>
      );
  };