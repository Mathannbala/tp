import React, { useEffect, useRef, useState } from 'react';
import { StlViewer } from "react-stl-viewer";
import { Button } from "@govtechsg/sgds-react/Button"
import { Form, Select, Col, Container, Row } from 'react-bootstrap';
//import example from '../img/fullerton.stl'
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useDispatch, useSelector } from 'react-redux';
import { setShowAction } from '../Actions/stlContainer';
import ProjectProgressBar from './ProgressBar';
import InputDropdown from "./InputDropdown";
import './styles.css'

import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import vtkGenericRenderWindow from '@kitware/vtk.js/Rendering/Misc/GenericRenderWindow';
import { ObjectLoader } from 'three';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import { RenderFile } from './RenderFile';

import { setCoresAction } from '../Actions/project';

import { useMediaQuery } from 'react-responsive';

const spiderman = "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"

//this doesnt seem to be used
const style = {
    "width": '40vh',
    "height": '40vh',
    "border-width": "2px",
    "border-color": "black",
    "border-style": "groove"
}

export default function VisualizeContainer() 
{
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)'})
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(1);
    const [cores, setCores] = useState("0")
    const [, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const files = useSelector(state => state.stl.files)
    const toggleShow = () => { dispatch(setShowAction(true)) }
    const [toggle,setToggle] = useState(true);
    const viewerElem = useRef(null);
    const genericRenderWindow = vtkGenericRenderWindow.newInstance({listenWindowResize:true});

    //document.getElementById('fullRenderer').setAttribute("ref", viewerElem);
    
    useEffect(() => {
        viewerElem.current.innerHTML = ""
        genericRenderWindow.setContainer(viewerElem.current)
        const readData = async () => {
            const renderer = genericRenderWindow.getRenderer()
            const renderWindow = genericRenderWindow.getRenderWindow()

            await RenderFile(files, renderer);
            genericRenderWindow.resize();
            renderer.resetCamera()
            renderWindow.render()
        }
        readData().catch(console.error);
    }, [files,toggle])

    useEffect(() => {
        const updateCores = () => {
            dispatch( setCoresAction(cores))
        }
        updateCores()
    }, [cores])


    return (
        <>
            <b>Object Viewer</b>
            <div ref={viewerElem} className="renderer"> </div>
            <Container >
                <Row>
                    <Col>
                        <DropdownButton
                            md={3}
                            style={{
                                "margin-top": "1vh",
                                float: "Left",
                            }}
                            id="dropdown-item-button"
                            title="Change Preview"
                            outline="none"
                        >
                            <Dropdown.Item as="button">Preview imports</Dropdown.Item>
                            <Dropdown.Item as="button">Preview VTK file</Dropdown.Item>
                        </DropdownButton>
                        <Col>
                            <Button
                                style={{
                                    "margin-top": "1vh",
                                    float: "right",
                                }}
                                onClick={(e) => 
                                    {toggleShow();
                                        setToggle(!toggle);}
                                }
                            >
                                FullScreen
                            </Button>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="Noise_3">
                        <Col>
                            <Form.Label>Processor</Form.Label>
                        </Col>
                        <Col>
                            <Form.Select 
                                aria-label="Default select example"
                                onChange={e => {
                                    console.log("e.target.value", e.target.value);
                                    setCores(e.target.value);
                                  }}
                            >
                                    <option value="1">1 Core</option>
                                    <option value="2">2 Core</option>
                                    <option value="3">3 Core</option>
                                    <option value="4">4 Core</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Row>
            </Container>
        </>
    );
}



