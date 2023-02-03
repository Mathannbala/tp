import { generateProjectTokenService, getProjectResultsService } from "../Services/ProjectService";
import { GET_PROJECT_TOKEN_SUCCESS, SET_NOTIFICATION, SET_PROJECT_CORES, GET_PROJECT_RESULTS_SUCCESS } from "../constants";

export const getProjectTokenAction = (projectName, username) => (dispatch) => {
  console.log(projectName, username)
  return generateProjectTokenService(projectName, username).then(
    (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          notification: "Successfully generated project token for: " + projectName,
        }  
      })
      dispatch({
        type: GET_PROJECT_TOKEN_SUCCESS,
        payload: {
          projectToken: data
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
          notification: "Failed to generate a project token for: " + projectName
        }  
      })
      return Promise.reject();
    }
  );
}

export const setCoresAction = (data) => (dispatch) =>{
  dispatch({
    type: SET_PROJECT_CORES,
    payload: {
      cores: data
    }  
  })
}

export const getProjectResultsAction = (projectToken, username) => (dispatch) =>{
  console.log(projectToken)
  return getProjectResultsService(projectToken, username).then(
    (data) => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          notification: "Successfully retrieved file(s) for project: " + projectToken,
        }  
      })
      dispatch({
        type: GET_PROJECT_RESULTS_SUCCESS,
        payload: {
          projectResults: data
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
      console.log(message)
      return Promise.reject();
    }
  );
}