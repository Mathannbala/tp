import axios from "axios";
import { NOISE_FILE_UPLOAD_URL, UNDO_NOISE_FILE_UPLOAD_URL } from "../constants";

export const noiseFileUploadService = async (data) => {
    let formData = new FormData();
    console.log(data)
    formData.append("username", data.username)
    formData.append("noiseFileName", data.noiseFileName)
    formData.append("file", data.file)
    formData.append("uuid", data.uuid)
    return true
    // Display the key/value pairs
    for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
    }

    const response = await axios.post(
        NOISE_FILE_UPLOAD_URL,
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


export const undoFileUploadService = async (data ) => {
    let formData = new FormData();
    formData.append("custEmail", data.email)
    formData.append("fileName", data.fileName)
    formData.append("uuid", data.projectToken)
    // Display the key/value pairs
    for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
    }

    const response = await axios.post(
        UNDO_NOISE_FILE_UPLOAD_URL,
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
  