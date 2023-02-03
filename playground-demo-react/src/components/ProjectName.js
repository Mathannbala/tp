import { useState, useRef } from "react";
import { Form, Table, Col, Row, InputGroup  } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import userIcon from '../img/default_user_icon.jpg'
import { NavDropdown, Nav } from '@govtechsg/sgds-react/Nav'
import { DropdownButton, Navbar } from '@govtechsg/sgds-react'
import { inputFieldCompleted, formSubmitted } from '../Actions/forms';
import Container from 'react-bootstrap/Container';
import "./styles.css";
import { getProjectTokenAction } from "../Actions/project.js";

export default function ProjectName(){
    const dispatch = useDispatch()
    const projectToken = useSelector(state => state.project.projectToken);

    const getProjectToken = (e) => {
        console.log("Button clicked")
        if (!projectToken){
            console.log("Getting to dispatch retrieve project token")
            dispatch(getProjectTokenAction("abc", "jon@wiz.com"))
        }
    }

    return(
        <>
            <Form.Label>Project Name</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control type = "text" placeholder = "Enter in a project name to check" />
                <Button
                    variant="primary"
                    onClick={(e) => getProjectToken(e)}
                    disabled={projectToken ? true : false}
                >Check
                </Button>
            </InputGroup>
        </>
    )
}