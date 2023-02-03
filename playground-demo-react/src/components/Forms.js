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
import NoiseForm from "./NoiseForm";
import WindForm from "./WindForm";
import SolarForm from "./SolarForm";


// const [values, handleValues] = useState({
//     wind1: '',
//     wind2: '',
//   })
//   handleChange = (prop) => (e) => {
//     handleValues({...values, [prop]:e.target.value});
//   };
export default function Forms(){
    console.log("Forms")
    const dispatch = useDispatch()
    const onSubmit = () => {
        dispatch(formSubmitted())
    }

    const handleSolar9 = () => {
        setSolar9(!Solar_9)
    }

    const handleChange = (fieldName, fieldInput) =>
    {
        console.log(fieldName)
        const fieldType = fieldName.split("_")[0]
        console.log(formStatus[0][fieldType])
        console.log(fieldInput)
        if (fieldInput && !formStatus[0][fieldType][fieldName]){
            formStatus[0][fieldType][fieldName] = true
            dispatch(inputFieldCompleted("Noise2", true))
        }
        else if (!fieldInput && formStatus[0][fieldType][fieldName]){
            formStatus[0][fieldType][fieldName] = false
            dispatch(inputFieldCompleted("Noise2", false))
        }
    }

    const computeColor = (showFlag, sendFlag) =>{
        if (showFlag && sendFlag){
            return "#5952dc"
        }
        else if (!showFlag && sendFlag){
            return "black"
        }
        else if (!showFlag && !sendFlag){
            return "lightgray"
        }
    }

    const [showSolarForm, setShowSolarForm] = useState(true)
    const [showWindForm, setShowWindForm] = useState(false)
    const [showNoiseForm, setShowNoiseForm] = useState(false)
    const [showWindAndSolarForm, setWindAndSolarForm] = useState(false)
    const [showWindAndNoiseForm, setWindAndNoiseForm] = useState(false)
    const [sendSolarForm, setSendSolarForm] = useState(true)
    const [sendWindForm, setSendWindForm] = useState(false)
    const [sendNoiseForm, setSendNoiseForm] = useState(false)

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
    const [Solar_1, setSolar1] = useState("")
    const [Solar_2, setSolar2] = useState("")
    const [Solar_3, setSolar3] = useState("")
    const [Solar_4, setSolar4] = useState("")
    const [Solar_5, setSolar5] = useState("")
    const [Solar_6, setSolar6] = useState("")
    const [Solar_7, setSolar7] = useState(false)
    const [Solar_9, setSolar9] = useState(false)
    const [Noise_1, setNoise1] = useState("")
    const [Noise_2, setNoise2] = useState("")
    const [Noise_3, setNoise3] = useState("")
    const [Noise_4, setNoise4] = useState("")
    const [Noise_5, setNoise5] = useState("")
    const [Noise_6, setNoise6] = useState("")
    const [Noise_7, setNoise7] = useState("")
    const [Noise_8, setNoise8] = useState("")
    const [Noise_9, setNoise9] = useState("")
    const [WindAndSolar_1, setWindAndSolar1] = useState("")
    const [WindAndSolar_2, setWindAndSolar2] = useState("")
    const [WindAndNoise_1, setWindAndNoise1] = useState("")
    const [WindAndNoise_2, setWindAndNoise2] = useState("")
    const [windDirection, setWindDirection]=useState("N")

    const formStatus = useState({
        Solar:{
            "Solar_1": false,
            "Solar_2": false
        },
        Wind:{
            "Wind_1": false,
            "Wind_2": false,
            "Wind_3": false,
            "Wind_4": false,
            "Wind_5": false,
            "Wind_6": false,
            "Wind_7": false,
            "Wind_8": false,
            "Wind_9": false,
            "Wind_10": false,
            "Wind_11": false,
            "Wind_12": false,
            "Wind_13": false,
            "Wind_14": false
        },
        Noise:{
            "Noise_1": false,
            "Noise_2": false,
            "Noise_3": false,
            "Noise_4": false,
            "Noise_5": false,
            "Noise_6": false,
            "Noise_7": false,
            "Noise_8": false,
            "Noise_9": false
        },
        WindAndSolar:{
            "WindAndSolar_1": false,
            "WindAndSolar_2": false
        },
        WindAndNoise:{
            "WindAndNoise_1": false,
            "WindAndNoise_2": false
        }
    })

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
                    "align-items": "center",
                    "width": "100vh",
                    "padding": "5vh",
                    "margin": "5vh",
                }}
            >
                <div className="row mb-6">
                    <h5> Select your Project Type</h5>
                </div>
                
                <Form>
                    <div>
                        <Form.Check
                            inline
                            label="Solar"
                            name="group1"
                            type="radio"
                            onChange = { (e) => {
                                setSendWindForm(false); 
                                setSendSolarForm(true); 
                                setSendNoiseForm(false);
                                setShowWindForm(false);
                                setShowSolarForm(true);
                                setShowNoiseForm(false);
                            }}
                            defaultChecked
                        />
                        
                        <Form.Check
                            inline
                            label="Wind"
                            name="group1"
                            type="radio"
                            onChange = { (e) => {
                                setSendWindForm(true); 
                                setSendSolarForm(false); 
                                setSendNoiseForm(false);
                                setShowWindForm(true);
                                setShowSolarForm(false);
                                setShowNoiseForm(false);
                            }}
                        />
                        
                        <Form.Check
                            inline
                            label="Noise"
                            name="group1"
                            type="radio"
                            onChange = { (e) => {
                                setSendWindForm(false); 
                                setSendSolarForm(false); 
                                setSendNoiseForm(true);
                                setShowWindForm(false);
                                setShowSolarForm(false);
                                setShowNoiseForm(true);
                            }}
                        />

                        <Form.Check
                            inline
                            label="Wind and Noise"
                            name="group1"
                            type="radio"
                            onChange = { (e) => {
                                setSendWindForm(true); 
                                setSendSolarForm(false); 
                                setSendNoiseForm(true);
                                setShowWindForm(true);
                                setShowSolarForm(false);
                                setShowNoiseForm(false);
                            }}
                        />

                        <Form.Check
                            inline
                            label="Wind and Solar"
                            name="group1"
                            type="radio"
                            onChange = { (e) => {
                                setSendWindForm(true); 
                                setSendSolarForm(true); 
                                setSendNoiseForm(false);
                                setShowWindForm(false);
                                setShowSolarForm(true);
                                setShowNoiseForm(false);
                            }}
                        />
                    </div>
                </Form>

                <Nav>
                    <Navbar className="mt-4 mb-5 sgds navbar navbar-expand-lg">
                        <Nav.Item>
                            <Nav.Link
                                style={{
                                    "color": computeColor(showSolarForm, sendSolarForm),
                                    "border-color" : "transparent",
                                    "border-bottom-color": showSolarForm ? "#5952dc": "",
                                    "border-bottom-width": showSolarForm ? "2px" : ""
                                }}
                                onClick={ (e) => {setShowSolarForm(true); setShowWindForm(false); setShowNoiseForm(false);}}
                                disabled = { sendSolarForm ? false : true } 
                            >Solar
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link
                                style={{
                                    "color": computeColor(showWindForm, sendWindForm),
                                    "border-color" : "transparent",
                                    "border-bottom-color": showWindForm ? "#5952dc": "",
                                    "border-bottom-width": showWindForm ? "2px" : ""
                                }}
                                onClick={ (e) => {setShowSolarForm(false); setShowWindForm(true); setShowNoiseForm(false);}}
                                disabled = { sendWindForm ? false : true }
                            >Wind
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link
                                style={{
                                    "color": computeColor(showNoiseForm, sendNoiseForm),
                                    "border-color" : "transparent",
                                    "border-bottom-color": showNoiseForm ? "#5952dc": "",
                                    "border-bottom-width": showNoiseForm ? "2px" : ""
                                }}
                                onClick={ (e) => {setShowSolarForm(false); setShowWindForm(false); setShowNoiseForm(true);}}
                                disabled = { sendNoiseForm ? false : true }
                            >Noise
                            </Nav.Link>
                        </Nav.Item>
                    </Navbar>
                </Nav>
                {/* <ButtonGroup size="sm" className = "mt-4 sgds navbar navbar-expand-lg">
                    <Button className = "formNavBarButton" variant="secondary" onClick={ (e) => {setShowSolarForm(true); setShowWindForm(false); setShowNoiseForm(false)}}>Solar</Button>
                    <Button className = "formNavBarButton" variant="secondary" onClick={ (e) => {setShowSolarForm(false); setShowWindForm(true); setShowNoiseForm(false)}}>Wind</Button>
                    <Button className = "formNavBarButton" variant="secondary" onClick={ (e) => {setShowSolarForm(false); setShowWindForm(false); setShowNoiseForm(true)}}>Noise</Button>
                </ButtonGroup> */}
                <Form 
                    onSubmit={onSubmit}

                >
                    <div
                    style = {{
                        "height": "80vh",
                        "overflow": "scroll",
                        "padding": "5vh",
                        "margin-bottom": "5vh"
                    }}
                    >
                        <div
                            style = {{
                                "display": showSolarForm ? "" : "None"
                            }}
                        >
                            <SolarForm></SolarForm>
                        </div>

                        <div
                            style = {{
                                "display": showNoiseForm ? "" : "None"
                            }}
                        >
                            <NoiseForm></NoiseForm>
                        </div>

                        <div
                            style = {{
                                "display": showWindForm ? "" : "None"
                            }}
                        >
                            <WindForm></WindForm>
                        </div>

                    </div>
                </Form>
            </div>
        </>
    )
}