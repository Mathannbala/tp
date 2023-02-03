/* eslint-disable import/no-anonymous-default-export */
const initialState = [{
    notification: ""
  }]
  
  
  export default function (state = initialState, action) {
      const { type, payload } = action;
      switch (type) {
        
        case "SET_NOTIFICATION":
            console.log("Notification Set")
            return{
            ...state,
            notification: payload.notification
          }

        case "CLEAR_NOTIFICATION":
          console.log("Notification Cleared")
          return{
            ...state,
            notification: ""
          }
          
        default:
          return state;
      }
  }