import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from 'react-redux';

import { clearNotification } from '../Actions/toasts';
import { useMediaQuery } from 'react-responsive';

export default function Toasts(){

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)'})

    const dispatch = useDispatch()
    const notification = useSelector(state => state.toasts.notification)
    const notificationTime = useSelector(state => state.toasts.notificationTime)
    const [show, setShow] = useState(true)
    const clear = (index) =>{
        dispatch(clearNotification(index))
    }
    useEffect(()=>{
        console.log(notification)
    }, [notification])
    return(
        <div>
            { notification && (
                isDesktop ? (
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
                            <small>{notificationTime}</small>
                            </Toast.Header>
                            <Toast.Body>{notification}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                ) : (
                    <ToastContainer className="p-3" position="top-start">
                        {notification.slice(0).reverse().map( (noti,index) => {
                            return (
                                <Toast
                                    show={true}
                                    onClose={(e)=> clear(index)}
                                    animation={true}
                                    style = {{
                                        "z-index": "101"
                                    }}
                                >
                                    <Toast.Header>
                                    <img 
                                        src="holder.js/20x20?text=%20" 
                                        className="rounded me-2" 
                                        alt="" />
                                    <strong className="me-auto">Notification</strong>
                                    <small>{notificationTime[index]}</small>
                                    </Toast.Header>
                                    <Toast.Body>{notification[index]}</Toast.Body>
                                </Toast>
                            );
                        })}
                    </ToastContainer>
                )
            )}
        </div>
    );
}
