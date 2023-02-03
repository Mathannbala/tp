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


export default function WindForm(){
    
    const [Wind_1, setWind1] = useState("")
    const [Wind_2, setWind2] = useState("")
    const [Wind_3, setWind3] = useState("")
    const [Wind_4, setWind4] = useState("")
    const [Wind_5, setWind5] = useState("")
    const [Wind_6, setWind6] = useState("")
    const [Wind_7, setWind7] = useState("")
    const [Wind_8, setWind8] = useState("")
    const [Wind_9, setWind9] = useState("")
    const [Wind_10, setWind10] = useState("")
    const [Wind_11, setWind11] = useState("")
    const [Wind_12, setWind12] = useState("")
    const [Wind_13, setWind13] = useState("")
    const [Wind_14, setWind14] = useState("")

    return(
        <div>
            <Form.Group className="mb-3" controlId="Wind_1">
                <Form.Label>Start Date/Time</Form.Label>
                <Row>
                    <Col>
                        <Form.Control type="date" name="duedate" placeholder="Due date" />
                    </Col>
                    <Col>
                        <Form.Control type="time" name="duedate" placeholder="Due date" />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Wind_3">
                <Form.Label>Wind Speed (m/s)</Form.Label>
                <Form.Text 
                    className="text-muted"
                >
                </Form.Text>
                <Form.Control 
                type="number"                                    
                    placeholder="1.0 to 20.0" 
                    min="1.0" 
                    max="20.0"
                    step="1.0"
                onChange = { (e) => {
                    setWind3(e.target.value);
                }}
                value = {Wind_3}
                />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="Wind_4">
                    <Form.Label>Wind Direction</Form.Label>
                        <Form.Select>
                            <option value="N">N</option>
                            <option value="NNE">NNE</option>
                            <option value="NE">NE</option>
                            <option value="NEE">NEE</option>
                            <option value="E">E</option>
                            <option value="SEE">SEE</option>
                            <option value="SE">SE</option>
                            <option value="SSE">SSE</option>
                            <option value="S">S</option>
                            <option value="SSW">SSW</option>
                            <option value="SW">SW</option>
                            <option value="SWW">SWW</option>                             
                            <option value="W">W</option>
                            <option value="NWW">NWW</option>
                            <option value="NW">NW</option>
                            <option value="NNW">NNW</option>
                            <option value="userDefined">User Defined</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                    <Form.Label>Value (°)</Form.Label>
                    <Form.Text className="text-muted"></Form.Text>
                    <Form.Control 
                        type="number"                                     
                        placeholder="0.0 to 359.9" 
                        min="0.0" 
                        max="359.0"
                        step="10.0"
                        disabled
                    />
                </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="Wind_5">
                <Form.Label>Ref. Wind Height (m)</Form.Label>
                <Form.Text 
                    className="text-muted"
                >
                </Form.Text>
                <Form.Control 
                    type="number"                                     
                    placeholder="2.0 to 500.0"                                    
                    min="2.0" 
                    max="500.0"
                    step="10.0"
                    onChange = { (e) => {
                        setWind5(e.target.value);
                    }}
                value = {Wind_5}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Wind_6">
                <Form.Label>Ref. Temperature (°C)</Form.Label>
                <Form.Text 
                    className="text-muted"
                >
                </Form.Text>
                <Form.Control 
                type="number"                                     
                    placeholder="10.0 to 40.0"                                    
                    min="10.0" 
                    max="40.0"
                    step="5.0"
                    onChange = { (e) => {
                        setWind6(e.target.value);
                    }}
                    value = {Wind_6}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Wind_7">
                <Form.Label>Ref. Temperature Height (m)</Form.Label>
                <Form.Text 
                    className="text-muted"
                >
                </Form.Text>
                <Form.Control 
                    type="number"                                     
                    placeholder="2.0 to 500.0"                                    
                    min="2.0" 
                    max="500.0"
                    step="10.0"
                onChange = { (e) => {
                    setWind7(e.target.value);
                }}
                value = {Wind_7}
                />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="Wind_8">
                        <Form.Label>Inflow Surface Type</Form.Label>
                        <Form.Select>
                        <option value="beach">Beach</option>
                        <option value="crops">Crops</option>
                        <option value="farmOrHedges">Farm/Hedges</option>
                        <option value="forest">Forest</option>
                        <option value="grass">Grass</option>
                        <option value="highRise">High-Rise</option>
                        <option value="semiUrban">Semi-Urban</option>
                        <option value="urban">Urban</option>
                        <option value="waterBody">Water Body</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="Wind_9">
                        <Form.Label>Ground Surface Type</Form.Label>
                        <Form.Select>
                        <option value="beach">Beach</option>
                        <option value="crops">Crops</option>
                        <option value="farmOrHedges">Farm/Hedges</option>
                        <option value="forest">Forest</option>
                        <option value="grass">Grass</option>
                        <option value="highRise">High-Rise</option>
                        <option value="semiUrban">Semi-Urban</option>
                        <option value="urban">Urban</option>
                        <option value="waterBody">Water Body</option>
                        </Form.Select>
                    </Form.Group>                                   
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="Wind_10">
                        <Form.Label>Mesh Spacing X (m)</Form.Label>
                        <Form.Text 
                            className="text-muted"
                        >
                        </Form.Text>
                        <Form.Control 
                        type="text" 
                        placeholder="1.0 to 50.0"
                        onChange = { (e) => {
                            setWind10(e.target.value);
                        }}
                        value = {Wind_10}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="Wind_11">
                        <Form.Label>Mesh Spacing Y (m)</Form.Label>
                        <Form.Text 
                            className="text-muted"
                        >
                        </Form.Text>
                        <Form.Control 
                        type="text" 
                        placeholder="1.0 to 50.0"
                        onChange = { (e) => {
                            setWind11(e.target.value);
                        }}
                        value = {Wind_11}
                        />
                    </Form.Group>
                </Col>
            </Row>                       
            
            <Form.Group className="mb-3" controlId="Wind_12">
                <Form.Label>Mesh Generation Configuration</Form.Label>
                <div></div>
                <Form.Check
                inline
                label="Predefined Slices"
                name="group2"
                type="checkbox"
                id={`inline-checkbox-1`}
                />
                <Form.Check
                inline
                label="Plot Residuals"
                name="group2"
                type="checkbox"
                id={`inline-checkbox-2`}
                />
            </Form.Group>
        </div>
    )
}