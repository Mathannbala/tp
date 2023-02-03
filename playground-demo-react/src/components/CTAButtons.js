import React, { useState } from 'react'
import "@govtechsg/sgds/css/sgds.css"
import './styles.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Button } from "@govtechsg/sgds-react/Button"
import { useSelector } from 'react-redux';


export default function CTAButtons(){
    
    return(
        <Container>
            <Row
                className = "ml-5" 
                xs = "auto"
            >
                <Button 
                    variant="primary"
                    size="sm"
                >Download .VTK</Button>
                <Button 
                    variant="success"
                    size="sm"
                >Save Configuration</Button>
                <Button
                    variant="warning"
                    size="sm"
                >Delete .VTK</Button>
            </Row>
            <Row className = "mt-3 ml-1">
                <Button 
                    variant="danger"
                    style = {{
                        "width": "50vh"
                    }}
                >Visualize</Button>
            </Row>
        </Container>
    )
}