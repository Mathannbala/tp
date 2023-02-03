import { SET_SHOW_PREVIEW } from "../constants";

export const setShowAction = (bool) => (dispatch) => {
    dispatch({
      type: SET_SHOW_PREVIEW,
      payload: {
        showModal: bool
      }  
    });
}