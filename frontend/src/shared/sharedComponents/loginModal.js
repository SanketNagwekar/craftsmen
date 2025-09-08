import React, { useState } from "react";
import { Modal, Button, Alert } from 'antd';
import axios from "axios";
import { Formik, Form, Field } from 'formik';
import { ERROR_MESSAGES } from '../appConfig/apiErrorCode';
import _ from 'lodash';

function validateEmail(value) {
    let error;
    if (!value) {
        error = 'Email address field is required';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address entered';
    }
    return error;
}

function validateOTP(value) {
    let error;
    if (!value) {
        error = 'OTP field is required';
    }
    else if (!/^[0-9]{4}$/i.test(value)) {
        error = 'Invalid OTP entered';
    }
    return error;
}

export default function LoginModal({ setIsLoginOpen, isLoginOpen }) {

    const [userEmail, setUserEmail] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiError, setAPIError] = useState('');

    const closeLoginModal = () => {
        setIsLoginOpen(false);
    }

    const handleLoginClick = (otp) => {
        setLoading(true);
        axios
            .post('/validateCustomerOtp', { "emailOrPhone": userEmail, "otp": parseInt(otp) })
            .then(op => {
                setLoading(false);
                if (op && op.data && op.data.result && op.data.result.token) {
                    localStorage.setItem("__t", op.data.result.token);
                    closeLoginModal();
                    window.location.reload();
                }
            })
            .catch(e => {
                setLoading(false);
                if (e.response && (e.response.status === 401 || e.response.status === 400)) {
                    setAPIError(e.response.data);
                }
                console.log("Exception:", e, e.response);
            })
    }

    const handleGetOTPClick = (email, callBack) => {
        setLoading(true);
        setUserEmail(email);
        axios
            .post('/customerLogin', { "emailOrPhone": email })
            .then(op => {
                setLoading(false);
                if (op && op.data && op.data.message && op.data.message === 'OTP_SENT_SUCCESSFULLY') {
                    setIsOtpSent(true);
                    callBack();
                }
            })
            .catch(e => {
                console.log("Exception: ", e);
                setLoading(false);
            })
    }

    const handleBackClick = () => {
        setUserEmail('');
        setIsOtpSent(false);
        setLoading(false);
        setAPIError('');
    }

    return (
        <Modal
            className="login-modal"
            title={'Login'}
            open={isLoginOpen}
            onCancel={closeLoginModal}
            footer={null}
        >
            {
                apiError &&
                <Alert
                    className="d-flex align-items-baseline justify-content-center mt-4"
                    message={ERROR_MESSAGES[apiError]}
                    type="error"
                    showIcon
                />
            }
            {
                isOtpSent ?
                    <Formik
                        initialValues={{
                            otp: '',
                            email: userEmail
                        }}
                        onSubmit={values => {
                            handleLoginClick(values.otp);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="mt-4">


                                <Alert
                                    className="d-flex align-items-baseline justify-content-center mb-4"
                                    message={<>Enter the otp received on <span className="fw-bolder"><i>"{userEmail}"</i></span></>}
                                    type="success"
                                    showIcon
                                    closable
                                />
                                <div className="form-group">
                                    <label htmlFor="otp" className="form-label">Enter OTP</label>
                                    <Field validate={validateOTP} type="text" name="otp" className={`form-control ${errors.otp && 'is-invalid'}`} id="otp" placeholder="OTP" />
                                    {errors.otp && touched.otp && <div className="invalid-feedback">{errors.otp}</div>}
                                </div>
                                <div className="d-flex align-items-center justify-content-end mt-3">
                                    <Button className="me-2 d-flex align-items-center justify-content-center" onClick={() => handleBackClick()} icon={<i className="fas fa-angle-left me-2" />} htmlType="button">Back</Button>
                                    <Button type="primary" htmlType="submit" loading={loading} icon={<i class="fas fa-sign-in-alt me-2"></i>}>Login</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    :
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        onSubmit={(values, { resetForm }) => {
                            handleGetOTPClick(values.email, resetForm)
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="mt-4">
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Enter you email address to continue</label>
                                    <Field validate={validateEmail} type="email" name="email" className={`form-control ${errors.email && 'is-invalid'}`} id="email" placeholder="Email address" />
                                    {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="d-flex align-items-center justify-content-end mt-3 form-group">
                                    <Button className="me-2" onClick={() => closeLoginModal()} htmlType="button" icon={<i className="fas fa-times me-2" />}>Cancel</Button>
                                    <Button type="primary" htmlType="submit" loading={loading} icon={<i class="fas fa-sign-in-alt me-2"></i>}>Get OTP</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
            }


        </Modal>
    );
}