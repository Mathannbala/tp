import { solarActions } from "../Reducers/solar";

export const setStateValue = (key, updatedVal) => (dispatch) => {
  dispatch(
    solarActions.setStateValue({
      key: key,
      updatedVal: updatedVal,
    })
  );
};

export const setTotalFields = (totalFieldsCount) => (dispatch) => {
  dispatch(solarActions.setTotalFields(totalFieldsCount));
};

export const setSolarActivated = (updatedVal) => (dispatch) => {
  dispatch(solarActions.setSolarActivated(updatedVal));
};

export const setSolarFormValidated = (bool) => (dispatch) =>{
  dispatch(solarActions.setSolarFormValidated(bool))
}