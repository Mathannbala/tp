export const clearNotification = (id) => (dispatch) => {
    dispatch({
      type: "CLEAR_NOTIFICATION",
      payload: {
        index: id
      }  
    });
  }