import { createSlice } from "@reduxjs/toolkit";
import {
  MULTI_HOURLY_SIM,
  SOLAR_IRRADIATION,
  ABSORBED_SOLAR_ENERGY,
  SOLAR_SHADING,
  DAYLIGHT_ILLUMINANCE,
  SOLAR_IRRADIANCE,
  ABSORBED_HEAT_FLUX,
  SKY_VIEW_FACTOR,
  POINT_IN_TIME,
  CUMULATIVE_SKY,
} from "../constants";

const reflectionInitVal = "2";
const samplingRayInitVal = "1024";
const sunInclusionInitVal = "With Sun";
const multibandInitVal = "Total";

const outputTypes = [
  SOLAR_IRRADIATION,
  ABSORBED_SOLAR_ENERGY,
  SOLAR_SHADING,
  DAYLIGHT_ILLUMINANCE,
  SOLAR_IRRADIANCE,
  ABSORBED_HEAT_FLUX,
  SKY_VIEW_FACTOR,
];

const initialSolarState = {
  meshResolution: { value: "", progressCount: true },
  showAdvancedOptions: { value: false, progressCount: false },
  meshOffset: { value: "", progressCount: true },
  pointInTime: { value: true, progressCount: false },
  cumulativeSky: { value: false, progressCount: false },
  outputTypes: { value: false, progressCount: true },
  solarIrradiation: { value: false, progressCount: false },
  absorbedSolarEnergy: { value: false, progressCount: false },
  solarShading: { value: false, progressCount: false },
  daylightIlluminance: { value: false, progressCount: false },
  solarIrradiance: { value: false, progressCount: false },
  absorbedHeatFlux: { value: false, progressCount: false },
  skyViewFactor: { value: false, progressCount: false },
  multiHourlySim: { value: false, progressCount: false },
  startDateTime: { value: null, progressCount: true },
  endDateTime: { value: null, progressCount: false },
  reflection: { value: reflectionInitVal, progressCount: false },
  samplingRay: { value: samplingRayInitVal, progressCount: false },
  sunInclusion: { value: sunInclusionInitVal, progressCount: false },
  multiband: { value: multibandInitVal, progressCount: false },
  totalFieldsCompleted: 0,
  totalFields: 0,
  activated: true,
  solarFormValidated: false,
};

const updateOutputTypesProgress = (state) => {
  // count no. of outputTypes checked
  const checkedOutputTypes = Object.fromEntries(
    Object.entries(state).filter(([key, value]) => outputTypes.includes(key) && value.value === true)
  );

  const countChecked = Object.keys(checkedOutputTypes).length;

  // if updating field from all unchecked to any fields checked
  if (countChecked > 0 && !state.outputTypes.value) {
    state.totalFieldsCompleted += 1;
    state.outputTypes.value = true;

    // if updating field from any fields checked to all unchecked
  } else if (countChecked === 0 && state.outputTypes.value) {
    state.totalFieldsCompleted -= 1;
    state.outputTypes.value = false;
  }
};

const resetFields = (state) => {
  if (state.reflection.value !== reflectionInitVal) {
    state.reflection.value = reflectionInitVal;
  }

  if (state.samplingRay.value !== samplingRayInitVal) {
    state.samplingRay.value = samplingRayInitVal;
  }

  if (state.sunInclusion.value !== sunInclusionInitVal) {
    state.sunInclusion.value = sunInclusionInitVal;
  }

  if (state.multiband.value !== multibandInitVal) {
    state.multiband.value = multibandInitVal;
  }

  if (state.startDateTime.value !== null) {
    state.startDateTime.value = null;
    state.totalFieldsCompleted -= 1;
  }

  if (state.endDateTime.value !== null) {
    state.endDateTime.value = null;
    state.totalFieldsCompleted -= 1;
    state.totalFields -= 1;
  } else if (state.multiHourlySim.value && state.endDateTime.value == null) {
    state.totalFields -= 1;
  }

  if (state.multiHourlySim.value) {
    state.multiHourlySim.value = false;
  }
};

const solarSlice = createSlice({
  name: "solar",
  initialState: initialSolarState,
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

      // if updating outputTypes field - count progress
      if (outputTypes.includes(key)) {
        updateOutputTypesProgress(state);
      }

      // if updating simulation type field, reset checkboxes in the other option
      if (key === POINT_IN_TIME && updatedVal) {
        if (state.solarIrradiation.value) {
          state.solarIrradiation.value = false;
        }

        if (state.absorbedSolarEnergy.value) {
          state.absorbedSolarEnergy.value = false;
        }

        updateOutputTypesProgress(state);
        resetFields(state);
      } else if (key === CUMULATIVE_SKY && updatedVal) {
        if (state.solarShading.value) {
          state.solarShading.value = false;
        }

        if (state.daylightIlluminance.value) {
          state.daylightIlluminance.value = false;
        }

        if (state.solarIrradiance.value) {
          state.solarIrradiance.value = false;
        }

        if (state.absorbedHeatFlux.value) {
          state.absorbedHeatFlux.value = false;
        }

        if (state.skyViewFactor.value) {
          state.skyViewFactor.value = false;
        }

        updateOutputTypesProgress(state);
        resetFields(state);
      }

      // if updating multi hourly sim field
      if (key === MULTI_HOURLY_SIM) {
        // field is selected, enable 2 other fields
        if (updatedVal) {
          state.totalFields += 1;
          state.endDateTime.progressCount = true;

          // field is unselected
        } else if (!updatedVal) {
          state.totalFields -= 1;
          state.endDateTime.progressCount = false;

          if (state.endDateTime.value) {
            state.totalFieldsCompleted -= 1;
            state.endDateTime.value = null;
          }
        }
      }
    },
    setTotalFields(state, action) {
      state.totalFields = action.payload;
    },
    setSolarActivated(state, action) {
      state.activated = action.payload;
    },
    setSolarFormValidated(state, action){
      state.solarFormValidated = action.payload;
    }
  },
});

export const solarActions = solarSlice.actions;

export default solarSlice.reducer;
