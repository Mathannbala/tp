import { useState, useRef, useEffect } from "react";
import { Form, Table, Col, Row, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';
import Accordion from "react-bootstrap/Accordion";
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import userIcon from "../img/default_user_icon.jpg";
import { NavDropdown, Nav } from "@govtechsg/sgds-react/Nav";
import { DropdownButton, Navbar } from "@govtechsg/sgds-react";
import { inputFieldCompleted, formSubmitted } from "../Actions/forms";
import Container from "react-bootstrap/Container";

import { setWindActivated } from "../Actions/wind";
import { setSolarActivated } from "../Actions/solar";
import { setNoiseActivated } from "../Actions/noise";
import { updateProjectType } from "../Actions/forms";

import NoiseForm from "./NoiseForm";
import WindForm from "./WindForm";
import SolarForm from "./SolarForm";

import "@govtechsg/sgds/css/sgds.css";
import "./styles.css";

import { useMediaQuery } from "react-responsive";
   
export default function Forms(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
  const dispatch = useDispatch();

  const solarRef = useRef(null);
  const windRef = useRef(null);
  const noiseRef = useRef(null);

  const handleClick = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openAccordion = (selectedAccordion) => {
    if (selectedAccordion === activeKey) {
      setActiveKeyArray(-1);
    } else if (selectedAccordion !== activeKey) {
      setActiveKeyArray(selectedAccordion);
    }
    else if (selectedAccordion !== activeKey){
      setActiveKeyArray(selectedAccordion)
    }
  }

  const computeColor = (showFlag, sendFlag) => {
    if (showFlag && sendFlag) {
      return "#5952dc";
    } else if (!showFlag && sendFlag) {
      return "black";
    } else if (!showFlag && !sendFlag) {
      return "lightgray";
    }
  };

  const [showSolarForm, setShowSolarForm] = useState(true);
  const [showWindForm, setShowWindForm] = useState(false);
  const [showNoiseForm, setShowNoiseForm] = useState(false);
  const [showWindAndSolarForm, setWindAndSolarForm] = useState(false);
  const [showWindAndNoiseForm, setWindAndNoiseForm] = useState(false);

  const [sendSolarForm, setSendSolarForm] = useState(true);
  const [sendWindForm, setSendWindForm] = useState(false);
  const [sendNoiseForm, setSendNoiseForm] = useState(false);

  const [activeKey, setActiveKeyArray] = useState(0);
  const [fileUpload, setFileUpload] = useState([]);

  const submitFormFlag = useSelector((state) => state.forms.submitFormFlag);
  const solarFormValidated = useSelector((state) => state.solar.solarFormValidated);
  const windFormValidated = useSelector((state) => state.wind.windFormValidated);
  const noiseFormValidated = useSelector((state) => state.noise.noiseFormValidated);
  const projectType = useSelector((state) => state.forms.projectType);
  const projectToken = useSelector((state) => state.project.projectToken);

  useEffect(() => {

    const update = async () => {
        dispatch(updateProjectType({
          "sendSolarForm": sendSolarForm, 
          "sendWindForm": sendWindForm, 
          "sendNoiseForm":sendNoiseForm}))
    }
    update()
  }, [sendSolarForm, sendWindForm, sendNoiseForm]);

  const handleFileUpload = (e) => {
    if (!fileUpload.includes(e.target.value)) {
      const fileName = e.target.value;
      const fileSize = e.target.files[0].size;
      // console.log (fileName + " :" + fileSize)
      setFileUpload((fileUpload) => [...fileUpload, fileName + "," + fileSize]);
    }
  };

  const handleFileRemove = (file) => {
    console.log("Removing file");
    console.log(file);
    setFileUpload(fileUpload.filter((item) => item !== file));
  };

  return (
    <>
      <div
        className="forms"
        // style={{
        //   "justify-content": "center",
        //   "align-items": "center",
        //   color: "black",
        // }}
      >
        <div 
        //className="row mb-6"
        className="select-project-header"
        >
          <h5> <b>Select your Project Type</b></h5>
        </div>

        <Form>
          <div>
            <Form.Check
              className='form-check'
              disabled = { projectToken ? false : true}
              id="solarRadioBtn"
              label="Solar"
              name="group1"
              type="radio"
              onChange={(e) => {
                setSendWindForm(false);
                setSendSolarForm(true);
                setSendNoiseForm(false);
                setShowWindForm(false);
                setShowSolarForm(true);
                setShowNoiseForm(false);
                setActiveKeyArray(0);

                dispatch(setWindActivated(false));
                dispatch(setSolarActivated(true));
                dispatch(setNoiseActivated(false));

                handleClick(solarRef);
              }}
              defaultChecked
            />

            <Form.Check
            className='form-check'
              disabled = { projectToken ? false : true}
              id="windRadioBtn"
              label="Wind"
              name="group1"
              type="radio"
              onChange={(e) => {
                setSendWindForm(true);
                setSendSolarForm(false);
                setSendNoiseForm(false);
                setShowWindForm(true);
                setShowSolarForm(false);
                setShowNoiseForm(false);
                setActiveKeyArray(1);

                dispatch(setWindActivated(true));
                dispatch(setSolarActivated(false));
                dispatch(setNoiseActivated(false));

                handleClick(windRef);
              }}
            />

            <Form.Check
            className='form-check'
              disabled = { projectToken ? false : true}
              id="noiseRadioBtn"
              label="Noise"
              name="group1"
              type="radio"
              onChange={(e) => {
                setSendWindForm(false);
                setSendSolarForm(false);
                setSendNoiseForm(true);
                setShowWindForm(false);
                setShowSolarForm(false);
                setShowNoiseForm(true);
                setActiveKeyArray(2);

                dispatch(setWindActivated(false));
                dispatch(setSolarActivated(false));
                dispatch(setNoiseActivated(true));

                handleClick(noiseRef);
              }}
            />

            <Form.Check
            className='form-check'
              disabled = { projectToken ? false : true}
              id="windNoiseRadioBtn"
              label="Wind and Noise"
              name="group1"
              type="radio"
              onChange={(e) => {
                setSendWindForm(true);
                setSendSolarForm(false);
                setSendNoiseForm(true);
                setShowWindForm(true);
                setShowSolarForm(false);
                setShowNoiseForm(false);
                setActiveKeyArray(1);

                dispatch(setWindActivated(true));
                dispatch(setSolarActivated(false));
                dispatch(setNoiseActivated(true));

                handleClick(windRef);
              }}
            />

            <Form.Check
            className='form-check'
              disabled = { projectToken ? false : true}
              id="windSolarRadioBtn"
              label="Wind and Solar"
              name="group1"
              type="radio"
              onChange={(e) => {
                setSendWindForm(true);
                setSendSolarForm(true);
                setSendNoiseForm(false);
                setShowWindForm(false);
                setShowSolarForm(true);
                setShowNoiseForm(false);

                setActiveKeyArray(0);
                dispatch(setWindActivated(true));
                dispatch(setSolarActivated(true));
                dispatch(setNoiseActivated(false));

                handleClick(solarRef);
              }}
            />
                <Form>
                    <div>
                      {/* mal dont remove this styling it only works directly */}
                        <Accordion activeKey = {activeKey.toString()} style={{width:"50vw"}}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Button
                                    disabled = { ( sendSolarForm && projectToken ) ? false : true } 
                                    style = {{
                                        "color": computeColor(false, sendSolarForm)
                                    }}
                                    onClick = {(e) => {openAccordion(0)}}
                                >
                                    Solar
                                    { submitFormFlag && !solarFormValidated && projectType.sendSolarForm &&
                                      <Badge pill bg="warning" text="dark" className = "ml-2">
                                        !
                                      </Badge>
                                    }
                                </Accordion.Button>
                                <Accordion.Body>
                                    <SolarForm></SolarForm>
                                </Accordion.Body>
                                <div ref = {solarRef}></div>
                            </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Button
                      disabled = { ( sendWindForm && projectToken ) ? false : true } 
                      style={{
                        color: computeColor(false, sendWindForm),
                      }}
                      onClick={(e) => {
                        openAccordion(1);
                      }}
                    >
                      Wind
                      { submitFormFlag && !windFormValidated && projectType.sendWindForm &&
                        <Badge pill bg="warning" text="dark" className = "ml-2">
                          !
                        </Badge>
                      }
                    </Accordion.Button>
                    <Accordion.Body>
                      <WindForm></WindForm>
                    </Accordion.Body>
                    <div ref={windRef}></div>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2">
                    <Accordion.Button
                      disabled = { ( sendNoiseForm && projectToken ) ? false : true } 
                      style={{
                        color: computeColor(false, sendNoiseForm),
                      }}
                      onClick={(e) => {
                        openAccordion(2);
                      }}
                    >
                      Noise
                      { submitFormFlag && !noiseFormValidated && projectType.sendNoiseForm &&
                        <Badge 
                        pill bg="warning" 
                        text="dark" 
                        className = "ml-2">
                          !
                        </Badge>
                      }
                    </Accordion.Button>
                    <Accordion.Body>
                      <NoiseForm></NoiseForm>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <div ref={noiseRef}></div>
              </div>
            </Form>
          </div>
        </Form>
      </div>
    </>
  );
}
