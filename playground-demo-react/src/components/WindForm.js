import { Form, Col, Row, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useMediaQuery } from "react-responsive";

import InputWithButtons from "./InputWithButtons";
import InputDropdown from "./InputDropdown";
import FormCheck from "./FormCheck";

import { incrementHandler, decrementHandler, checkNumericInput } from "./Utils";
import { setStateValue, setTotalFields, setTotalFieldsCompleted, setStateProgress, setWindFormValidated } from "../Actions/wind";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subDays from "date-fns/subDays";

import * as constants from "../constants";
import { 
  WIND_SPEED_MIN, 
  WIND_SPEED_MAX, 
  REF_WIND_HEIGHT_MIN, 
  REF_WIND_HEIGHT_MAX,
  WIND_MESH_SPACING_X_MIN,
  WIND_MESH_SPACING_X_MAX,
  WIND_MESH_SPACING_Y_MIN,
  WIND_MESH_SPACING_Y_MAX,
  REF_WIND_TEMP_MIN,
  REF_WIND_TEMP_MAX,
  REF_WIND_TEMP_HEIGHT_MIN,
  REF_WIND_TEMP_HEIGHT_MAX
} from "../constants";
import { setSubmitFormFlag } from "../Actions/forms";

export default function WindForm() {
  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })

  const startDateTime = useSelector((state) => state.wind.startDateTime.value);
  const cloudCondition = useSelector((state) => state.wind.cloudCondition.value);
  const windSpeed = useSelector((state) => state.wind.windSpeed.value);
  const windDirection = useSelector((state) => state.wind.windDirection.value);
  const windDirectionVal = useSelector((state) => state.wind.windDirectionVal.value);
  const refWindHeight = useSelector((state) => state.wind.refWindHeight.value);
  const refTemp = useSelector((state) => state.wind.refTemp.value);
  const refTempHeight = useSelector((state) => state.wind.refTempHeight.value);
  const inflowSurfaceType = useSelector((state) => state.wind.inflowSurfaceType.value);
  const groundSurfaceType = useSelector((state) => state.wind.groundSurfaceType.value);
  const meshSpacingX = useSelector((state) => state.wind.meshSpacingX.value);
  const meshSpacingY = useSelector((state) => state.wind.meshSpacingY.value);
  const meshGenSlices = useSelector((state) => state.wind.meshGenSlices.value);
  const meshGenPlot = useSelector((state) => state.wind.meshGenPlot.value);

  const windTotalFieldsCompleted = useSelector((state) => state.wind.totalFieldsCompleted);
  const windTotalFields = useSelector((state) => state.wind.totalFields);

  const windActivated = useSelector((state) => state.wind.activated);
  const solarActivated = useSelector((state) => state.solar.activated);
  const noiseActivated = useSelector((state) => state.noise.activated);

  const refTempProg = useSelector((state) => state.wind.refTemp.progressCount);
  const refTempHeightProg = useSelector((state) => state.wind.refTempHeight.progressCount);

  const submitFormFlag = useSelector((state) => state.forms.submitFormFlag);
  const projectType = useSelector(state => state.forms.projectType)

  const input = useSelector(state => state.wind)

  // update progress bar for refTemp and refTempHeight fields on switching forms
  useEffect(() => {
    let count = 0;

    if (refTemp && refTempHeight) {
      count = 2;
    } else if (refTemp || refTempHeight) {
      count = 1;
    }

    // if only wind is selected
    if (!solarActivated && !noiseActivated && windActivated) {
      if (refTempProg && refTempHeightProg) {
        dispatch(setStateProgress(constants.REF_TEMP, false));
        dispatch(setStateProgress(constants.REF_TEMP_HEIGHT, false));
        dispatch(setTotalFields(windTotalFields - 2));
        dispatch(setTotalFieldsCompleted(windTotalFieldsCompleted - count));
      }

      // if selecting wind & solar or wind & noise
    } else if ((solarActivated || noiseActivated) && windActivated) {
      if (!refTempProg && !refTempHeightProg) {
        dispatch(setStateProgress(constants.REF_TEMP, true));
        dispatch(setStateProgress(constants.REF_TEMP_HEIGHT, true));
        dispatch(setTotalFields(windTotalFields + 2));
        dispatch(setTotalFieldsCompleted(windTotalFieldsCompleted + count));
      }
    }
  }, [solarActivated, noiseActivated]);

  // dropdown options
  const cloudConditions = ["Clear Sky", "Fully Cloudy", "Heavy", "Moderate", "Partial"];

  const windDirections = {
    N: 0.0,
    NNE: 22.5,
    NE: 45.0,
    NEE: 67.5,
    E: 90.0,
    SEE: 112.5,
    SE: 135.0,
    SSE: 157.5,
    S: 180.0,
    SSW: 202.5,
    SW: 225.0,
    SWW: 247.5,
    W: 270.0,
    NWW: 292.5,
    NW: 315.0,
    NNW: 337.5,
    "User-Defined": null,
  };

  const surfaceTypes = [
    "Beach",
    "Crops",
    "Farm/Hedges",
    "Forest",
    "Grass",
    "High-Rise",
    "Semi-Urban",
    "Urban",
    "Water Body",
  ];

  // radio button options
  const meshGenConfigs = {
    [constants.MESH_GEN_SLICES_LABEL]: meshGenSlices,
    [constants.MESH_GEN_PLOT_LABEL]: meshGenPlot,
  };


  const meshGenType = {
    meshGenSlices,
    meshGenPlot
  }
  const checkMeshGenType = () =>{
    let values = Object.values(meshGenType);
    for (let index = 0; index < values.length; index++)
    {
        if (values[index]===true){
          console.log("returning true")
          return true;
        }
    }
    return false
  }

  // Mesh Generation Configuration checkbox handler
  const checkBoxHandler = (e) => {
    const parentElement = e.target.parentNode;
    const labelElement = parentElement.childNodes[1];
    const label = labelElement.firstChild.nodeValue;

    switch (label) {
      case constants.MESH_GEN_SLICES_LABEL:
        dispatch(setStateValue(constants.MESH_GEN_SLICES, !meshGenSlices));
        break;
      case constants.MESH_GEN_PLOT_LABEL:
        dispatch(setStateValue(constants.MESH_GEN_PLOT, !meshGenPlot));
        break;
    }
  };

  // check input and set corresponding wind direction
  const setWindDirection = (val, min, max) => {
    const direction = Object.keys(windDirections).find((key) => windDirections[key] === +val);

    if (direction && val) {
      dispatch(setStateValue(constants.WIND_DIRECTION, direction));
      dispatch(setStateValue(constants.WIND_DIRECTION_VAL, checkNumericInput(val, min, max)));
    }
  };


  useEffect(() =>{

    const selfValidateForm = () =>{
      if ( !startDateTime || 
      ( windSpeed < WIND_SPEED_MIN || windSpeed > WIND_SPEED_MAX)  ||
      ( windDirectionVal == "") ||
      ( refWindHeight < REF_WIND_HEIGHT_MIN || refWindHeight > REF_WIND_HEIGHT_MAX) ||
      ( meshSpacingX == "" || meshSpacingX <  WIND_MESH_SPACING_X_MIN|| meshSpacingX > WIND_MESH_SPACING_X_MAX ) ||
      ( meshSpacingY == "" || meshSpacingY <  WIND_MESH_SPACING_Y_MIN|| meshSpacingY > WIND_MESH_SPACING_Y_MAX ) ||
      ( !checkMeshGenType() ) ||
      ( (noiseActivated || solarActivated ) && 
        (refTemp < REF_WIND_TEMP_MIN || refTemp > REF_WIND_TEMP_MAX) || 
        (refTempHeight < REF_WIND_TEMP_HEIGHT_MIN || refTempHeight > REF_WIND_TEMP_HEIGHT_MAX))
      ){
            console.log("Wind form is not validated properly")
            dispatch( setWindFormValidated(false))
          }
          else{
            console.log("Wind form is validated properly")
            dispatch( setWindFormValidated(true))
          }
    }
    if (submitFormFlag && projectType.sendWindForm){
      selfValidateForm()
    }
  },[submitFormFlag])

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="startDateTime">
              <Row className="align-items-center">
                <Col sm={4}>
                  <Form.Label>Start Date/Time</Form.Label>
                </Col>
                <Col sm={4}>
                  <DatePicker
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
                      }

                      dispatch(setStateValue(constants.START_DATE_TIME, date));
                    }}
                    dateFormat="d MMM yyyy, h:mm aa"
                    maxDate={subDays(new Date(), 2)}
                    showTimeSelect
                    isClearable
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>

        {(noiseActivated || solarActivated) && (
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="cloudCondition">
                <Row className="align-items-center">
                  <Col sm={4}>
                    <Form.Label>Cloud Condition</Form.Label>
                  </Col>
                  <Col sm={4}>
                    <InputDropdown
                      controlId="cloudCondition"
                      onChange={(e) => dispatch(setStateValue(constants.CLOUD_CONDITION, e.target.value))}
                      dropdownList={cloudConditions}
                      value={cloudCondition}
                      disabled={false}
                    ></InputDropdown>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
        )}

        <Row>
          <Col>
            <InputWithButtons
              controlId="windSpeed"
              formLabel="Wind Speed (m/s)"
              incBtnName="windSpeedIncrement"
              decBtnName="windSpeedDecrement"
              onIncBtnClick={() => {
                dispatch(setStateValue(constants.WIND_SPEED, incrementHandler(windSpeed, 1, 20, 0.1)));
              }}
              onDecBtnClick={() => {
                dispatch(setStateValue(constants.WIND_SPEED, decrementHandler(windSpeed, 1, 0.1)));
              }}
              subDisabled={windSpeed == 1 ? true : false}
              addDisabled={windSpeed == 20 ? true : false}
              placeholder="1.0 - 20.0"
              min="1"
              max="20"
              step="0.1"
              value={windSpeed}
              isInvalid = { (windSpeed < WIND_SPEED_MIN || windSpeed > WIND_SPEED_MAX) && submitFormFlag}
              onChange={(e) => {
                dispatch(setStateValue(constants.WIND_SPEED, e.target.value));
              }}
              onBlur={(e) =>
                dispatch(setStateValue(constants.WIND_SPEED, checkNumericInput(e.target.value, 1, 20)))
              }
              sm="4"
            ></InputWithButtons>
          </Col>
        </Row>

        <Row>
          <Col>
            <InputDropdown
              controlId="windDirection"
              formLabel="Wind Direction"
              onChange={(e) => {
                dispatch(setStateValue(constants.WIND_DIRECTION, e.target.value));

                const degree = windDirections[e.target.value];

                if (degree || e.target.value === "N") {
                  dispatch(setStateValue(constants.WIND_DIRECTION_VAL, degree.toFixed(1)));
                }
              }}
              dropdownList={windDirections}
              dictionary={true}
              value={windDirection}
              disabled={false}
            ></InputDropdown>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="windDirectionVal">
              <Form.Label>Value (°)</Form.Label>

              <InputWithButtons
                noLabel={true}
                incBtnName="windDirectionValIncrement"
                decBtnName="windDirectionValDecrement"
                onIncBtnClick={() => {
                  const newVal = incrementHandler(windDirectionVal, 0.1, 359.9, 0.1);
                  dispatch(setStateValue(constants.WIND_DIRECTION_VAL, newVal));
                  setWindDirection(newVal, 0, 359.9);
                }}
                onDecBtnClick={() => {
                  const newVal = decrementHandler(windDirectionVal, 0, 0.1);
                  dispatch(setStateValue(constants.WIND_DIRECTION_VAL, newVal));
                  setWindDirection(newVal, 0, 359.9);
                }}
                subDisabled={windDirectionVal == 0 && windDirectionVal ? true : false}
                addDisabled={windDirectionVal == 359.9 ? true : false}
                placeholder="0.0 - 359.9"
                min="0"
                max="359.9"
                step="0.1"
                value={windDirectionVal}
                disabled={windDirection === "User-Defined" ? false : true}
                isInvalid = { windDirectionVal == "" && submitFormFlag}
                onChange={(e) => dispatch(setStateValue(constants.WIND_DIRECTION_VAL, e.target.value))}
                onBlur={(e) => {
                  setWindDirection(e.target.value, 0, 359.9);
                  dispatch(
                    setStateValue(constants.WIND_DIRECTION_VAL, checkNumericInput(e.target.value, 0, 359.9))
                  );
                }}
              ></InputWithButtons>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <InputWithButtons
              controlId="refWindHeight"
              formLabel="Ref. Wind Height (m)"
              incBtnName="refWindHeightIncrement"
              decBtnName="refWindHeightDecrement"
              subDisabled={refWindHeight == REF_WIND_HEIGHT_MIN ? true : false}
              addDisabled={refWindHeight == REF_WIND_HEIGHT_MAX ? true : false}
              placeholder="2.0 - 500.0"
              min="2"
              max="500"
              step="0.1"
              value={refWindHeight}
              isInvalid = { (refWindHeight < REF_WIND_HEIGHT_MIN || refWindHeight > REF_WIND_HEIGHT_MAX) && submitFormFlag}
              onChange={(e) => dispatch(setStateValue(constants.REF_WIND_HEIGHT, e.target.value))}
              onBlur={(e) =>dispatch(setStateValue(constants.REF_WIND_HEIGHT, checkNumericInput(e.target.value, 2, 500)))}
              onIncBtnClick={() =>dispatch(setStateValue(constants.REF_WIND_HEIGHT, incrementHandler(refWindHeight, 2, 500, 0.1)))}
              onDecBtnClick={() =>dispatch(setStateValue(constants.REF_WIND_HEIGHT, decrementHandler(refWindHeight, 2, 0.1)))}
              sm="4"
            ></InputWithButtons>
          </Col>
        </Row>

        {(noiseActivated || solarActivated) && (
          <>
            <Row>
              <Col>
                <InputWithButtons
                  controlId="refTemp"
                  formLabel="Ref. Temperature (°C)"
                  incBtnName="refTempIncrement"
                  decBtnName="refTempDecrement"
                  subDisabled={refTemp == REF_WIND_TEMP_MIN ? true : false}
                  addDisabled={refTemp == REF_WIND_TEMP_MAX? true : false}
                  placeholder="10.0 - 40.0"
                  min="10"
                  max="40"
                  step="0.1"
                  value={refTemp}
                  isInvalid = { (refTemp < REF_WIND_TEMP_MIN || refTemp > REF_WIND_TEMP_MAX) && submitFormFlag}
                  onChange={(e) => dispatch(setStateValue(constants.REF_TEMP, e.target.value))}
                  onBlur={(e) =>dispatch(setStateValue(constants.REF_TEMP, checkNumericInput(e.target.value, 10, 40)))}
                  onIncBtnClick={() =>dispatch(setStateValue(constants.REF_TEMP, incrementHandler(refTemp, 10, 40, 0.1)))}
                  onDecBtnClick={() =>dispatch(setStateValue(constants.REF_TEMP, decrementHandler(refTemp, 10, 0.1)))}
                  sm="4"
                ></InputWithButtons>
              </Col>
            </Row>

            <Row>
              <Col>
                <InputWithButtons
                  controlId="refTempHeight"
                  formLabel={
                    <>
                      Ref. Temperature <br></br> Height (m)
                    </>
                  }
                  incBtnName="refTempHeightIncrement"
                  decBtnName="refTempHeightDecrement"

                  subDisabled={refTempHeight == REF_WIND_TEMP_HEIGHT_MIN ? true : false}
                  addDisabled={refTempHeight == REF_WIND_TEMP_HEIGHT_MAX ? true : false}
                  placeholder="2.0 - 500.0"
                  min="2"
                  max="500"
                  step="0.1"
                  value={refTempHeight}
                  isInvalid = { (refTempHeight < REF_WIND_TEMP_HEIGHT_MIN || refTempHeight > REF_WIND_TEMP_HEIGHT_MAX) && submitFormFlag}
                  onChange={(e) => dispatch(setStateValue(constants.REF_TEMP_HEIGHT, e.target.value))}
                  onBlur={(e) =>dispatch(setStateValue(constants.REF_TEMP_HEIGHT, checkNumericInput(e.target.value, 2, 500)))}
                  onIncBtnClick={() =>dispatch(setStateValue(constants.REF_TEMP_HEIGHT, incrementHandler(refTempHeight, 2, 500, 0.1)))}
                  onDecBtnClick={() =>dispatch(setStateValue(constants.REF_TEMP_HEIGHT, decrementHandler(refTempHeight, 2, 0.1)))}
                  sm="4"
                ></InputWithButtons>
              </Col>
            </Row>
          </>
        )}

        <Row>
          <Col>
            <InputDropdown
              controlId="inflowSurfaceType"
              formLabel="Inflow Surface Type"
              onChange={(e) => dispatch(setStateValue(constants.INFLOW_SURFACE_TYPE, e.target.value))}
              dropdownList={surfaceTypes}
              value={inflowSurfaceType}
              disabled={false}
            ></InputDropdown>
          </Col>
          <Col>
            <InputDropdown
              controlId="groundSurfaceType"
              formLabel="Ground Surface Type"
              onChange={(e) => dispatch(setStateValue(constants.GROUND_SURFACE_TYPE, e.target.value))}
              dropdownList={surfaceTypes}
              value={groundSurfaceType}
              disabled={false}
            ></InputDropdown>
          </Col>
        </Row>

        <Row>
          <Col>
            <InputWithButtons
              controlId="meshSpacingX"
              formLabel="Mesh Spacing X (m)"
              incBtnName="meshXIncrement"
              decBtnName="meshXDecrement"
              subDisabled={meshSpacingX == WIND_MESH_SPACING_X_MIN ? true : false}
              addDisabled={meshSpacingX == WIND_MESH_SPACING_X_MAX ? true : false}
              placeholder="1.0 - 50.0"
              min="1"
              max="50"
              step="0.1"
              value={meshSpacingX}
              isInvalid = { (meshSpacingX == "" || meshSpacingX <  WIND_MESH_SPACING_X_MIN|| meshSpacingX > WIND_MESH_SPACING_X_MAX) && submitFormFlag}
              onChange={(e) => dispatch(setStateValue(constants.MESH_SPACING_X, e.target.value))}
              onBlur={(e) =>dispatch(setStateValue(constants.MESH_SPACING_X, checkNumericInput(e.target.value, 1, 50)))}
              onIncBtnClick={() =>dispatch(setStateValue(constants.MESH_SPACING_X, incrementHandler(meshSpacingX, 1, 50, 0.1)))}
              onDecBtnClick={() =>dispatch(setStateValue(constants.MESH_SPACING_X, decrementHandler(meshSpacingX, 1, 0.1)))}
            ></InputWithButtons>
          </Col>
          <Col>
            <InputWithButtons
              controlId="meshSpacingY"
              formLabel="Mesh Spacing Y (m)"
              incBtnName="meshYIncrement"
              decBtnName="meshYDecrement"
              subDisabled={meshSpacingY == WIND_MESH_SPACING_Y_MIN ? true : false}
              addDisabled={meshSpacingY == WIND_MESH_SPACING_Y_MAX ? true : false}
              placeholder="1.0 - 50.0"
              min="1"
              max="50"
              step="0.1"
              value={meshSpacingY}
              isInvalid = { (meshSpacingY == "" || meshSpacingY <  WIND_MESH_SPACING_Y_MIN|| meshSpacingY > WIND_MESH_SPACING_Y_MAX) && submitFormFlag}
              onChange={(e) => dispatch(setStateValue(constants.MESH_SPACING_Y, e.target.value))}
              onBlur={(e) =>dispatch(setStateValue(constants.MESH_SPACING_Y, checkNumericInput(e.target.value, 1, 50)))}
              onIncBtnClick={() =>dispatch(setStateValue(constants.MESH_SPACING_Y, incrementHandler(meshSpacingY, 1, 50, 0.1)))}
              onDecBtnClick={() =>dispatch(setStateValue(constants.MESH_SPACING_Y, decrementHandler(meshSpacingY, 1, 0.1)))}
            ></InputWithButtons>
          </Col>
        </Row>

        <Row>
          <Col>
            <div>
              <Form.Label>Mesh Generation Configuration</Form.Label>
            </div>
            <Form.Group className="mb-3">
              <FormCheck
                inline={true}
                list={meshGenConfigs}
                name="meshGenerationConfig"
                type="checkbox"
                isInvalid = { !checkMeshGenType() && submitFormFlag}
                onChange={(e) => checkBoxHandler(e)}
              ></FormCheck>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </>
  );
}
