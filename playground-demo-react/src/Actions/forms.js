export const inputFieldCompleted = (field, filled) => (dispatch) => {
    console.log("ACTION -- inputFieldCompleted")
    dispatch({
      type: "COMPLETED_FIELD",
      payload: { 
        field,
        status: filled ? true : false
        }
    });
}

export const formSubmitted = () => (dispatch) => {
  console.log("ACTION -- formSubmitted")
  console.log("dispatching one")
  dispatch({
    type: "FORM_SUBMIT_SUCCESS",
    payload: {
      status: true
    }  
  });
  console.log("dispatching two")
  dispatch({
    type: "SET_NOTIFICATION",
    payload: {
      notification: "Form successfully submitted"
    }  
  })
  
}