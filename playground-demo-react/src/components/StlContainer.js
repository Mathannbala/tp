import React, { useState } from 'react';
import { StlViewer } from "react-stl-viewer";
import { Button } from "@govtechsg/sgds-react/Button"
import { Col, Container, Row } from 'react-bootstrap';
// import example from '../img/fullerton.stl'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const url = "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"

const style = {
    "width" : '40vh',
    "height": '40vh',
    "border-width": "2px",
    "border-color": "black",
    "border-style": "groove"
}

export default function VisualizeContainer() {
    
    const [isActive, setIsActive] = useState(1);
    return (
        <>
            <StlViewer
                className="ml-5"
                style={style}
                orbitControls
                shadows
                url={url}
                showAxes
                scale={4} 
            />
            <Container >
                <Row 
                    md = {3}
                    style = {{
                        "padding-left": "15vh",
                        "margin-top": "1vh"
                    }}   
                >
                <DropdownButton id="dropdown-item-button" title="Change Preview">
                <Dropdown.Item as="button">Preview imports</Dropdown.Item>
                <Dropdown.Item as="button">Preview VTK file</Dropdown.Item>
                </DropdownButton>
                </Row>
            </Container>
        </>
    );
}
