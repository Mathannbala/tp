import axios from "axios";
import { LOGIN_URL } from "../constants";

export const loginService = async (email, password) => {
    console.log(email + " " + password)
    const response = await axios.post(
        LOGIN_URL,
        {
            email,
            password,
        });
    console.log(response);
    if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  };
  