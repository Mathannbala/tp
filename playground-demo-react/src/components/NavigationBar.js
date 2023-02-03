import React, { useState } from 'react'
import "@govtechsg/sgds/css/sgds.css"
import './styles.css'

import { Button } from "@govtechsg/sgds-react/Button"
import { Dropdown } from '@govtechsg/sgds-react'
import { NavDropdown, Nav } from '@govtechsg/sgds-react/Nav'
import { DropdownButton, Navbar } from '@govtechsg/sgds-react'
import userIcon from '../img/default_user_icon.jpg'
import wizIcon from '../img/IEMSimTM.png'
import { useMediaQuery } from 'react-responsive'

export default function NavigationBar(){
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
    const userProfileIcon = (
        <a 
        //className="nav-link dropdown-toggle" 
        className="navigation-bar-profile"
        href="#" 
        id="userDropdown">
            <span 
            //className="mr-2 d-none d-lg-inline small"
                className="navigation-bar-profile-name"
                // style={{
                //     "color": "white",
                //     "border-color": "transparent"
                // }}
            > Julius Caesar 
            </span>
            <img 
            className="navigation-bar-profile-pic"
                src={userIcon} alt="..." 
                // style={{
                //     "height": "2rem", 
                //     "width": "2rem", 
                //     "margin-left": "auto", 
                //     "display":"flex"}}
                />
        </a>
    )
    console.log("hmm")

    const [activeTab, setActiveTab] = useState(1);
    return(
        <div
        >
            <Nav 
                defaultActiveKey={"link-0"}
                style = {{
                    "background-color": "#5925DC"
                }}
            >
                <Navbar 
                    //className="mt-3 mb-1 sgds navbar navbar-expand-lg"
                    className="navigation-bar"
                    // style = {{
                    //     "width": "200vh"
                    // }}
                >
                    <div 
                        style={{
                            "display": "flex", 
                            "justify-content":"space-between",
                        }}
                    >
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">
                                <img
                                src= {wizIcon}
                                alt="Home"
                                style = {{
                                    "height" : isTabletOrMobile ? "3vh" : "9vh"
                                }}
                                />
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarNav"
                                aria-controls="navbarNav"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <i className="bi bi-list"></i>
                            </button>
                                <Nav.Item>
                                    <Nav.Link 
                                        eventKey="link-0"
                                        style={{
                                            "border-color": "transparent",
                                            "border-bottom-color": activeTab === 1 ? "white": "",
                                            "border-bottom-width": activeTab === 1 ? "2px": "",
                                            "background-color": "#5925DC",
                                            "color": "white"
                                        }}
                                        onClick = { (e) => setActiveTab(1)}
                                    >Create</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link 
                                        eventKey="link-1"
                                        style={{
                                            "border-color": "transparent",
                                            "border-bottom-color": activeTab === 2 ? "white": "",
                                            "border-bottom-width": activeTab === 2 ? "2px": "",
                                            "background-color": "#5925DC",
                                            "color": "white"
                                        }}
                                        onClick = { (e) => setActiveTab(2)}
                                    >Import</Nav.Link>
                                </Nav.Item>
                        </div>
                    </div>
                    <div 
                        aria-labelledby="userDropdown"
                        style={{
                            "margin-left": "auto",
                            "margin-right": 0
                        }}
                    >
                        <DropdownButton  title={ userProfileIcon } id = "userProfileIcon">
                            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                            <div className="dropdown-divider"></div>
                            <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </Navbar>
            </Nav>
        </div>

    )
}