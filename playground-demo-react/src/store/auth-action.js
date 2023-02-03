import { authActions } from "./auth-slice";
import axios from "axios";
import { LOGIN_URL } from '../constants';
import { useDispatch } from "react-redux";




export const sendLoginData = async (details) => {

    try {
        const res = await axios.post(
            LOGIN_URL,
          {
            email: details.email,
            password: details.password
          }
        );
        if (res.status === 200){
            console.log("User authentication")
            
        }
      
    } catch (err) {
        console.log(err)
    }
};