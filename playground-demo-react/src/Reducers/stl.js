// import { createSlice } from "@reduxjs/toolkit";

// const initialURL = {
//   stlUrl: "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl",
// };

// const stlSlice = createSlice({
//   name: "stl",
//   initialState: initialURL,
//   reducers: {
//     setURL(state, action) {
//       state.url = action.payload;
//     },
//   },
// });

// export const stlActions = stlSlice.actions;

// export default stlSlice.reducer;

/* eslint-disable import/no-anonymous-default-export */
import { SET_FILES_URL,SET_FILES_URL_ARR_NUM} from "../constants"

const initialState = {
  files: [],
  selectNumberArrCount:0,
  extention:"",
  data:null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_FILES_URL:
      console.log("Reducing set files url with payload of:")
      console.log(payload)

      return { 
        ...state,
        files: payload 
      };
    case SET_FILES_URL_ARR_NUM:
      console.log("Reducing set files arr num with payload of:")
      console.log(payload)

    return { 
      ...state,
      selectNumberArrCount: payload
    };
    default:
      return state;
  }
}