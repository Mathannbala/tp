import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';

export default function Timer()
{
    const [time, setTime] = useState(0);
    //react redux this (false stop timer, true start timer)
    const [isRunning, setIsRunning] = useState(false);
    let intervalId;

    //set this variable to the current time when visual VTk button is pressed
    const currentTime = "00:00:00 PM"

    useEffect(() => {
    if (isRunning) {
        intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
        }, 1000);
    }
    return () => clearInterval(intervalId);
    }, [isRunning]);

    const triggerCurrentTime = () => {
        currentTime = new Date().toLocaleTimeString();
        console.log("Current Time Started Locked: " + currentTime);
    }


    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleReset = () => {
    setIsRunning(false);
    setTime(60);
  }

  return (
    <div>
        <Row>
            <b>Start Time: {currentTime}</b>
        </Row>
        <Row>
            <b>Est Duration: </b>
        </Row>
        <Row>
            <b>Elapsed Time: {Math.floor(time / 60)} minutes {time % 60} seconds</b>
        </Row>
    </div>
  );
}