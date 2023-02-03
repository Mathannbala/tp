import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import './styles.css'


export default function ProjectNavigation(){
    return (
        <Nav 
            defaultActiveKey="/home" 
            className="flex-column"
            style = {{
                "min-width": "15vh",
                "align-content": "top",
                "min-height": "180vh",
                "margin-left": "5vh",
                "border-right-color": "lightgray",
                "border-right-width": "1px",
                "border-right-style": "double",
                "margin-bottom": "5vh"
                
            }}
        >
            <h4 className = "p-3"> Projects </h4>
            <Nav.Link href="/ProjectInformation">Project Information</Nav.Link>
            <Nav.Link href="/ProjectStructure">Project Structure</Nav.Link>
            <Nav.Link href="/PipelineBrowser">Pipeline Browser</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>Help</Nav.Link>
        </Nav>
      );
  };