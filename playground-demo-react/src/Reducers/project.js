/* eslint-disable import/no-anonymous-default-export */
import { GET_PROJECT_RESULTS_SUCCESS, GET_PROJECT_TOKEN_SUCCESS, SET_PROJECT_CORES } from "../constants";
const initialState = [{
  projectToken: "",
  cores: "1",
  projectResults:null,
}]
  
  
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECT_TOKEN_SUCCESS:
        console.log("reducing project token")
      return{
        ...state,
        projectToken: payload.projectToken,
      }
      case SET_PROJECT_CORES:
        console.log("setting project cores with " + payload.cores + typeof payload.cores)
        return{
          ...state,
          cores: payload.cores
        }
      case GET_PROJECT_RESULTS_SUCCESS:
        console.log("reducing project results")
        return{
          ...state,
          projectResults: payload.projectResults,
          projectRetrieved: true
        }
        
    default:
      return state;
  }
}