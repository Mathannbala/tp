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


export default function NoiseForm(){
    
    const [Noise_1, setNoise1] = useState("")
    const [Noise_2, setNoise2] = useState("")
    const [Noise_3, setNoise3] = useState("")
    const [Noise_4, setNoise4] = useState("")
    const [Noise_5, setNoise5] = useState("")
    const [Noise_6, setNoise6] = useState("")
    const [Noise_7, setNoise7] = useState("")
    const [Noise_8, setNoise8] = useState("")
    const [Noise_9, setNoise9] = useState("")

    const [fileUpload, setFileUpload] = useState([])
    var count = 0
    const handleFileUpload = (e) =>{
        if (!fileUpload.includes(e.target.value)){
            
            const fileName = e.target.value
            const fileSize = e.target.files[0].size
            // console.log (fileName + " :" + fileSize)
            setFileUpload(fileUpload => ([...fileUpload, fileName + "," + fileSize]))
        }
    }

    const handleFileRemove = (file) =>{
        console.log("Removing file")
        console.log(file)
        setFileUpload(fileUpload.filter(item => item !== file));
    }

    return(
        <div>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Receiver Points</Form.Label>
                <Form.Control type="file" multiple onChange = { (e) => handleFileUpload(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Noise_1">
                <Form.Label>Receiver Grid</Form.Label>
                <Row>
                    <Col>
                        <Form.Select aria-label="Default select example">
                        <option value="Cut-Plane Option">Cut-Plane Option</option>
                        <option value="Facade Option">Facade Option</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Control 
                        type="text" 
                        placeholder="OffSet values(0.15-75.0 or 2.0)" 
                        onChange = {(e) =>{
                            setNoise1(e.target.value);
                        }}
                        value = {Noise_1}
                        />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Noise_2">
                <Form.Label>Mesh Resolution</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="1.0 - 10.0" 
                    onChange = {(e) =>{
                        setNoise2(e.target.value);
                    }}
                    value = {Noise_2}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Noise_3">
                <Form.Label>NoiseCategory</Form.Label>
                <Form.Select aria-label="Default select example">
                <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
                <option value="Category 3">Category 3</option>
                <option value="Category 4">Category 4</option>
                <option value="Category 5">Category 5</option>
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="formFileMultiple" className="Noise_4">
                <Form.Label>Roads Files</Form.Label>
                <Form.Control type="file" multiple onChange = { (e) => handleFileUpload(e)}/>
            </Form.Group>

            <Table>
                <tr>
                    <th>#</th>
                    <th>File Name</th>
                    <th>File Size</th>
                    <th></th>                   
                </tr>

                <tbody>
                {fileUpload.map( file => {
                    return (
                        <tr>
                            <td>#</td>
                            <td>{file.split(",")[0]}</td>
                            <td>{file.split(",")[1]}</td>
                            <Button 
                                variant="danger"
                                onClick = { (e) => handleFileRemove(file)}
                            >Delete
                            </Button>
                        </tr>
                    );
                })}
                </tbody>
            </Table>

            <Form.Group className="mb-3" controlId="Noise_5">
                <Form.Label>Road Category</Form.Label>
                <Form.Select aria-label="Default select example">
                <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
                <option value="Category 3">Category 3</option>
                <option value="Category 4">Category 4</option>
                <option value="Category 5">Category 5</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Noise_6">
                <Form.Label>Input Type</Form.Label>
                <Row>
                    <Col>
                        <Form.Select aria-label="Default select example">
                        <option value="Default">Default</option>
                        <option value="User-Defined">User-Defined</option>
                        <option value="Traffic">Traffic</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Control 
                        type="text" 
                        placeholder="Input Value (dB)"
                        onChange = {(e) =>{
                            setNoise2(e.target.value);
                        }}
                        value = {Noise_2}
                        />
                    </Col>
                </Row>
            </Form.Group>
{/* 
            <Form.Group className="mb-3" controlId="InputType">
                <Form.Label>Input Type</Form.Label>
                <Form.Select aria-label="Default select example">
                <option value="Default">Default</option>
                <option value="User-Defined">User-Defined</option>
                <option value="Traffic">Traffic</option>
                </Form.Select>
                <Form.Control 
                    type="text" 
                    placeholder="Input Value (dB)"
                    min="0.1" 
                    max="10.0"
                    step="0.1"
                    onChange = {(e) =>{
                        setNoise7(e.target.value);
                        handleChange(e.target.id, e.target.value)
                    }}
                    value = {Noise_7}
                    />
                </Col>
            </Row>
            </Form.Group>

            <Form.Group
                className="mb-3" 
                controlId="Noise_8" 
                > 
            <Form.Label>Material Absorption</Form.Label>
            <Row>
                <Col>
                    <Form.Control 
                    type="number" 
                    placeholder="0.0 - 1.0" 
                    min="0.1" 
                    max="1.0"
                    step="0.1"
                    style = {{
                        "height": "100%",
                        "width": "100%"
                    }}
                    onChange = {(e) =>{
                        setNoise8(e.target.value);
                        handleChange(e.target.id, e.target.value)
                    }}
                    value = {Noise_2}
                />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="Noise_7">
                <Form.Label>Material Absorption</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="0.0 - 1.0" 
                    onChange = {(e) =>{
                        setNoise1(e.target.value);
                    }}
                    value = {Noise_1}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Noise_8">
                <Form.Label>Noise Solver</Form.Label>
                <div></div>
                <Button variant="primary">
                Run
                </Button>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Noise_9">
                <Form.Label>Visualize Output File</Form.Label>
                <div></div>
                <Button variant="primary">
                Run
                </Button>
            </Form.Group>
        </div>
    )
}