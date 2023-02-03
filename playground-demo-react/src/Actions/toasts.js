export const clearNotification = () => (dispatch) => {
    console.log("ACTION -- clearNotification")
    dispatch({
      type: "CLEAR_NOTIFICATION",
      payload: {
        status: true
      }  
    });
  }