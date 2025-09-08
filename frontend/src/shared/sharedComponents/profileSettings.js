import React, { useEffect, useState } from "react";
import { Modal, Button } from 'antd';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from "../appConfig/apiErrorCode";

function validateContact(value) {
    let error;
    if (!/^[0-9]{10}$/i.test(value)) {
        error = 'Contact is invalid';
    }
    return error;
}

function validateGender(value) {
    let error;
    if (!value) {
        error = 'Gender is required';
    }
    return error;
}

export default function ProfileSettings({ setIsProfileSettingsOpen, isProfileSettingsOpen, customerDetails, getCustomer }) {

    const [profilePict, setProfilePict] = useState(customerDetails.userImage);
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdateClick = async (userData) => {

        let fileUrl = await uploadFile();
        let updateData = {
            "userName": userData.fullName,
            "userAddress": userData.address,
            "userContactNumber": parseInt(userData.contact),
            "userGender": (userData.gender === 'male') ? true : false,
            "userImage": fileUrl
        }
        setLoading(true);
        axios
            .post('/updateCustomer', updateData)
            .then(op => {
                setLoading(false);
                if (op && op.data && op.data.message === "UPDATED") {
                    getCustomer();
                    toast.success('Details Updated Successfully');
                }
            })
            .catch(e => {
                console.log("Exception: ", e);
                setLoading(false);
            })
    }

    const handleCancelClick = () => {
        setIsProfileSettingsOpen(false);
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const uploadFile = () => {
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem("__t")}`
                },
            };
            setLoading(true);
            return axios
                .post('/uploadFile', formData, config)
                .then(op => {
                    setLoading(false);
                    if (op && op.data && op.data.message === "IMAGE_UPLOADED") {
                        setProfilePict(op.data.result);
                        return (op.data.result);
                    }
                })
                .catch(e => {
                    console.log("Exception: ", e);
                    setLoading(false);
                })
        }
        else {
            return profilePict;
        }
    }

    return (
        <Modal
            className="profile-settings"
            title={'Update Profile'}
            open={isProfileSettingsOpen}
            onCancel={handleCancelClick}
            footer={null}
        >

            <Formik
                initialValues={{
                    fullName: customerDetails.userName,
                    address: customerDetails.userAddress,
                    email: customerDetails.userEmail,
                    contact: customerDetails.userContactNumber,
                    gender: (customerDetails.userGender) ? 'male' : 'female',

                }}
                onSubmit={values => {
                    handleUpdateClick(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className="mt-4">
                        <div className="form-group mb-3">
                            <label htmlFor="fullName" className="form-label">Full Name</label>
                            <Field type="text" name="fullName" className={`form-control`} id="fullName" placeholder="Enter Full Name" />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <Field as="textarea" name="address" className={`form-control`} id="address" placeholder="Enter Address" />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field disabled type="text" name="email" className={`form-control`} id="email" placeholder="Enter Email" />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="contact" className="form-label">Contact</label>
                            <Field validate={validateContact} type="text" name="contact" className={`form-control ${errors.contact && 'is-invalid'}`} id="contact" placeholder="Enter Contact" />
                            {errors.contact && touched.contact && <div className="invalid-feedback">{errors.contact}</div>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <Field validate={validateGender} as="select" name="gender" className={`form-control ${errors.gender && 'is-invalid'}`} id="gender" placeholder="Enter Gender">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Field>
                            {errors.gender && touched.gender && <div className="invalid-feedback">{errors.gender}</div>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                            <input className="form-control" onChange={handleFileChange} type="file" id="profilePicture" accept="image/png, image/jpeg, image/jpg" />
                        </div>
                        <div className="d-flex align-items-center justify-content-end mt-3">
                            <Button className="me-2 d-flex align-items-center justify-content-center" onClick={() => handleCancelClick()} icon={<i className="fas fa-times me-2" />} htmlType="button">Close</Button>
                            <Button className="d-flex align-items-center justify-content-center" type="primary" htmlType="submit" loading={loading} icon={<i className="fas fa-save me-2" />}>Update</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}