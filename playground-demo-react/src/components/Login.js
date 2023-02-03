import React, { useState } from 'react'
import 'startbootstrap-sb-admin-2/css/sb-admin-2.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../Actions/login';
import { Navigate, useNavigate  } from 'react-router-dom';

const Login = (props) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const isLoggedIn = useSelector(state => state.login.isLoggedIn)
    var isLoggedIn = false;
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        navigate("/landing");
        window.location.reload();
        e.preventDefault()
        // dispatch(login(email, password)).then(() => {
        //     console.log("Login success, redirecting to landing page")
        //     navigate("/landing");
        //     window.location.reload();
        // })
    }

    if (isLoggedIn) {
        return <Navigate to="/landing" />;
    }

  return (
    <div className="bg-gradient-primary" style={{height: '100vh'}}>
        <div className="container">

            <div className="row justify-content-center">

                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">

                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form className="user" onSubmit = { handleSubmit }>
                                            <div className="form-group">
                                                <input 
                                                    type="email" 
                                                    className="form-control form-control-user"
                                                    id="exampleInputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..."
                                                    onChange = {(e) => setEmail(e.target.value)}
                                                    required
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="password" 
                                                    className="form-control form-control-user"
                                                    id="exampleInputPassword" 
                                                    placeholder="Password"
                                                    onChange = {(e) => setPassword(e.target.value)}
                                                    required
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input 
                                                        type="checkbox" 
                                                        className="custom-control-input" 
                                                        id="customCheck"/>
                                                    <label 
                                                        className="custom-control-label" 
                                                        for="customCheck"
                                                    >Remember Me
                                                    </label>
                                                </div>
                                            </div>
                                            <button 
                                                type='submit' 
                                                className="btn btn-primary btn-user btn-block"
                                                >Submit
                                                </button>
                                                
                                            <hr/>
                                        </form>
                                        <div className="text-center">
                                            <a className="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small" href="register">Create an Account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
  )
}

export default Login;