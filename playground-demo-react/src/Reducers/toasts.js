import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from "../constants"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  notification: [],
  notificationTime: []
}
  
  
  export default function (state = initialState, action) {
      const { type, payload } = action;
      switch (type) {
        
        case SET_NOTIFICATION:
            console.log("setting notification")
            let currentDate = new Date();
            let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
            return{
            ...state,
            notification: [...state.notification, payload.notification],
            notificationTime: [...state.notificationTime, time]
          }

        case CLEAR_NOTIFICATION:
          return{
            ...state,
            notification: state.notification.filter((_,i) => i !== payload.index),
            notificationTime: state.notificationTime.filter((_,i) => i !== payload.index)
          }
          
        default:
          return state;
      }
  }