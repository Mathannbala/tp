import axios from "axios";
import { FILE_UPLOAD_URL, UNDO_FILE_UPLOAD_URL } from "../constants";

export const fileUploadService = async (email, fileName, file, projectToken) => {
    let formData = new FormData();
    formData.append("username", email)
    formData.append("fileName", fileName)
    formData.append("file", file)
    formData.append("uuid", projectToken)
    // Display the key/value pairs
    for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
    }
    const response = await axios.post(
        FILE_UPLOAD_URL,
        formData,
        {
            headers: {
                // "Authorization": "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
                "Content-Type": "multipart/form-data",
            },                    
        }
    )
    .then(res => {
        console.log(`Success` + res.data);
        console.log(res)
    })
    .catch(err => {
        console.log(err);
        return err
    })

  };


export const undoFileUploadService = async (email, fileName, projectToken ) => {
    let formData = new FormData();
    formData.append("username", email)
    formData.append("fileName", fileName)
    formData.append("uuid", projectToken)
    // Display the key/value pairs
    for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
    }

    const response = await axios.post(
        UNDO_FILE_UPLOAD_URL,
        formData,
        {
            headers: {
                // "Authorization": "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
                "Content-Type": "multipart/form-data",
            },                    
        }
    )
    .then(res => {
        console.log(`Success` + res.data);
        console.log(res)
        return res
    })
    .catch(err => {
        console.log(err);
        return err
    })
};
  