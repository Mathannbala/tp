import { createSlice } from "@reduxjs/toolkit";
import { INPUT_TYPE, RECEIVER_GRID } from "../constants";

const receiverGridInitVal = "Cut-Plane";
const noiseRoadInitVal = "Category 1";
const inputTypeInitVal = "Default";
const inputTypeValInitVal = "77.2";

const initialNoiseState = {
  receiverPoints: { value: [], progressCount: true },
  receiverGrid: { value: receiverGridInitVal, progressCount: false },
  receiverGridVal: { value: "", progressCount: true },
  meshResolution: { value: "", progressCount: true },
  noiseCategory: { value: noiseRoadInitVal, progressCount: false },
  roadFiles: { value: [], progressCount: true },
  roadCategory: { value: noiseRoadInitVal, progressCount: false },
  inputType: { value: inputTypeInitVal, progressCount: false },
  inputTypeVal: { value: inputTypeValInitVal, progressCount: false },
  noOfVehicles: { value: "", progressCount: false },
  vehicleSpeed: { value: "", progressCount: false },
  heavyVehicles: { value: "", progressCount: false },
  materialAbsorption: { value: "", progressCount: true },
  totalFieldsCompleted: 0,
  totalFields: 0,
  activated: false,
  noiseFormValidated: false,
};

const noiseSlice = createSlice({
  name: "noise",
  initialState: initialNoiseState,
  reducers: {
    setStateValue(state, action) {
      const key = action.payload.key;
      const updatedVal = action.payload.updatedVal;
      const prevVal = state[key]["value"];
      console.log(key)
      console.log(updatedVal)
      state[key]["value"] = updatedVal;

      // if state to update is to be included in progress count (true)
      if (state[key]["progressCount"]) {
        // if updating field from empty to non-empty
        // length checks for empty arrays - list of files
        if ((updatedVal && !prevVal) || (updatedVal.length > 0 && prevVal.length === 0)) {
          state.totalFieldsCompleted += 1;

          // if updating field from non-empty to empty
        } else if ((!updatedVal && prevVal) || (updatedVal.length === 0 && prevVal.length > 0)) {
          state.totalFieldsCompleted -= 1;
        }
      }

      if (key === RECEIVER_GRID) {
        state.receiverGridVal.value = "";
      }

      const trafficInputType = "Traffic";
      const userDefinedInputType = "User-Defined";

      // if updating input type field
      if (key === INPUT_TYPE) {
        // if selecting traffic
        if (updatedVal === trafficInputType) {
          state.totalFields += 3;
          state.noOfVehicles.progressCount = true;
          state.vehicleSpeed.progressCount = true;
          state.heavyVehicles.progressCount = true;
        }

        if (prevVal === trafficInputType) {
          state.totalFields -= 3;
          state.noOfVehicles.progressCount = false;
          state.vehicleSpeed.progressCount = false;
          state.heavyVehicles.progressCount = false;

          if (state.noOfVehicles.value) {
            state.totalFieldsCompleted -= 1;
            state.noOfVehicles.value = "";
          }

          if (state.vehicleSpeed.value) {
            state.totalFieldsCompleted -= 1;
            state.vehicleSpeed.value = "";
          }

          if (state.heavyVehicles.value) {
            state.totalFieldsCompleted -= 1;
            state.heavyVehicles.value = "";
          }
        }

        // if selecting user defined, enable input type value field
        if (updatedVal === userDefinedInputType) {
          state.totalFields += 1;
          state.inputTypeVal.progressCount = true;
        }

        // switching from user defined to other values
        if (prevVal === userDefinedInputType) {
          state.totalFields -= 1;
          state.inputTypeVal.progressCount = false;

          // if input type value already filled
          if (state.inputTypeVal.value) {
            state.totalFieldsCompleted -= 1;
          }
        }

        // if selecting user defined / traffic, reset input value
        if (updatedVal === userDefinedInputType || updatedVal === trafficInputType) {
          state.inputTypeVal.value = "";
        }
      }
    },
    setTotalFields(state, action) {
      state.totalFields = action.payload;
    },
    setNoiseActivated(state, action) {
      state.activated = action.payload;
    },
    setNoiseFormValidated(state, action){
      state.noiseFormValidated = action.payload;
    }
  },
});

export const noiseActions = noiseSlice.actions;

export default noiseSlice.reducer;
