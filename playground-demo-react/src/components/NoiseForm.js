import { useMediaQuery } from "react-responsive";

import { Form, Col, Row, Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import InputWithButtons from "./InputWithButtons";
import InputDropdown from "./InputDropdown";

import { incrementHandler, decrementHandler, checkNumericInput, formatNumber } from "./Utils";
import { setStateValue, sendNoiseFileUploadAction, setNoiseFormValidated } from "../Actions/noise";

import * as constants from "../constants";
import { 
  NOISE_RECEIVER_GRID_VAL_MIN,
  NOISE_RECEIVER_GRID_VAL_CUT_MAX,
  NOISE_RECEIVER_GRID_VAL_FACADE_MAX,
  NOISE_MESH_RESOLUTION_MIN,
  NOISE_MESH_RESOLUTION_MAX,
  NOISE_HEAVY_VEHICLE_MIN,
  NOISE_HEAVY_VEHICLE_MAX,
  NOISE_MATERIAL_ABSORPTION_MIN,
  NOISE_MATERIAL_ABSORPTION_MAX,
  NOISE_FILE_RECEIVER,
  NOISE_FILE_ROAD
} from "../constants";

import { ADD_FILE, CLEARED_FILE, REMOVE_FILE } from "../constants";
export default function NoiseForm() {
  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
const isDesktop = useMediaQuery({ query: '(min-width: 1224px)'})

  const receiverPoints = useSelector((state) => state.noise.receiverPoints.value);
  const receiverGrid = useSelector((state) => state.noise.receiverGrid.value);
  const receiverGridVal = useSelector((state) => state.noise.receiverGridVal.value);
  const meshResolution = useSelector((state) => state.noise.meshResolution.value);
  const noiseCategory = useSelector((state) => state.noise.noiseCategory.value);
  const roadFiles = useSelector((state) => state.noise.roadFiles.value);
  const roadCategory = useSelector((state) => state.noise.roadCategory.value);
  const inputType = useSelector((state) => state.noise.inputType.value);
  const inputTypeVal = useSelector((state) => state.noise.inputTypeVal.value);
  const noOfVehicles = useSelector((state) => state.noise.noOfVehicles.value);
  const vehicleSpeed = useSelector((state) => state.noise.vehicleSpeed.value);
  const heavyVehicles = useSelector((state) => state.noise.heavyVehicles.value);
  const materialAbsorption = useSelector((state) => state.noise.materialAbsorption.value);
  const projectToken = useSelector((state) => state.project.projectToken)
  const submitFormFlag = useSelector((state) => state.forms.submitFormFlag);
  const [fileUploadServer, setFileUploadServer] = useState([])
  const [fileUploadServerReceiver, setFileUploadServerReceiver] = useState([])
  const [fileUploadServerRoad, setFileUploadServerRoad] = useState([])
  const [actionFlag, setActionFlag] = useState()
  const [fileToRemove, setFileToRemove] = useState({})
  const projectType = useSelector(state => state.forms.projectType)

  const input = useSelector(state => state.noise)
  // dropdown options
  const receiverGrids = ["Cut-Plane", "Facade"];
  const noiseCategories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];

  const roadCategories = {
    "Category 1": 77.2,
    "Category 2": 71.0,
    "Category 3": 70.2,
    "Category 4": 68.3,
    "Category 5": 65.6,
  };

  const inputTypes = ["Default", "Traffic", "User-Defined"];

  // updating list of files uploaded for displaying
  const fileUploadHandler = (e, acceptedExt) => {
    const uploadedFiles = [];

    console.log(e)
    var fileData = e.target.files[0]
    // For StlContainer to find the file to preview on local disk
    // To send the file to the server
    setFileUploadServer(fileUploadServer => ([...fileUploadServer, fileData]))
    // The file dictionary is to keep track of which fileURL belongs to which file data

    switch (e.target.id) {
      case constants.RECEIVER_POINTS:
        console.log("Setting new receiver")
        setFileUploadServerReceiver(fileUploadServerReceiver => ([...fileUploadServerReceiver, fileData]))
        break;
      case constants.ROAD_FILES:
        console.log("Setting new road")
        setFileUploadServerRoad(fileUploadServerRoad => ([...fileUploadServerRoad, fileData]))
        break;
      default:
        break;
    }

    setActionFlag(ADD_FILE)
    e.target.value = ""
  };

  const handleFileRemove = ( e, data, index) => {
    setFileToRemove({
        data: data,
        index: index
    })}


    useEffect(() => {

    const update = async () => {
      console.log("Updating the noise files")
      console.log(fileUploadServerReceiver)
      dispatch(setStateValue(constants.RECEIVER_POINTS, fileUploadServerReceiver));
      // dispatch(setStateValue(constants.ROAD_FILES, fileUploadServerRoad));
    }
    update()
  }, [dispatch, fileUploadServerReceiver, fileUploadServerRoad]);

  useEffect(() => {

    const remove = async () => {
        // dispatch(setFileUploadAction({fileUpload}))
        // dispatch(undoFileUploadAction(fileToRemove.data))
        // setFileToRemove({})
    }

    const add = async () => {
        // dispatch(setFileUploadAction(fileUpload))
        dispatch(sendNoiseFileUploadAction(fileUploadServer, projectToken))
    }
    if (actionFlag === ADD_FILE){
        add()
    }
    else if (actionFlag === REMOVE_FILE){
        remove()
    }
    setActionFlag(CLEARED_FILE)
  }, [actionFlag]);

  // calculate and update input noise
  useEffect(() => {
    if (noOfVehicles && vehicleSpeed && heavyVehicles) {
      const n = parseFloat(noOfVehicles, 10);
      const s = parseFloat(vehicleSpeed, 10);
      const p = parseFloat(heavyVehicles, 10);

      const a = 29.1 + 10 * Math.log10(n);
      const b = 33 * Math.log10(s + 40 + 500 / s) + 10 * Math.log10(1 + 5 * (p / s)) - 68.8;
      const c = s > 75 ? 0 : -1;

      const resultingNoise = a + b + c;

      if (!isNaN(resultingNoise) && isFinite(resultingNoise)) {
        dispatch(setStateValue(constants.INPUT_TYPE_VAL, resultingNoise.toFixed(2)));
      }
    } else {
      if (inputType !== "Default") {
        dispatch(setStateValue(constants.INPUT_TYPE_VAL, ""));
      }
    }
  }, [noOfVehicles, vehicleSpeed, heavyVehicles]);

  useEffect(() =>{

    const selfValidateForm = () =>{
      if ( !fileUploadServerReceiver ||
          ( receiverGridVal == "" || 
            ( receiverGridVal < NOISE_RECEIVER_GRID_VAL_MIN) ||
            ( receiverGridVal > NOISE_RECEIVER_GRID_VAL_CUT_MAX && receiverGrid === "Cut-Plane") ||
            ( receiverGridVal > NOISE_RECEIVER_GRID_VAL_FACADE_MAX && receiverGrid !== "Cut-Plane")) ||
          ( meshResolution == "" || meshResolution < NOISE_MESH_RESOLUTION_MIN || meshResolution > NOISE_MESH_RESOLUTION_MAX) ||
          ( inputTypeVal == "") || 
          ( materialAbsorption == "" || materialAbsorption< NOISE_MATERIAL_ABSORPTION_MIN || materialAbsorption> NOISE_MATERIAL_ABSORPTION_MAX) ||
          (
            ( inputTypeVal == constants.INPUT_TYPE_TRAFFIC ) &&
             ( noOfVehicles == "") || 
             ( vehicleSpeed == "") ||
             ( heavyVehicles == "" || heavyVehicles< NOISE_HEAVY_VEHICLE_MIN || heavyVehicles> NOISE_HEAVY_VEHICLE_MAX)
            )
        ){
            console.log("Noise form is not validated properly")
            dispatch( setNoiseFormValidated(false))
          }
          else{
            console.log("Noise form is validated properly")
            dispatch( setNoiseFormValidated(true))
          }
    }
    if (submitFormFlag && projectType.sendNoiseForm){
      selfValidateForm()
    }
  },[submitFormFlag])

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="receiverPoints">
              <Row>
                <Col sm={3}>
                  <Form.Label>Receiver Points</Form.Label>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <Form.Control
                        isInvalid = { (submitFormFlag && !fileUploadServerReceiver)  ? true : false}
                        type="file" 
                        onChange={(e) => fileUploadHandler(e, [], NOISE_FILE_RECEIVER)} 
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>File Name</th>
                            <th>File Size</th>
                            <th> Actions </th>
                            <th></th>
                          </tr>
                        </thead>

                        <tbody>
                          {fileUploadServerReceiver.map( (file, index) => {
                            return(
                              <tr key={`receiverPoints_${index}`}>
                                <td> {index+1} </td>
                                <td> {file.name} </td>
                                <td> {file.size} </td>
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
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <InputDropdown
              controlId="receiverGrid"
              formLabel="Receiver Grid"
              onChange={(e) => dispatch(setStateValue(constants.RECEIVER_GRID, e.target.value))}
              dropdownList={receiverGrids}
              value={receiverGrid}
              disabled={false}
            ></InputDropdown>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="receiverGridVal">
              <Form.Label>Mesh Offset (m)</Form.Label>

              <InputWithButtons
                noLabel={true}
                incBtnName="receiverGridValIncrement"
                decBtnName="receiverGridValDecrement"
                onIncBtnClick={() => {
                  receiverGrid === "Cut-Plane"
                    ? dispatch(
                        setStateValue(
                          constants.RECEIVER_GRID_VAL,
                          incrementHandler(receiverGridVal, 0.15, 75, 0.1)
                        )
                      )
                    : dispatch(
                        setStateValue(constants.RECEIVER_GRID_VAL, incrementHandler(receiverGridVal, 0.15, 2, 0.1))
                      );
                }}
                onDecBtnClick={() => {
                  dispatch(
                    setStateValue(constants.RECEIVER_GRID_VAL, decrementHandler(receiverGridVal, 0.15, 0.1))
                  );
                }}
                subDisabled={receiverGridVal == 0.15 ? true : false}
                addDisabled={
                  (receiverGridVal == 75 && receiverGrid === "Cut-Plane") || receiverGridVal == 2 ? true : false
                }
                placeholder={receiverGrid === "Cut-Plane" ? "0.15 – 75.0" : "0.15 – 2.0"}
                min="0.15"
                max={receiverGrid === "Cut-Plane" ? "75.0" : "2.0"}
                step="0.1"
                value={receiverGridVal}
                isInvalid = { (receiverGridVal == "" || 
                  (receiverGridVal < NOISE_RECEIVER_GRID_VAL_MIN) ||
                  (receiverGridVal > NOISE_RECEIVER_GRID_VAL_CUT_MAX && receiverGrid === "Cut-Plane") ||
                  (receiverGridVal > NOISE_RECEIVER_GRID_VAL_FACADE_MAX && receiverGrid !== "Cut-Plane")) && 
                  submitFormFlag
                }
                onChange={(e) => {
                  dispatch(setStateValue(constants.RECEIVER_GRID_VAL, e.target.value));
                }}
                onBlur={(e) => {
                  receiverGrid === "Cut-Plane"
                    ? dispatch(
                        setStateValue(constants.RECEIVER_GRID_VAL, checkNumericInput(e.target.value, 0.15, 75))
                      )
                    : dispatch(
                        setStateValue(constants.RECEIVER_GRID_VAL, checkNumericInput(e.target.value, 0.15, 2))
                      );
                }}
              ></InputWithButtons>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <InputWithButtons
              controlId="noiseMeshResolution"
              formLabel="Mesh Resolution"
              incBtnName="meshResolutionIncrement"
              decBtnName="meshResolutionDecrement"
              onIncBtnClick={() => {
                dispatch(setStateValue(constants.MESH_RESOLUTION, incrementHandler(meshResolution, 1, 10, 0.1)));
              }}
              onDecBtnClick={() => {
                dispatch(setStateValue(constants.MESH_RESOLUTION, decrementHandler(meshResolution, 1, 0.1)));
              }}
              subDisabled={meshResolution == NOISE_MESH_RESOLUTION_MIN ? true : false}
              addDisabled={meshResolution == NOISE_MESH_RESOLUTION_MAX ? true : false}
              placeholder="1.0 - 10.0"
              min="1"
              max="10"
              step="0.1"
              value={meshResolution}
              isInvalid = { (meshResolution == "" || meshResolution < NOISE_MESH_RESOLUTION_MIN || meshResolution > NOISE_MESH_RESOLUTION_MAX)&& submitFormFlag}
              onChange={(e) => {
                dispatch(setStateValue(constants.MESH_RESOLUTION, e.target.value));
              }}
              onBlur={(e) =>
                dispatch(setStateValue(constants.MESH_RESOLUTION, checkNumericInput(e.target.value, 1, 10)))
              }
              sm="3"
            ></InputWithButtons>
          </Col>
        </Row>

        <Row>
          <Col>
            <InputDropdown
              controlId="noiseCategory"
              formLabel="Noise Category"
              onChange={(e) => dispatch(setStateValue(constants.NOISE_CATEGORY, e.target.value))}
              dropdownList={noiseCategories}
              value={noiseCategory}
              disabled={false}
            ></InputDropdown>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="roadFiles">
              <Row>
                <Col sm={3}>
                  <Form.Label>Road Files</Form.Label>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <Form.Control
                        type="file"
                        multiple
                        onChange={(e) => fileUploadHandler(e, [".obj", ".shp", ".stl"])}
                        accept=".obj,.shp"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>File Name</th>
                            <th>File Size</th>
                            <th> Actions </th>
                            <th></th>
                          </tr>
                        </thead>

                        <tbody>
                          {fileUploadServerRoad.map( (file, index) => {
                            return(
                              <tr key={`receiverPoints_${index}`}>
                                <td> {index+1} </td>
                                <td> {file.name} </td>
                                <td> {file.size} </td>
                                <td>
                                  <button 
                                      className="deleteButton"
                                      id="customDeleteButton"
                                      onClick = { (e) => handleFileRemove( e, file, index)}
                                      ><i 
                                      id={index}
                                      className="deleteButtonIcon">
                                      Delete 
                                      </i> 
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <InputDropdown
              controlId="roadCategory"
              formLabel="Road Category"
              onChange={(e) => {
                if (inputType === "Default") {
                  const inputValue = roadCategories[e.target.value];
                  dispatch(setStateValue(constants.INPUT_TYPE_VAL, inputValue.toFixed(1)));
                }
                dispatch(setStateValue(constants.ROAD_CATEGORY, e.target.value));
              }}
              dropdownList={roadCategories}
              dictionary={true}
              value={roadCategory}
              disabled={false}
            ></InputDropdown>
          </Col>
        </Row>

        <Row>
          <Col>
            <InputDropdown
              controlId="inputType"
              formLabel="Input Type"
              onChange={(e) => {
                if (e.target.value === "Default") {
                  const inputValue = roadCategories[roadCategory];
                  dispatch(setStateValue(constants.INPUT_TYPE_VAL, inputValue.toFixed(1)));
                }

                dispatch(setStateValue(constants.INPUT_TYPE, e.target.value));
              }}
              dropdownList={inputTypes}
              value={inputType}
              disabled={false}
            ></InputDropdown>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="inputTypeVal">
              <Form.Label>Input Value (dB)</Form.Label>

              <InputWithButtons
                noLabel={true}
                incBtnName="inputTypeValIncrement"
                decBtnName="inputTypeValDecrement"
                onIncBtnClick={() => {
                  dispatch(
                    setStateValue(
                      constants.INPUT_TYPE_VAL,
                      formatNumber(parseFloat(isNaN(inputTypeVal) ? 0.1 : +inputTypeVal + 0.1, 10))
                    )
                  );
                }}
                onDecBtnClick={() => {
                  dispatch(
                    setStateValue(
                      constants.INPUT_TYPE_VAL,
                      formatNumber(parseFloat(isNaN(inputTypeVal) ? 0.1 : +inputTypeVal - 0.1, 10))
                    )
                  );
                }}
                value={inputTypeVal}
                isInvalid = { (inputTypeVal == "") && submitFormFlag}
                disabled={inputType === "User-Defined" ? false : true}
                onChange={(e) => {
                  dispatch(setStateValue(constants.INPUT_TYPE_VAL, e.target.value));
                }}
                onBlur={(e) => {
                  const value = Object.keys(roadCategories).find((key) => roadCategories[key] === +e.target.value);

                  if (value && e.target.value) {
                    dispatch(setStateValue(constants.ROAD_CATEGORY, value));
                    dispatch(setStateValue(constants.INPUT_TYPE, "Default"));
                  }

                  if (!e.target.value) {
                    dispatch(setStateValue(constants.INPUT_TYPE_VAL, ""));
                  } else {
                    dispatch(
                      setStateValue(constants.INPUT_TYPE_VAL, formatNumber(parseFloat(e.target.value, 10)))
                    );
                  }
                }}
              ></InputWithButtons>
            </Form.Group>
          </Col>
        </Row>

        {inputType === constants.INPUT_TYPE_TRAFFIC && (
          <>
            <Row>
              <Col>
                <InputWithButtons
                  controlId="noOfVehicles"
                  formLabel="No. of Vehicles"
                  incBtnName="noOfVehiclesIncrement"
                  decBtnName="noOfVehiclesDecrement"
                  onIncBtnClick={() => {
                    dispatch(
                      setStateValue(
                        constants.NO_OF_VEHICLES,
                        formatNumber(parseFloat(isNaN(noOfVehicles) ? 1 : +noOfVehicles + 1, 10))
                      )
                    );
                  }}
                  onDecBtnClick={() => {
                    let newValue = +noOfVehicles - 1;

                    if (newValue < 1) {
                      newValue = 1;
                    }

                    dispatch(setStateValue(constants.NO_OF_VEHICLES, formatNumber(parseFloat(newValue, 10))));
                  }}
                  subDisabled={noOfVehicles == 1 ? true : false}
                  value={noOfVehicles}
                  isInvalid = { (noOfVehicles == "") && submitFormFlag}
                  onChange={(e) => {
                    dispatch(setStateValue(constants.NO_OF_VEHICLES, e.target.value));
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      dispatch(setStateValue(constants.NO_OF_VEHICLES, ""));
                    } else {
                      const toWholeNumber = parseFloat(e.target.value, 10).toFixed(0);
                      let newValue = parseFloat(toWholeNumber, 10).toFixed(1);

                      if (+e.target.value === 0) {
                        newValue = formatNumber(parseFloat(1, 10));
                      }

                      dispatch(setStateValue(constants.NO_OF_VEHICLES, newValue));
                    }
                  }}
                  sm="3"
                ></InputWithButtons>
              </Col>
            </Row>

            <Row>
              <Col>
                <InputWithButtons
                  controlId="vehicleSpeed"
                  formLabel="Vehicle Speed (km/h)"
                  incBtnName="vehicleSpeedIncrement"
                  decBtnName="vehicleSpeedDecrement"
                  onIncBtnClick={() => {
                    dispatch(
                      setStateValue(
                        constants.VEHICLE_SPEED,
                        formatNumber(parseFloat(isNaN(vehicleSpeed) ? 1 : +vehicleSpeed + 0.1, 10))
                      )
                    );
                  }}
                  onDecBtnClick={() => {
                    let newValue = +vehicleSpeed - 0.1;

                    if (newValue <= 0) {
                      newValue = 0.1;
                    }

                    dispatch(setStateValue(constants.VEHICLE_SPEED, formatNumber(parseFloat(newValue, 10))));
                  }}
                  subDisabled={vehicleSpeed == 0.1 ? true : false}
                  value={vehicleSpeed}
                  isInvalid = { (vehicleSpeed == "") && submitFormFlag}
                  onChange={(e) => {
                    dispatch(setStateValue(constants.VEHICLE_SPEED, e.target.value));
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      dispatch(setStateValue(constants.VEHICLE_SPEED, ""));
                    } else {
                      let newValue = formatNumber(parseFloat(e.target.value, 10));

                      if (+e.target.value === 0) {
                        newValue = formatNumber(parseFloat(0.1, 10));
                      }

                      dispatch(setStateValue(constants.VEHICLE_SPEED, newValue));
                    }
                  }}
                  sm="3"
                ></InputWithButtons>
              </Col>
            </Row>

            <Row>
              <Col>
                <InputWithButtons
                  controlId="heavyVehicles"
                  formLabel="Heavy Vehicles (%)"
                  incBtnName="heavyVehiclesIncrement"
                  decBtnName="heavyVehiclesDecrement"
                  onIncBtnClick={() => {
                    dispatch(
                      setStateValue(constants.HEAVY_VEHICLES, incrementHandler(heavyVehicles, 0, 100, 0.1))
                    );
                  }}
                  onDecBtnClick={() => {
                    dispatch(setStateValue(constants.HEAVY_VEHICLES, decrementHandler(heavyVehicles, 0, 0.1)));
                  }}
                  subDisabled={heavyVehicles == NOISE_HEAVY_VEHICLE_MIN && heavyVehicles ? true : false}
                  addDisabled={heavyVehicles == NOISE_HEAVY_VEHICLE_MAX ? true : false}
                  placeholder="0.0 - 100.0"
                  min="0"
                  max="100"
                  step="0.1"
                  value={heavyVehicles}
                  isInvalid={( heavyVehicles == "" || heavyVehicles< NOISE_HEAVY_VEHICLE_MIN || heavyVehicles> NOISE_HEAVY_VEHICLE_MAX) && submitFormFlag}
                  onChange={(e) => {
                    dispatch(setStateValue(constants.HEAVY_VEHICLES, e.target.value));
                  }}
                  onBlur={(e) => {
                    dispatch(setStateValue(constants.HEAVY_VEHICLES, checkNumericInput(e.target.value, 0, 100)));
                  }}
                  sm="3"
                ></InputWithButtons>
              </Col>
            </Row>
          </>
        )}

        <Row>
          <Col>
            <InputWithButtons
              controlId="materialAbsorption"
              formLabel="Material Absorption"
              incBtnName="materialAbsorptionIncrement"
              decBtnName="materialAbsorptionDecrement"
              onIncBtnClick={() => {
                dispatch(
                  setStateValue(constants.MATERIAL_ABSORPTION, incrementHandler(materialAbsorption, 0, 1, 0.1))
                );
              }}
              onDecBtnClick={() => {
                dispatch(
                  setStateValue(constants.MATERIAL_ABSORPTION, decrementHandler(materialAbsorption, 0, 0.1))
                );
              }}
              subDisabled={materialAbsorption == 0 && materialAbsorption ? true : false}
              addDisabled={materialAbsorption == 1 ? true : false}
              placeholder="0.0 - 1.0"
              min="0"
              max="1"
              step="0.1"
              value={materialAbsorption}
              isInvalid={( materialAbsorption == "" || materialAbsorption< NOISE_MATERIAL_ABSORPTION_MIN || materialAbsorption> NOISE_MATERIAL_ABSORPTION_MAX) && submitFormFlag}
              onChange={(e) => {
                dispatch(setStateValue(constants.MATERIAL_ABSORPTION, e.target.value));
              }}
              onBlur={(e) =>
                dispatch(setStateValue(constants.MATERIAL_ABSORPTION, checkNumericInput(e.target.value, 0, 1)))
              }
              sm="3"
            ></InputWithButtons>
          </Col>
        </Row>
      </Container>
    </>
  );
}
