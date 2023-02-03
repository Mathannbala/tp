import axios from "axios";
import { GET_PROJECT_TOKEN_URL, GET_PROJECT_RESULTS_URL } from "../constants";

export const generateProjectTokenService = async (projectName, username) => {
    const response = await axios.post(
        GET_PROJECT_TOKEN_URL,
        {
            projectName,
            username
        });
    console.log(response);
    if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

export const getProjectResultsService = async (projectToken, username) => {
    console.log(projectToken + " " + username)
    let formData = new FormData();
    formData.append("projectToken", projectToken)
    formData.append("username", username)
    console.log(formData.get("projectToken"))
    console.log(formData.get("username"))
    const response = await axios.post(
        GET_PROJECT_RESULTS_URL,
        {
            projectToken,
            username
        },
        {
            "responseType" : "blob"
        }
    )
    console.log(response)
    return response.data;
};
  