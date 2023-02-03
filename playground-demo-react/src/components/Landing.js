/* eslint-disable no-lone-blocks */
/* eslint-disable no-unreachable */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import userIcon from '../img/default_user_icon.jpg'
import { Button } from 'react-bootstrap';

import './styles.css'

import "@govtechsg/sgds/css/sgds.css"
import "bootstrap-icons/font/bootstrap-icons.json"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavigationBar from './NavigationBar'
import StlForm from './StlForm'
import Footer from './Footer'
import Forms from './Forms'
import ProjectNavigation from './ProjectNavigation'
import ProjectProgressBar from './ProgressBar'
import VisualizeContainer from './StlContainer'
import CTAButtons from './CTAButtons'
import Toasts from './Toasts';
import IEMSimTM2 from '../img/IEMSimTM2.jpg'

export default function Landing() {

    console.log("Welcome to landing")
    // const user= useSelector(state=>state.login.user)

    return(
        
        <>
            <Row>
                <Col>
                <div 
                        style={{
                            "display": "inline-flex",
                            "justify-content":"space-between",
                        }}
                        
                    >
                        <a className="navbar-brand" href="#">
                            <img
                            src= {IEMSimTM2}
                            alt="Home"
                            style = {{
                                "height" : "6vh"
                            }}
                            />
                        </a>
                        <h4>WizVision IEMSim</h4>
                    </div>
                </Col>
            </Row>
            <NavigationBar></NavigationBar>
            <div
                style={{
                    "justify-content": "center",
                    "align-items": "center",
                    "display": "inline-flex",
                }}
            >
                <ProjectNavigation></ProjectNavigation>
                <Container
                    className = "ml-5"
                    style = {{
                        "width": "180vh",
                        "border-right-color": "lightgray",
                        "border-right-width": "2px",
                        "border-right-style": "double"
                    }}
                >
                    <Toasts></Toasts>

                    <Row>
                        <Col>
                            <StlForm></StlForm>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Forms></Forms>
                        </Col>
                    </Row>
                </Container>
                <Container
                    className = "ml-5"
                    style={{
                        "height": "160vh",
                        "width": "50vh",
                        // "position": "sticky",
                        // "top": "0"
                    }}
                >
                    <Row>
                        <VisualizeContainer></VisualizeContainer>
                    </Row>
                    <Row>
                        <ProjectProgressBar></ProjectProgressBar>
                    </Row>
                    <Row
                        style = {{
                            "margin-top": "15vh"
                        }}   
                    >
                        <CTAButtons></CTAButtons>
                    </Row>
                </Container>
            </div>
            {/* <Footer></Footer> */}
        </>
    )
}
