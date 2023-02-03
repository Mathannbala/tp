import React, { useState } from 'react'
import { ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from 'react-redux';

import { clearNotification } from '../Actions/toasts';

export default function Toasts(){

    const dispatch = useDispatch()
    const notification = useSelector(state => state.toasts.notification)
    const [show, setShow] = useState(true)
    const clear = () =>{
        dispatch(clearNotification())
    }
    return(
        <div>
            { notification && (
                    <ToastContainer className="p-3" position="top-start">
                        <Toast
                            onClose={(e)=> clear()}
                        >
                            <Toast.Header>
                            <img 
                                src="holder.js/20x20?text=%20" 
                                className="rounded me-2" 
                                alt="" />
                            <strong className="me-auto">Notification</strong>
                            <small>11 mins ago</small>
                            </Toast.Header>
                            <Toast.Body>{notification}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                )
            }
        </div>
    );
}