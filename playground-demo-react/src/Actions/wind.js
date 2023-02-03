import { windActions } from "../Reducers/wind";
import { setSubmitFormFlag } from "./forms";

export const setStateValue = (key, updatedVal) => (dispatch) => {
  dispatch(
    windActions.setStateValue({
      key: key,
      updatedVal: updatedVal,
    })
  );
};

export const setStateProgress = (key, updatedVal) => (dispatch) => {
  dispatch(
    windActions.setStateProgress({
      key: key,
      updatedVal: updatedVal,
    })
  );
};

export const setTotalFields = (totalFieldsCount) => (dispatch) => {
  dispatch(windActions.setTotalFields(totalFieldsCount));
};

export const setTotalFieldsCompleted = (totalFieldsCompleted) => (dispatch) => {
  dispatch(windActions.setTotalFieldsCompleted(totalFieldsCompleted));
};

export const setWindActivated = (updatedVal) => (dispatch) => {
  dispatch(windActions.setWindActivated(updatedVal));
};

export const setWindFormValidated = (bool) => (dispatch) => {
  dispatch(windActions.setWindFormValidated(bool))
}