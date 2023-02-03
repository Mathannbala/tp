import React, { useState } from 'react';
import "@govtechsg/sgds/css/sgds.css"
import './styles.css'

import { Form, Table, Col, Row, InputGroup  } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import userIcon from '../img/default_user_icon.jpg'
import { NavDropdown, Nav } from '@govtechsg/sgds-react/Nav'
import { DropdownButton, Navbar } from '@govtechsg/sgds-react'
import { useDispatch } from 'react-redux';
import { inputFieldCompleted, formSubmitted } from '../Actions/forms';
import Container from 'react-bootstrap/Container';


export default function SolarForm(){
    
    const [Solar_1, setSolar1] = useState("")
    const [Solar_2, setSolar2] = useState("")
    const [Solar_3, setSolar3] = useState("")
    const [Solar_4, setSolar4] = useState("")
    const [Solar_5, setSolar5] = useState("")
    const [Solar_6, setSolar6] = useState("")
    const [Solar_7, setSolar7] = useState(false)
    const [Solar_9, setSolar9] = useState(false)

    return(
        <div>
            {/* dericks bad code */}
            <Form.Label 
                style={{
                    display : 'inline-block',
                }}
                >
                Mesh Resolution
            </Form.Label> 
            <InputGroup 
                className="mb-3" 
                controlId="Solar_3" 
                style={{
                    display: 'inline-flex',
                    "inline-size": "fit-content",
                    "margin-left": "5vh"
                    }}
                > 
                <Button variant="outline-secondary" 
                    id="button-addon1"
                    onClick = { (e) => 
                        setSolar3(parseFloat(Solar_3) - 0.1) 
                        }
                    >
                    -
                </Button>
                <Form.Control 
                    type="number"                                      
                    placeholder="0.1 - 10" 
                    min="0.1" 
                    max="10.0"
                    step="0.1"
                    onChange = { (e) => {
                        setSolar3(e.target.value);
                    }}
                value = { Solar_3 }
                />
                <Button 
                    variant="outline-secondary" 
                    id="button-addon2"
                    onClick = { (e) => 
                        setSolar3(parseFloat(Solar_3)  + 0.1) 
                    }
                >
                    +
                </Button>
            </InputGroup>
            
            <Form.Group className="mb-3" controlId="Solar_9"
                style={{
                    "float": "right"
                }} 
                >
                <Form.Check
                    inline
                    label = "Show Advanced Options"
                    type="switch"
                    id="custom-switch"
                    onClick = { (e) => setSolar9(!Solar_9) }
                />
            </Form.Group>        
            <br/>
            <Form.Label>Mesh Offset (m)</Form.Label>
            <InputGroup className="mb-3" controlId="Solar_4" 
                style={{
                    display: 'inline-flex',
                    "inline-size": "fit-content",
                    "margin-left": "5vh"
                }}
                >
                <Button variant="outline-secondary" 
                    id="button-addon1"
                    onClick = { (e) => 
                        setSolar4(parseFloat(Solar_4) - 0.05) 
                        }
                    >
                    -
                </Button>
                <Form.Control 
                style={{
                    display: 'inline-flex',
                    "inline-size": "fit-content"
                    }}
                type="number"
                placeholder="0.0 - 0.3" 
                min="0.0" 
                max="0.3"
                step="0.05"
                onChange = { (e) => {
                    setSolar4(e.target.value);
                }}
                value = { Solar_4 }
                />
                <Button 
                    variant="outline-secondary" 
                    id="button-addon2"
                    onClick = { (e) => 
                        setSolar4(parseFloat(Solar_4) + 0.05) 
                    }
                >
                    +
                </Button>
            </InputGroup>
            <br/>
            <Form.Group 
            className="mb-3"
            controlId="Solar_5"
            key={`inline-radio`}
            style={{
                display : 'flex',
                "align-items": "center"
            }} >
                <Form.Label> 
                    Simulation Type
                </Form.Label>
                &nbsp; 
                <Form.Check
                //there should be a better way to make a gap jon help
                inline
                label="Point-in-time"
                name="group1"
                type="radio"
                id={`inline-radio-1`}
                />
                <Form.Check
                inline
                label="Cumulative Sky"
                name="group1"
                type="radio"
                id={`inline-radio-2`}
                />
            </Form.Group>
            
            
            <Form.Group className="mb-3" controlId="Solar_6"
            style ={{
                "background-color":"#d3d3d3aa"
            }}>
                <Form.Label>Output Types</Form.Label>
                &nbsp;
                <Form.Check
                //there should be a better way to make a gap jon help
                inline
                label="Solar Irradiation"
                name="group2"
                type="checkbox"
                id={`inline-checkbox-1`}
                />
                <Form.Check
                inline
                label="Absorbed Solar Energy"
                name="group2"
                type="checkbox"
                id={`inline-checkbox-2`}
                />
                <Form.Check
                inline
                label="Solar Shading"
                name="group2"
                type="checkbox"
                id={`inline-checkbox-3`}
                />                                
                <Form.Check
                inline
                label="Daylight Illuminance"
                name="group2"
                type="checkbox"
                id={`inline-checkbox-4`}
                />          
                <Form.Check
                inline
                label="Solar Irradiance"
                name="group2"
                type="checkbox"
                id={`inline-checkbox-5`}
                />
                <Form.Check
                inline
                label="Absorbed Heat Flux"
                name="group2"
                type="checkbox"
                id={`inline-checkbox-6`}
                />          
                <Form.Check
                inline
                label="Sky View Factor"
                name="group2"
                type="checkbox"
                id={`inline-checkbox-7`}
                />
            </Form.Group>
                <Form.Group className="mb-3" controlId="Solar_7">
                    
                    <Form.Check
                    inline
                    label="Multiple Hourly Simulations"
                    name="group2"
                    type="checkbox"
                    id={`inline-checkbox-8`}
                    onClick = { (e) => setSolar7(!Solar_7) }
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Solar_8">
                    <Form.Label>Start Date/Time</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control 
                                disabled = { Solar_7 === true ? false : true }
                                type="date" 
                                name="duedate" 
                                placeholder="Due date" 
                            />
                        </Col>
                        <Col>
                            <Form.Control 
                                disabled = { Solar_7 === true ? false : true }
                                type="time" 
                                name="duedate" 
                                placeholder="Due date" 
                            />
                        </Col>
                    </Row>
                    <Form.Label>End Date/Time</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control 
                                disabled = { Solar_7 === true ? false : true }
                                type="date" 
                                name="duedate"
                                placeholder="Due date" 
                            />
                        </Col>
                        <Col>
                            <Form.Control 
                                disabled = { Solar_7 === true ? false : true }
                                type="time"
                                name="duedate" 
                                placeholder="Due date" 
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Solar_10">
                <Form.Label>Reflection</Form.Label>
                <Form.Select aria-label="Default select example"
                    disabled = { Solar_7 === true ? false : true }
                >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Solar_11">
                <Form.Label>No. of Sampling Ray</Form.Label>
                <Form.Select aria-label="Default select example"
                    disabled = { Solar_7 === true ? false : true }
                >
                <option value="64">64</option>
                <option value="128">128</option>
                <option value="256">256</option>
                <option value="512">512</option>
                <option value="1024">1024</option>
                <option value="2048">2048</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Solar_12">
                <Form.Label>Simulation Type: Point-in-time</Form.Label>
                <Form.Select aria-label="Default select example"
                    disabled = { Solar_7 === true ? false : true }
                >
                <option value="With Sun">With Sun</option>
                <option value="No Sun">No Sun</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Solar_13">
                <Form.Label>Simulation Type: Cumulative sky</Form.Label>
                <Form.Select aria-label="Default select example"
                    disabled = { Solar_7 === true ? false : true }
                >
                <option value="With Sun">With Sun</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Solar_14">
                <Form.Label>Multiband</Form.Label>
                <Form.Select aria-label="Default select example"
                    disabled = { Solar_7 === true ? false : true}
                >
                <option value="Total">Total</option>
                <option value="Total & Multiband">Total & Multiband</option>
                </Form.Select>
            </Form.Group>
            {/* end of dericks bad code */}
        </div>
    )
}