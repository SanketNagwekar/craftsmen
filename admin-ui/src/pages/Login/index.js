import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import curvedImage from '../../assets/img/curved6.jpg';
import logo from '../../assets/img/craftsmen-logo.png';

import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import axios from '../../shared/helper/apiHelper';

import './style.css';
import Footer from "../../shared/layout/commonAssets/footer";
import Loader from "../../shared/sharedComponents/Loader";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

export default function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator())


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSignInClick = () => {
        if (simpleValidator.current.allValid()) {
            let credentials = {
                "username": username,
                "password": password
            }
            setLoading(true);
            axios
                .post(`/dologin`, credentials)
                .then(op => {
                    setLoading(false);
                    if (!_.isEmpty(op) && !_.isEmpty(op.data) && !_.isEmpty(op.data.result) && !_.isEmpty(op.data.result.token)) {
                        localStorage.setItem("__t", op.data.result.token);
                        navigate('/');
                    }
                    else {
                        // Handle the errors here
                    }
                })
                .catch(e => {

                    console.log("Exception: ", e);
                    setLoading(false);

                    if (e && e.response && e.response.data && e.response.data.err_msg == "INVALID_EMAIL_OR_PASSWORD") {
                        toast.error('Invalid username or password.', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    } else {
                        toast.error('Something went wrong please try again after some time.', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }


                })
        } else {
            simpleValidator.current.showMessages();
        }
    }

    return (<>
        <ToastContainer
            position="top-right"
            // autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <Helmet>
            <meta charSet="utf-8" />
            <title>Login - Craftsmen</title>
        </Helmet>

        <div className="container position-sticky z-index-sticky top-0">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
                        <div className="container-fluid">
                            <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " href="/">
                                <img src={logo} alt={'Crafsman Logo'} style={{ width: 120 }} />
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <main className="main-content  mt-0">
            <section>
                <div className="page-header min-vh-75">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                <div className="card card-plain mt-8">
                                    <div className="card-header pb-0 text-left bg-transparent">
                                        <h3 className="font-weight-bolder text-info text-gradient">Welcome back</h3>
                                        <p className="mb-0">Enter your username and password to proceed</p>
                                    </div>
                                    <div className="card-body">
                                        <label>Username</label>
                                        <div className="mb-3">
                                            <input type="text"
                                                name="username"
                                                value={username}
                                                onChange={handleUsernameChange}
                                                className="form-control"
                                                placeholder="Username"
                                                aria-label="Email"
                                                aria-describedby="email-or-phone"
                                                onBlur={() => simpleValidator.current.showMessageFor('username')}
                                            />
                                            {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('username', username, 'required')}
                                        </div>
                                        <label>Password</label>
                                        <div className="mb-3">
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                                className="form-control"
                                                placeholder="Password"
                                                aria-label="Password"
                                                aria-describedby="password"
                                                onBlur={() => simpleValidator.current.showMessageFor('password')}
                                            />
                                            {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('password', password, 'required')}
                                        </div>
                                        <div className="text-center">
                                            <button type="button" onClick={handleSignInClick} className="btn bg-gradient-info w-100 mt-4 mb-0">Sign In</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                    <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{ backgroundImage: `url(${curvedImage})` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <Footer />
        {loading && <Loader />}
    </>);
}