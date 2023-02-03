import React, { useState, useEffect } from 'react'
import "@govtechsg/sgds/css/sgds.css"
import './styles.css'

import { Form, Table } from 'react-bootstrap';
import { Button } from "@govtechsg/sgds-react/Button"
import { Dropdown } from '@govtechsg/sgds-react'
import { NavDropdown, Nav } from '@govtechsg/sgds-react/Nav'
import { DropdownButton, Navbar } from '@govtechsg/sgds-react'
import userIcon from '../img/default_user_icon.jpg'
import { useDispatch, useSelector } from "react-redux";

import { StlViewer } from "react-stl-viewer";
import { setFileUploadAction, sendFileUploadAction, undoFileUploadAction, setFileArrSelected } from '../Actions/stl';
import { ADD_FILE, REMOVE_FILE, CLEARED_FILE, SUPPORTED_FILE_TYPES, ILLEGAL_FILE_EXCEPTION_MESSAGE } from '../constants';
import { useMediaQuery } from 'react-responsive';

//var url = "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"

const style = {
    "width" : '40vh',
    "height": '40vh',
    "border-width": "2px",
    "border-color": "black",
    "border-style": "groove"
}

export default function StlForm(){

    const dispatch = useDispatch()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)'})

    const [fileArrCount, setFileArrCount] = useState(0)
    const [fileUpload, setFileUpload] = useState([])
    
    const [fileUploadServer, setFileUploadServer] = useState([])
    const [actionFlag, setActionFlag] = useState()
    const [fileToRemove, setFileToRemove] = useState({})

    const [fileDictionary, setFileDictionary] = useState({})
    const [selectedPreviewFile, setSelectedPreviewFile] = useState(-1)
    const projectToken = useSelector((state) => state.project.projectToken)
    const supportedFileTypes = SUPPORTED_FILE_TYPES.split(",")
    
    var fileURL = ""
    const handleFileUpload = (e) =>{
        if (!supportedFileTypes.includes("."+(e.target.files[0]).name.split(".")[1])){
            alert(ILLEGAL_FILE_EXCEPTION_MESSAGE)
        }
        else if (!fileUploadServer.includes(e.target.files[0])){
            // const fileSize = e.target.files[0].size
            var fileData = e.target.files[0]
            fileURL = URL.createObjectURL(e.target.files[0]);
            // For StlContainer to find the file to preview on local disk
            setFileUpload(fileUpload => ([...fileUpload, fileData]))
            // To send the file to the server
            setFileUploadServer(fileUploadServer => ([...fileUploadServer, fileData]))
            // The file dictionary is to keep track of which fileURL belongs to which file data
            setFileDictionary(fileDictionary => ({...fileDictionary, [fileData.name]: fileURL}))
            // Setting the preview window to see the latest upload
            setSelectedPreviewFile(fileUploadServer.length)
            setActionFlag(ADD_FILE)
        }
        e.target.value = ""
    }

    const handleFileRemove = ( e, data, index) => {
        setFileToRemove({
            data: data,
            index: index
        })

        if (parseInt(selectedPreviewFile) === parseInt(e.target.id) || (parseInt(selectedPreviewFile) === fileUpload.length-1)){
            console.log("Seeing what we should do with preview now...")
            
            if (parseInt(selectedPreviewFile) === 0 && fileUpload.length === 2){
                // do nothing
                console.log("Doing nothing")
            }

            else if ((parseInt(selectedPreviewFile) >= 1 && fileUpload.length >= 1) || 
                ((parseInt(selectedPreviewFile) === fileUpload.length && fileUpload.length >= 1 ))){
                console.log("Selecting preview -1")
                let tmp = (parseInt(selectedPreviewFile) - 1)
                setSelectedPreviewFile(tmp)
            }

            else if (parseInt(selectedPreviewFile) === 0 && fileUpload.length >= 1){
                console.log("Selecting preview +1")
                console.log(selectedPreviewFile)
                let tmp = (parseInt(selectedPreviewFile) + 1)
                setSelectedPreviewFile(tmp)
                console.log(selectedPreviewFile)
            }
            
            else if (fileUpload.length === 0){
                console.log("Resetting preview")
                setSelectedPreviewFile(-1)
            }
        }

        // setFileUpload(fileUpload => (fileUpload.filter((item) => item !== fileDictionary[data.name])))
        setFileUpload(fileUpload => (fileUpload.filter((item) => item !== data)))
        setFileUploadServer(fileUploadServer => (fileUploadServer.filter((item) => item !== data)))
        setActionFlag(REMOVE_FILE)
    }

    const storeVar = (e) => {
        console.log("Selecting new preview of id: " + e.target.id);
        setSelectedPreviewFile(parseInt(e.target.id))
        dispatch(setFileArrSelected(parseInt(e.target.id)))
    }

    React.useEffect(() => {

        const remove = async () => {
            dispatch(setFileArrSelected(selectedPreviewFile))
            dispatch(setFileUploadAction(fileUpload))
            dispatch(undoFileUploadAction(fileToRemove.data, projectToken))
            setFileToRemove({})
        }

        const add = async () => {
            dispatch(setFileUploadAction(fileUpload))
            dispatch(sendFileUploadAction(fileUploadServer, projectToken))
            dispatch(setFileArrSelected(selectedPreviewFile))
        }
        if (actionFlag === ADD_FILE){
            add()
        }
        else if (actionFlag === REMOVE_FILE){
            remove()
        }
        setActionFlag(CLEARED_FILE)
      }, [actionFlag, selectedPreviewFile]);


    return(
        <>
            <div
                className=""
                style = {{
                    "margin-top": "50px",
                    "margin-bottom": "100px",
                }}
            >
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Upload STL Files</Form.Label>
                    <Form.Control 
                        type="file" 
                        disabled = { projectToken ? false : true}
                        onChange = { (e) => handleFileUpload(e)}
                        accept = {SUPPORTED_FILE_TYPES}/>
                </Form.Group>
                
                { fileUploadServer && (

                    <>
                        <div
                            style={{
                                "overflow-y": "scroll",
                                // "width" : isTabletOrMobile ? '20vh' : '40vh',
                                // "height": isTabletOrMobile ? '20vh' : '40vh',
                                "overflow": "scroll",
                                "min-height": "300px",
                                "max-height": "300px",
                                "min-width": "500px",
                                
                            }}
                        >
                            <Table>
                                <tr>
                                    <th>#</th>
                                    <th>File Name</th>
                                    <th>File Size</th>
                                    <th>Actions</th>
                                    <th></th>                   
                                </tr>

                                <tbody>
                                {fileUploadServer.map( (file,index) => {
                                    return (
                                        <tr key = {`stlFile_${index}`}>
                                            <td>{index}</td>
                                            <td>{file.name}</td>
                                            <td>{file.size}</td>
                                            <td>
                                                <button 
                                                    className="selectButton"
                                                    id = "customSelectButton"
                                                    onClick = { (e) => storeVar(e)}
                                                    ><i 
                                                    id={index}
                                                    className="selectButtonIcon">
                                                    Select 
                                                    </i> 
                                                </button>
                                            </td>
                                            <td>
                                                <button 
                                                    className="deleteButton"
                                                    id = "customDeleteButton"
                                                    onClick = { (e) => handleFileRemove( e, file, index)}
                                                    ><i 
                                                    id={index}
                                                    className="deleteButtonIcon">
                                                    Delete 
                                                    </i> 
                                                </button>
                                            </td>
                                            <td>
                                                <Form.Check
                                                inline
                                                type="checkbox"
                                                id="modelSelected"
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </Table>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}