import { loginService } from "../Services/LoginService";

export const login = (email, password) => (dispatch) => {
    return loginService(email, password).then(
      (data) => {
        console.log("dispatching login success")
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        console.log("dispatching login fail")
        dispatch({
          type: "LOGIN_FAIL",
        });
        
        console.log("dispatching message")
        dispatch({
          type: "SET_MESSAGE",
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };