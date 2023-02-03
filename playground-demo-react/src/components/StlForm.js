import React, { useState } from 'react'
import "@govtechsg/sgds/css/sgds.css"
import './styles.css'

import { Form, Table } from 'react-bootstrap';
import { Button } from "@govtechsg/sgds-react/Button"
import { Dropdown } from '@govtechsg/sgds-react'
import { NavDropdown, Nav } from '@govtechsg/sgds-react/Nav'
import { DropdownButton, Navbar } from '@govtechsg/sgds-react'
import userIcon from '../img/default_user_icon.jpg'

export default function StlForm(){
    console.log("StlForm")

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
        <>
            <div
                style = {{
                    "justify-content": "center",
                    "display": "flex",
                    "margin-bottom": "100px"
                }}
            >
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Upload STL Files</Form.Label>
                    <Form.Control type="file" multiple onChange = { (e) => handleFileUpload(e)}/>
                </Form.Group>
                { fileUpload && (

                    <>
                        <div
                            style={{
                                "overflow": "scroll",
                                "min-height": "300px",
                                "max-height": "300px",
                                "min-width": "500px",
                                "margin-left": "50px"
                                
                            }}
                        >
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
                        </div>
                    </>

                )}
            </div>
            
        </>
    )
}