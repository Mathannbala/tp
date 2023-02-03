/* eslint-disable import/no-anonymous-default-export */
const initialState = [{
  numberOfInputCompleted: 0,
}]


export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log(payload)
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
      case "FORM_SUBMIT_SUCCESS":
        console.log("Form successfully submitted")
        return{
          ...state,
        }

      default:
        return state;
    }
}