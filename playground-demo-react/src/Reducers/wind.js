import { createSlice } from "@reduxjs/toolkit";
import { WIND_DIRECTION, MESH_GEN_SLICES, MESH_GEN_PLOT } from "../constants";

const windDirectionInitVal = "N";
const windDirectionValInitVal = 0;
const inflowGroundInitVal = "Beach";
const cloudConditionInitVal = "Clear Sky";
const meshGenConfigs = [MESH_GEN_SLICES, MESH_GEN_PLOT];

const initialWindState = {
  startDateTime: { value: null, progressCount: true },
  cloudCondition: { value: cloudConditionInitVal, progressCount: false },
  windSpeed: { value: "", progressCount: true },
  windDirection: { value: windDirectionInitVal, progressCount: false },
  windDirectionVal: { value: windDirectionValInitVal.toFixed(1), progressCount: false },
  refWindHeight: { value: "", progressCount: true },
  refTemp: { value: "", progressCount: false },
  refTempHeight: { value: "", progressCount: false },
  inflowSurfaceType: { value: inflowGroundInitVal, progressCount: false },
  groundSurfaceType: { value: inflowGroundInitVal, progressCount: false },
  meshSpacingX: { value: "", progressCount: true },
  meshSpacingY: { value: "", progressCount: true },
  meshGenConfigs: { value: false, progressCount: true },
  meshGenSlices: { value: false, progressCount: false },
  meshGenPlot: { value: false, progressCount: false },
  totalFieldsCompleted: 0,
  totalFields: 0,
  activated: false,
  windFormValidated: false,
};

const windSlice = createSlice({
  name: "wind",
  initialState: initialWindState,
  reducers: {
    setStateValue(state, action) {
      const key = action.payload.key;
      const updatedVal = action.payload.updatedVal;
      const prevVal = state[key]["value"];
      state[key]["value"] = updatedVal;

      // if state to update is to be included in progress count (true)
      if (state[key]["progressCount"]) {
        // if updating field from empty to non-empty
        if (updatedVal && !prevVal) {
          state.totalFieldsCompleted += 1;

          // if updating field from non-empty to empty
        } else if (!updatedVal && prevVal) {
          state.totalFieldsCompleted -= 1;
        }
      }

      // if updating meshGenConfigs field
      if (meshGenConfigs.includes(key)) {
        // count no. of meshGenConfigs checked
        const checkedOutputTypes = Object.fromEntries(
          Object.entries(state).filter(([key, value]) => meshGenConfigs.includes(key) && value.value === true)
        );

        const countChecked = Object.keys(checkedOutputTypes).length;

        // if updating field from all unchecked to any fields checked
        if (countChecked > 0 && !state.meshGenConfigs.value) {
          state.totalFieldsCompleted += 1;
          state.meshGenConfigs.value = true;

          // if updating field from any fields checked to all unchecked
        } else if (countChecked === 0 && state.meshGenConfigs.value) {
          state.totalFieldsCompleted -= 1;
          state.meshGenConfigs.value = false;
        }
      }

      const selectedWindDirection = "User-Defined";

      // if updating wind direction field
      if (key === WIND_DIRECTION) {
        // "User-Defined" selected, enable wind direction value field
        if (updatedVal === selectedWindDirection) {
          state.totalFields += 1;
          state.windDirectionVal.progressCount = true;
          state.windDirectionVal.value = "";

          // switching from "User-Defined" to other values
        } else if (prevVal === selectedWindDirection && updatedVal !== selectedWindDirection) {
          state.totalFields -= 1;
          state.windDirectionVal.progressCount = false;

          // if wind direction value already filled
          if (state.windDirectionVal.value) {
            state.totalFieldsCompleted -= 1;
            state.windDirectionVal.value = "";
          }
        }
      }
    },
    setStateProgress(state, action) {
      const key = action.payload.key;
      const updatedVal = action.payload.updatedVal;
      state[key]["progressCount"] = updatedVal;
    },
    setTotalFields(state, action) {
      state.totalFields = action.payload;
    },
    setTotalFieldsCompleted(state, action) {
      state.totalFieldsCompleted = action.payload;
    },
    setWindActivated(state, action) {
      state.activated = action.payload;
    },
    setWindFormValidated(state, action){
      console.log(action)
      state.windFormValidated = action.payload
    }
  },
});

export const windActions = windSlice.actions;

export default windSlice.reducer;
