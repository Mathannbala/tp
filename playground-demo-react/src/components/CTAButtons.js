import React, { useEffect, useState } from 'react'
import "@govtechsg/sgds/css/sgds.css"
import './styles.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { formSubmitted, setSubmitFormFlag } from "../Actions/forms";
import { useMediaQuery } from 'react-responsive'
import { getProjectResultsAction } from '../Actions/project';
import { POLL_PROJECT_STATUS_URL } from '../constants';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from 'react-query'
import FileSaver from 'file-saver';

import axios from "axios";

import { Button } from "@govtechsg/sgds-react/Button"


export default function CTAButtons(){
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
    
    const { solar, wind, noise, project } = useSelector((state) => ({ 
        solar: state.solar,
        wind: state.wind,
        noise: state.noise,
        project: state.project
      }))
    const projectType = useSelector(state => state.forms.projectType)
    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    useQuery(
        "fetching",
        async () =>{
            if (project.projectToken === undefined || project.projectRetrieved){
                return
            }
            console.log("sending a ping")
            let formData = new FormData();
            formData.append("projectToken", "1e2af136-7f3a-4cf8-996a-87afe75f08c0")

            const res = await axios.post(
                POLL_PROJECT_STATUS_URL,
                formData
                );
            return res
        },
        {
            refetchInterval: 10_000,
            refetchIntervalInBackground: true,
            onSuccess: (data) => {
                if (!data){
                    return
                }
                else if (data.data === "READY"){
                    console.log("Ready to fetch!")
                    dispatch(getProjectResultsAction(
                        "1e2af136-7f3a-4cf8-996a-87afe75f08c0",
                        "jon@wiz.com"
                    ))
                }
                else{
                    console.log("Server still processing")
                }
            }
        },
        
    )
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setSubmitFormFlag({submitFormFlag: true}))
    }

    function str2bytes (str) {
        var bytes = new Uint8Array(str.length);
        for (var i=0; i<str.length; i++) {
            bytes[i] = str.charCodeAt(i);
        }
        return bytes;
    }

    useEffect(() => {

        function saveByteArray(blob) {
            FileSaver.saveAs(blob, "nameFile.zip")
        };

        if (project.projectResults){
            saveByteArray(project.projectResults);
        }
    }, [project.projectResults])



    useEffect(() => {

        console.log(projectType)
        console.log(solar)
        console.log(wind)
        console.log(noise)
        console.log(project.cores)
        if (projectType){
            if ((projectType.sendSolarForm && solar.solarFormValidated ) ||
                (projectType.sendWindForm && wind.windFormValidated ) || 
                (projectType.sendNoiseForm && noise.noiseFormValidated ) ||
                (projectType.sendWindForm && projectType.sendNoiseForm && wind.windFormValidated && noise.noiseFormValidated ) ||
                (projectType.sendWindForm && projectType.sendSolarForm && wind.windFormValidated && solar.solarFormValidated )
                ){
                    console.log("Form validated, sending now")
                    // dispatch(formSubmitted(solar, wind, noise, project.cores, "12345"))
                    dispatch(formSubmitted(solar, wind, noise, project.cores, project.projectToken))
            }
            else{
                console.log("Form not validated")
            }
        }
    }, [solar.solarFormValidated, wind.windFormValidated, noise.noiseFormValidated])

    return(

    <>
        <Container>
            <Row
                //className = "ml-5" 
                className="cta-button"
                xs = "auto"
            >
                <button
                    className="fullscreenButton"
                    size={isTabletOrMobile ? 'sm' : 'md'}
                >Download .VTK</button>
                <button
                    className="saveConfigButton"
                    size={isTabletOrMobile ? 'sm' : 'md'}
                >Save Configuration</button>
                <button
                    className="deleteVTKButton"
                    size={isTabletOrMobile ? 'sm' : 'md'}
                >Delete .VTK</button>
            </Row>
            <Row>
                <button 
                    className="visualizeButton"
                    disabled={project.projectToken ? false : true}
                    size={isTabletOrMobile ? 'sm' : 'md'}
                    // style = {{
                    //     "width": "50vh"
                    // }}
                    onClick = {(e) => handleSubmit(e)}
                >Visualize</button>
            </Row>
        </Container>
    </>
)
}