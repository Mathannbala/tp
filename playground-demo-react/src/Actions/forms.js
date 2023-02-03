import { formUpload } from "../Services/FormService";
import { SET_NOTIFICATION, FORM_SUBMIT_SUCCESS, UPDATE_PROJECT_TYPE, SET_SUBMIT_FORM_FLAG} from "../constants";

export const inputFieldCompleted = (field, filled) => (dispatch) => {
  dispatch({
    type: "COMPLETED_FIELD",
    payload: { 
      field,
      status: filled ? true : false
      }
  });
}
        // dispatch(formSubmitted(solar, wind, noise, project.cores, "12345"))

export const formSubmitted = (solar, wind, noise, cores, projectToken) => (dispatch) => {
  
  return formUpload({solar, wind, noise, cores, projectToken}).then(
    (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          notification: "Successfully submitted project for: " + projectToken,
        }  
      })

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          notification: "Failed to submit project for: " + projectToken
        }  
      })
      return Promise.reject();
    }
  );
}

export const updateProjectType = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_PROJECT_TYPE,
    payload: { 
      data
      }
  });
}

export const setSubmitFormFlag = (data) => (dispatch) =>{
  dispatch({
    type: SET_SUBMIT_FORM_FLAG,
    payload:{
      data
    }
  })
}