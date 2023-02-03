/* eslint-disable import/no-anonymous-default-export */
import { UPDATE_PROJECT_TYPE, FORM_SUBMIT_SUCCESS, SET_SUBMIT_FORM_FLAG } from "../constants";
const initialState = [{
  numberOfInputCompleted: 0,
  projectType: {
    sendSolarForm: true,
    sendWindForm: false,
    sendNoiseForm: false
  }
}]


export default function (state = initialState, action) {
    const { type, payload } = action;
    //console.log(payload)
    switch (type) {
      case "COMPLETED_FIELD":
        if (payload.status === true){
          console.log("A field is updating success")
          console.log("States number of complete:" + state.numberOfInputCompleted)
          return{
            ...state,
            numberOfInputCompleted: isNaN(state.numberOfInputCompleted) ? 1 : state.numberOfInputCompleted + 1,
          }
        }
          
        else{
          console.log("A field is updating failed")
          return {
            ...state,
            numberOfInputCompleted: state.numberOfInputCompleted - 1
          }
        }
      case FORM_SUBMIT_SUCCESS:
        console.log("Form successfully submitted")
        return{
          ...state,
        }
      
      case UPDATE_PROJECT_TYPE:
        console.log("Project type changed")
        console.log(payload.data)
        return{
          ...state,
          projectType: payload.data
        } 

        case SET_SUBMIT_FORM_FLAG:
          console.log("Submit form flag has been set")
          console.log(payload.data)
          return{
            ...state,
            submitFormFlag: payload.data.submitFormFlag
          } 
        
      default:
        return state;
    }
}