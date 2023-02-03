/* eslint-disable import/no-anonymous-default-export */
import { SET_SHOW_PREVIEW } from "../constants";
const initialState = [{
    showModal: false
  }]
  
  
  export default function (state = initialState, action) {
      const { type, payload } = action;
      switch (type) {
        
        case SET_SHOW_PREVIEW:
            console.log("Reducing show modal now: " + payload.showModal)
            return{
            ...state,
            showModal: payload.showModal
          }
          
        default:
          return state;
      }
  }