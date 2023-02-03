import { SET_FILES_URL, FILE_UPLOAD_SUCCESS, FILE_UPLOAD_FAIL, SET_NOTIFICATION,SET_FILES_URL_ARR_NUM } from "../constants";
import { fileUploadService, undoFileUploadService } from "../Services/StlFormService";

export const setFileUploadAction = (files) => (dispatch) => {
    console.log("set File upload Action")
    console.log(files)
    dispatch({
        type: SET_FILES_URL,
        payload: files 
      })
};

export const sendFileUploadAction = (files, projectToken) => (dispatch) => {
    var file = files.slice(-1)[0]
    return fileUploadService(
        "jon@wiz.com", 
        file.name, 
        file,
        projectToken
        ).then(
    (data) => {
        console.log("dispatching file upload success")
        dispatch({
            type: SET_NOTIFICATION,
            payload: {
                notification: file.name +  " successfully uploaded"
            }
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
            console.log("dispatching file upload fail")
            dispatch({
                type: FILE_UPLOAD_FAIL,
        });
        
        console.log("dispatching message")
        dispatch({
            type: SET_NOTIFICATION,
            payload: {
                notification: file.name + " failed to upload"
            }
        });

        return Promise.reject();
    }
    );
};

export const undoFileUploadAction = (file, projectToken) => (dispatch) => {
    console.log("Okay at least it got into action")
    console.log(file)
    return undoFileUploadService("jon@wiz.com", file.name, projectToken).then(
    (data) => {
        console.log("dispatching file upload success")
        dispatch({
            type: SET_NOTIFICATION,
            payload: {
                notification: file.name + " successfully removed"
            }
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
            console.log("dispatching file removal fail")
            dispatch({
                type: FILE_UPLOAD_FAIL,
        });
        
        console.log("dispatching message")
        dispatch({
            type: SET_NOTIFICATION,
            payload: {
                notification: file.name + " failed to remove"
            }
        });

        return Promise.reject();
    }
    );
};

export const setFileArrSelected = (selectNumberArrCount) => (dispatch) => 
{
  console.log("set File Arr Selected Number")
  console.log("Arr Number: "+ selectNumberArrCount)
  dispatch(
    {
      type: SET_FILES_URL_ARR_NUM,
      payload: selectNumberArrCount 
    })
}