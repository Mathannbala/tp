import React, { useEffect, useRef, useState } from 'react'

import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";

import InputWithButtons from "./InputWithButtons";
import InputDropdown from "./InputDropdown";
import FormCheck from "./FormCheck";

import { incrementHandler, decrementHandler, checkNumericInput } from "./Utils";
import { setSolarFormValidated, setStateValue } from "../Actions/solar";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import subDays from "date-fns/subDays";
import { useMediaQuery } from "react-responsive";

import * as constants from "../constants";
import { MESH_RESOLUTION_MIN, MESH_RESOLUTION_MAX, MESH_OFFSET_MIN, MESH_OFFSET_MAX } from '../constants';
import { object } from 'prop-types';
export default function SolarForm() {
  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })

  const submitRef = useRef(null);
  const mouseClickEvents = ['mousedown', 'click', 'mouseup'];

  const [validated, setValidated] = useState(false);
  const meshResolution = useSelector((state) => state.solar.meshResolution.value);
  const showAdvancedOptions = useSelector((state) => state.solar.showAdvancedOptions.value);
  const meshOffset = useSelector((state) => state.solar.meshOffset.value);
  const pointInTime = useSelector((state) => state.solar.pointInTime.value);
  const cumulativeSky = useSelector((state) => state.solar.cumulativeSky.value);
  const solarIrradiation = useSelector((state) => state.solar.solarIrradiation.value);
  const absorbedSolarEnergy = useSelector((state) => state.solar.absorbedSolarEnergy.value);
  const solarShading = useSelector((state) => state.solar.solarShading.value);
  const daylightIlluminance = useSelector((state) => state.solar.daylightIlluminance.value);
  const solarIrradiance = useSelector((state) => state.solar.solarIrradiance.value);
  const absorbedHeatFlux = useSelector((state) => state.solar.absorbedHeatFlux.value);
  const skyViewFactor = useSelector((state) => state.solar.skyViewFactor.value);
  const multiHourlySim = useSelector((state) => state.solar.multiHourlySim.value);
  const startDateTime = useSelector((state) => state.solar.startDateTime.value);
  const endDateTime = useSelector((state) => state.solar.endDateTime.value);
  const reflection = useSelector((state) => state.solar.reflection.value);
  const samplingRay = useSelector((state) => state.solar.samplingRay.value);
  const sunInclusion = useSelector((state) => state.solar.sunInclusion.value);
  const multiband = useSelector((state) => state.solar.multiband.value);
  const submitFormFlag = useSelector((state) => state.forms.submitFormFlag);
  const projectType = useSelector(state => state.forms.projectType)
  const projectToken = useSelector(state => state.project.projectToken)
  const input = useSelector(state => state.solar)

  // dropdown options
  const reflections = ["0", "1", "2"];
  const samplingRays = ["64", "128", "256", "512", "1024", "2048"];
  const sunInclusions = ["With Sun", "No Sun"];
  const multibands = ["Total", "Total & Multiband"];

  // radio button options
  const simulationTypes = {
    [constants.POINT_IN_TIME_LABEL]: pointInTime,
    [constants.CUMULATIVE_SKY_LABEL]: cumulativeSky,
  };

  // checkbox options
  const outputTypesPointInTime = {
    [constants.SOLAR_SHADING_LABEL]: solarShading,
    [constants.DAYLIGHT_ILLUMINANCE_LABEL]: daylightIlluminance,
    [constants.SOLAR_IRRADIANCE_LABEL]: solarIrradiance,
    [constants.ABSORBED_HEAT_FLUX_LABEL]: absorbedHeatFlux,
    [constants.SKY_VIEW_FACTOR_LABEL]: skyViewFactor,
  };

  const outputTypesCumulativeSky = {
    [constants.SOLAR_IRRADIATION_LABEL]: solarIrradiation,
    [constants.ABSORBED_SOLAR_ENERGY_LABEL]: absorbedSolarEnergy,
  };

  // Simulation Type radio button handler
  const radioBtnHandler = (e) => {
    const parentElement = e.target.parentNode;
    const labelElement = parentElement.childNodes[1];
    const label = labelElement.firstChild.nodeValue;

    if (label === constants.POINT_IN_TIME_LABEL) {
      dispatch(setStateValue(constants.POINT_IN_TIME, true));
      dispatch(setStateValue(constants.CUMULATIVE_SKY, false));
    } else {
      dispatch(setStateValue(constants.POINT_IN_TIME, false));
      dispatch(setStateValue(constants.CUMULATIVE_SKY, true));
    }
  };

  const outputType = {
    solarIrradiation,
    absorbedSolarEnergy,
    solarShading,
    daylightIlluminance,
    solarIrradiance,
    absorbedHeatFlux,
    skyViewFactor
  }
  const checkOutputType = () =>{
    let values = Object.values(outputType);
    for (let index = 0; index < values.length; index++)
    {
        if (values[index]===true){
          console.log("returning true")
          return true;
        }
    }
    return false
  }
  // Output Types checkbox handler
  const checkBoxHandler = (e) => {
    const parentElement = e.target.parentNode;
    const labelElement = parentElement.childNodes[1];
    const label = labelElement.firstChild.nodeValue;

    switch (label) {
      case constants.SOLAR_IRRADIATION_LABEL:
        dispatch(setStateValue(constants.SOLAR_IRRADIATION, !solarIrradiation));
        break;
      case constants.ABSORBED_SOLAR_ENERGY_LABEL:
        dispatch(setStateValue(constants.ABSORBED_SOLAR_ENERGY, !absorbedSolarEnergy));
        break;
      case constants.SOLAR_SHADING_LABEL:
        dispatch(setStateValue(constants.SOLAR_SHADING, !solarShading));
        break;
      case constants.DAYLIGHT_ILLUMINANCE_LABEL:
        dispatch(setStateValue(constants.DAYLIGHT_ILLUMINANCE, !daylightIlluminance));
        break;
      case constants.SOLAR_IRRADIANCE_LABEL:
        dispatch(setStateValue(constants.SOLAR_IRRADIANCE, !solarIrradiance));
        break;
      case constants.ABSORBED_HEAT_FLUX_LABEL:
        dispatch(setStateValue(constants.ABSORBED_HEAT_FLUX, !absorbedHeatFlux));
        break;
      case constants.SKY_VIEW_FACTOR_LABEL:
        dispatch(setStateValue(constants.SKY_VIEW_FACTOR, !skyViewFactor));
        break;
    }
  };

  useEffect(() =>{

    const selfValidateForm = () =>{
      if (( meshResolution == "" || meshResolution< MESH_RESOLUTION_MIN || meshResolution> MESH_RESOLUTION_MAX) ||
          ( meshOffset == "" || meshOffset < MESH_OFFSET_MIN || meshOffset> MESH_OFFSET_MAX ) ||
          ( !checkOutputType() ) ||
          ( !startDateTime ) ||
          ( (!endDateTime && multiHourlySim === true) ))
          {
            console.log("Solar form is not validated properly")
            dispatch( setSolarFormValidated(false))
          }
          else{
            console.log("Solar form is validated properly")
            dispatch( setSolarFormValidated(true))
          }
    }
    if (submitFormFlag && projectType.sendSolarForm){
      console.log(outputType)
      selfValidateForm()
    }
  },[submitFormFlag])
  
  return (
    <>
    <Form>
      <Container>
        <Row>
          <Col>
            <InputWithButtons
              required
              disabled = { projectToken ? false : true}
              controlId="meshResolution"
              formLabel="Mesh Resolution (m)"
              incBtnName="meshResolutionIncrement"
              decBtnName="meshResolutionDecrement"
              subDisabled={meshResolution == MESH_RESOLUTION_MIN ? true : false}
              addDisabled={meshResolution == MESH_RESOLUTION_MAX ? true : false}
              placeholder="0.1 - 10.0"
              min="0.1"
              max="10"
              step="0.1"
              value={meshResolution}
              isInvalid={( meshResolution == "" || meshResolution< MESH_RESOLUTION_MIN || meshResolution> MESH_RESOLUTION_MAX) && submitFormFlag}
              onIncBtnClick={() =>dispatch(setStateValue(constants.MESH_RESOLUTION, incrementHandler(meshResolution, 0.1, 10, 0.1)))}
              onDecBtnClick={() =>dispatch(setStateValue(constants.MESH_RESOLUTION, decrementHandler(meshResolution, 0.1, 0.1)))}
              onChange={(e) => dispatch(setStateValue(constants.MESH_RESOLUTION, e.target.value))}
              onBlur={(e) => dispatch(setStateValue(constants.MESH_RESOLUTION, checkNumericInput(e.target.value, 0.1, 10)))}
            ></InputWithButtons>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="showAdvancedOptions">
              <Form.Check
                disabled = { projectToken ? false : true}
                style={{ textAlign: "right" ,
                         float: "right"}}
                label="Show Advanced Options"
                name="showAdvancedOptions"
                type="switch"
                id="showAdvancedOptions"
                checked={showAdvancedOptions}
                onChange={() => dispatch(setStateValue(constants.SHOW_ADVANCED_OPTIONS, !showAdvancedOptions))}
                required={false}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <InputWithButtons
              disabled = { projectToken ? false : true}
              controlId="meshOffset"
              formLabel="Mesh Offset (m)"
              incBtnName="meshOffsetIncrement"
              decBtnName="meshOffsetDecrement"

              subDisabled={meshOffset == MESH_OFFSET_MIN && meshOffset ? true : false}
              addDisabled={meshOffset == MESH_OFFSET_MAX ? true : false}
              placeholder="0.0 - 0.30"
              min="0"
              max="0.3"
              step="0.1"
              value={meshOffset}
              isInvalid={( meshOffset == "" || meshOffset < MESH_OFFSET_MIN || meshOffset> MESH_OFFSET_MAX) && submitFormFlag}
              onChange={(e) => {dispatch(setStateValue(constants.MESH_OFFSET, e.target.value));}}
              onBlur={(e) =>dispatch(setStateValue(constants.MESH_OFFSET, checkNumericInput(e.target.value, 0, 0.3)))}
              onIncBtnClick={() => {dispatch(setStateValue(constants.MESH_OFFSET, incrementHandler(meshOffset, 0, 0.3, 0.1)));}}
              onDecBtnClick={() => {dispatch(setStateValue(constants.MESH_OFFSET, decrementHandler(meshOffset, 0, 0.1)));}}
              sm="3"
            ></InputWithButtons>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Row>
                <Col sm={3}>
                  <Form.Label>Simulation Type</Form.Label>
                </Col>
                <Col>
                  <FormCheck
                    inline={true}
                    disabled = { projectToken ? false : true}
                    list={simulationTypes}
                    name="simulationType"
                    type="radio"
                    onChange={(e) => radioBtnHandler(e)}
                  ></FormCheck>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Row>
                <Col sm={2}>
                  <Form.Label>Output Types</Form.Label>
                </Col>
                <Col>
                  <FormCheck
                    inline={true}
                    disabled = { projectToken ? false : true}
                    list={pointInTime === true ? outputTypesPointInTime : outputTypesCumulativeSky}
                    name="outputTypes"
                    type="checkbox"
                    onChange={(e) => checkBoxHandler(e)}
                    required
                    isInvalid={ !checkOutputType() && submitFormFlag}
                  ></FormCheck>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="multiHourlySim">
              <Form.Check
                label="Multiple Hourly Simulations"
                disabled = { projectToken ? false : true}
                name="multiHourlySim"
                type="checkbox"
                id="multiHourlySim"
                checked={multiHourlySim}
                onChange={() => dispatch(setStateValue(constants.MULTI_HOURLY_SIM, !multiHourlySim))}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="startDateTime">
                  <Row className="align-items-center">
                    <Col sm={5}>
                      <Form.Label>Start Date/Time</Form.Label>
                    </Col>
                    <Col sm={7}>
                      <DatePicker
                        disabled = { projectToken ? false : true}
                        className= { (startDateTime || !submitFormFlag ) ?  "form-control" : "form-control react-date-picker__customized"} 
                        popperContainer={({ children }) => createPortal(children, document.body)}
                        popperProps={{ strategy: "fixed" }}
                        popperPlacement="top"
                        popperModifiers={[
                          {
                            name: "flip",
                            options: {
                              fallbackPlacements: ["top"],
                              allowedAutoPlacements: ["top"],
                            },
                          },
                        ]}
                        selected={startDateTime}
                        onChange={(date) => {
                          if (date) {
                            //disallow selecting of today's date
                            if (date.getDate() === new Date().getDate()) {
                              date.setDate(subDays(new Date(), 2).getDate());
                            }

                            // cap minimum time
                            if (pointInTime) {
                              if (date.getHours() === 0) {
                                date.setHours(7);
                              }
                            }
                          }

                          dispatch(setStateValue(constants.START_DATE_TIME, date));
                        }}
                        dateFormat="d MMM yyyy, h:mm aa"
                        maxDate={subDays(new Date(), 2)}
                        showTimeSelect
                        minTime={
                          pointInTime
                            ? setHours(setMinutes(new Date(), 0), 7)
                            : setHours(setMinutes(new Date(), 0), 0)
                        }
                        maxTime={
                          pointInTime
                            ? setHours(setMinutes(new Date(), 0), 18)
                            : setHours(setMinutes(new Date(), 0), 23)
                        }
                        isClearable
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="endDateTime">
                  <Row className="align-items-center">
                    <Col sm={5}>
                      <Form.Label>End Date/Time</Form.Label>
                    </Col>
                    <Col sm={7}>
                      <DatePicker
                        required
                        className= { ((!endDateTime && multiHourlySim === true) &&  submitFormFlag) ?  "form-control react-date-picker__customized" : "form-control"} 
                        popperContainer={({ children }) => createPortal(children, document.body)}
                        popperProps={{ strategy: "fixed" }}
                        popperPlacement="top"
                        popperModifiers={[
                          {
                            name: "flip",
                            options: {
                              fallbackPlacements: ["top"],
                              allowedAutoPlacements: ["top"],
                            },
                          },
                        ]}
                        selected={endDateTime}
                        onChange={(date) => {
                          if (date) {
                            // cap minimum time
                            if (pointInTime) {
                              if (date.getHours() === 0) {
                                date.setHours(7);
                              }
                            }
                          }

                          dispatch(setStateValue(constants.END_DATE_TIME, date));
                        }}
                        disabled={multiHourlySim === true ? false : true}
                        dateFormat="d MMM yyyy, h:mm aa"
                        showTimeSelect
                        minTime={
                          pointInTime
                            ? setHours(setMinutes(new Date(), 0), 7)
                            : setHours(setMinutes(new Date(), 0), 0)
                        }
                        maxTime={
                          pointInTime
                            ? setHours(setMinutes(new Date(), 0), 18)
                            : setHours(setMinutes(new Date(), 0), 23)
                        }
                        isClearable
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>

        {showAdvancedOptions && (
          <>
            <Row>
              <Col>
                <InputDropdown
                  controlId="reflection"
                  formLabel="Reflection"
                  onChange={(e) => dispatch(setStateValue(constants.REFLECTION, e.target.value))}
                  dropdownList={reflections}
                  value={reflection}
                  disabled={false}
                ></InputDropdown>
              </Col>
            </Row>

            <Row>
              <Col>
                <InputDropdown
                  controlId="samplingRay"
                  formLabel="No. of Sampling Ray"
                  onChange={(e) => dispatch(setStateValue(constants.SAMPLING_RAY, e.target.value))}
                  dropdownList={samplingRays}
                  value={samplingRay}
                  disabled={false}
                ></InputDropdown>
              </Col>
            </Row>

            <Row>
              <Col>
                <InputDropdown
                  controlId="sunInclusion"
                  formLabel="Sun Inclusion"
                  onChange={(e) => dispatch(setStateValue(constants.SUN_INCLUSION, e.target.value))}
                  dropdownList={sunInclusions}
                  value={sunInclusion}
                  disabled={pointInTime ? false : true}
                ></InputDropdown>
              </Col>
            </Row>

            {((pointInTime && solarIrradiance) ||
              (pointInTime && absorbedHeatFlux) ||
              (cumulativeSky && solarIrradiation) ||
              (cumulativeSky && absorbedSolarEnergy)) && (
              <Row>
                <Col>
                  <InputDropdown
                    controlId="multiband"
                    formLabel="Multiband"
                    onChange={(e) => dispatch(setStateValue(constants.MULTIBAND, e.target.value))}
                    dropdownList={multibands}
                    value={multiband}
                    disabled={false}
                  ></InputDropdown>
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
      </Form>
    </>
  );
  
}
