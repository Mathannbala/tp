import { current } from "@reduxjs/toolkit";
import React, { useState } from "react";

// format number. e.g. 3.0, 3.50, 1.10, 2.0
export const formatNumber = (num) => {
  if (num % 1 === 0) {
    return num.toFixed(1);
  } else {
    return num.toFixed(2);
  }
};

// on clicking + button beside inputnewValue
export const incrementHandler = (currentVal, minVal, maxVal, step) => {
  let newVal = +currentVal + step;

  // when there is no initial input, set it to minVal
  if (newVal < minVal) {
    newVal = minVal;
  }

  // cap new value to max value
  if (newVal > maxVal) {
    return formatNumber(maxVal);
  } else {
    if (!currentVal && minVal == 0) {
      return formatNumber(0);
    }
    return formatNumber(newVal);
  }
};

// on clicking - button beside input
export const decrementHandler = (currentVal, minVal, step) => {
  const newVal = +currentVal - step;

  // cap new value to min value
  if (newVal < minVal) {
    return formatNumber(minVal);
  } else {
    return formatNumber(newVal);
  }
};

// on entering numbers in input field
export const checkNumericInput = (newValue, minVal, maxVal) => {
  // cap new value to min or maximum value
  if (newValue) {
    if (newValue > maxVal) {
      return formatNumber(maxVal);
    } else if (newValue < minVal) {
      return formatNumber(minVal);
    } else {
      // convert string input to float
      return formatNumber(parseFloat(newValue, 10));
    }
  } else {
    return "";
  }
};

// field count to be included in progress bar - where progressCount = true
export const getFieldsCount = (list) => {
  const filteredByValue = Object.fromEntries(
    Object.entries(list).filter(([key, value]) => value.progressCount === true)
  );

  return Object.keys(filteredByValue).length;
};

// prevent exponents and + in numeric input field
export const preventKeys = (e) => {
  const keys = ["e", "E", "+", "-"];

  if (keys.includes(e.key)) {
    e.preventDefault();
  }
};

//function to export as JSON file
export const exportToJson = ({ data, fileName, fileType, fileHandle }) => {
  // Create a blob with the data we want to download as a file
  var blob = new Blob([data], { type: fileType });

  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  // const a = document.createElement("a");
  // a.download = fileName;
  // a.href = window.URL.createObjectURL(blob);

  // const clickEvt = new MouseEvent("click", {
  //   view: window,
  //   bubbles: true,
  //   cancelable: true,
  //});

  // a.dispatchEvent(clickEvt);
  // a.remove();
  if(window.navigator.msSaveOrOpenBlob){
    window.navigator.msSaveOrOpenBlob(blob, fileName, fileHandle)
  }
  else{
    var a = document.createElement("a"),
    url = URL.createObjectURL(blob);
    a.href = url
    a.download = fileName
    document.body.appendChild(a);
    a.click()
}
};

//double check with mathan if this is needed
export function Upload() {
  const [files, setFiles] = useState("");

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);
      setFiles(e.target.result);
    };
  };
  return (
    <>
      
      <input type="file" 
      accept=".json,application/json"
      onChange={handleChange} />
      <br />
      {"uploaded configuration: " + files}
    </>
  );
}
