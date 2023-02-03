import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { StlViewer } from "react-stl-viewer";
import { Button } from "@govtechsg/sgds-react/Button"
import { Col, Container, Row } from 'react-bootstrap';
// import example from '../img/fullerton.stl'
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useDispatch, useSelector } from 'react-redux';
import { setShowAction } from '../Actions/stlContainer';
import { RenderFile } from './RenderFile';
import { useMediaQuery } from 'react-responsive';


import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkGenericRenderWindow from '@kitware/vtk.js/Rendering/Misc/GenericRenderWindow';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkSTLReader from '@kitware/vtk.js/IO/Geometry/STLReader';
import vtkOBJReader from '@kitware/vtk.js/IO/Misc/OBJReader';
import vtkITKPolyDataReader from '@kitware/vtk.js/IO/Misc/ITKPolyDataReader'
import readPolyDataArrayBuffer from 'itk/readPolyDataArrayBuffer'
const spiderman = "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"

// const style = {
//     "width" : '40vh',
//     "height": '40vh',
//     "border-width": "2px",
//     "border-color": "black",
//     "border-style": "groove"
// }

export default function FullscreenPreview(){
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)'})

    const dispatch = useDispatch();

    const files = useSelector(state => state.stl.files)
    const selectNumberArrCount = useSelector(state => state.stl.selectNumberArrCount)

    const showModal = useSelector(state => state.stlContainer.showModal)
    const [show, setShow] = useState(true)
    const handleClose = () => {
        dispatch(setShowAction(false))
    }

    const viewerElem = useRef(null);
    const genericRenderWindow = vtkGenericRenderWindow.newInstance({ listenWindowResize: true });

    useLayoutEffect(() => {
        console.log("derick updatted fs"+ show)
        if (viewerElem.current !== null) {
            viewerElem.current.innerHTML = "";
        }
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
    }, [showModal])


    return (
        <div
        >

            {showModal &&
                <Modal
                
                    show={show}
                    onHide={() => handleClose()}
                    fullscreen={true}
                    aria-labelledby="example-custom-modal-styling-title"
                    style={{ display: isTabletOrMobile || isDesktop ? "none" : "block"}}
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            File Import Preview Window
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div ref={viewerElem} 
                        className="full-screen-preview-viewer">
                        </div>
                        
                        
                    </Modal.Body>
                </Modal>
            }
        </div>
    )
}
