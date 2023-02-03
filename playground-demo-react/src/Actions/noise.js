import { noiseActions } from "../Reducers/noise";
import { SET_NOTIFICATION, FILE_UPLOAD_FAIL } from "../constants";
import { noiseFileUploadService } from "../Services/NoiseService";

export const setStateValue = (key, updatedVal) => (dispatch) => {
  console.log(updatedVal)
  dispatch(
    noiseActions.setStateValue({
      key: key,
      updatedVal: updatedVal,
    })
  );
};

export const setTotalFields = (totalFieldsCount) => (dispatch) => {
  dispatch(noiseActions.setTotalFields(totalFieldsCount));
};

export const setNoiseActivated = (updatedVal) => (dispatch) => {
  dispatch(noiseActions.setNoiseActivated(updatedVal));
};

export const setNoiseFormValidated = (bool) => (dispatch) =>{
  dispatch(noiseActions.setNoiseFormValidated(bool))
}

export const sendNoiseFileUploadAction = (file, projectToken) => (dispatch) => {
  console.log(file)
  var filename = file[0].name
  return noiseFileUploadService({
    username: "jon@wiz.com", 
    noiseFileName: filename, 
    file: file[0], 
    uuid: projectToken}).then(
  (data) => {
      console.log("dispatching file upload success")
      dispatch({
          type: SET_NOTIFICATION,
          payload: {
              notification: file.name +  " successfully uploaded"
          }
      });

      return Promise.resolve();
  },
  (error) => {
      const message =
      (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
          console.log("dispatching file upload fail")
          dispatch({
              type: FILE_UPLOAD_FAIL,
      });
      
      console.log("dispatching message")
      dispatch({
          type: SET_NOTIFICATION,
          payload: {
              notification: file.name + " failed to upload"
          }
      });

      return Promise.reject();
  }
  );
};