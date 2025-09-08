import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";

import Footer from "../../shared/layout/commonAssets/footer";
import SubHeading from "../../shared/layout/commonAssets/subHeading";
import axios from "../../shared/helper/apiHelper";
import Loader from "../../shared/sharedComponents/Loader";
import Button from '@mui/material/Button';
import _ from 'lodash';
import moment from 'moment';
import NoData from "../../shared/sharedComponents/NoData";
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { toast } from 'react-toastify';
import { getImagePath } from '../../shared/helper/genHelper';

import './style.css';


export default function Customers() {

    const [customerList, setCustomerList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [delTarget, setDelTarget] = useState(null);
    const [toDelId, setToDelId] = useState(null);
    const delRefContainer = useRef(null);

    useEffect(() => {
        loadList();
    }, []);

    const loadList = () => {
        setLoading(true);
        axios
            .get('/getCustomersList')
            .then(op => {
                setLoading(false);
                if (!_.isEmpty(op) && !_.isEmpty(op.data) && !_.isEmpty(op.data.result)) {
                    setCustomerList(op.data.result);
                }
            })
            .catch(e => {
                console.log("Exception: ", e);
                setLoading(false);
            })
    }

    const handleLoadingStatus = () => {
        let dataStatus = "";
        if (loading) {
            dataStatus = <div className="text-center my-2">Loading Data...</div>;
        }
        else {
            dataStatus = <NoData imageWidth={'110px'} noDataTitle={'No Data Found'} noDataText={'We did not find any customers. This list will be populated once a customer registers itself via portal'} />;
        }
        return (<tr><td colSpan={8}>{dataStatus}</td></tr>);
    }

    const handleDelClick = (event, id) => {
        event.preventDefault();
        setShowConfirmDelete(!showConfirmDelete);
        setDelTarget(event.target);
        setToDelId(id);
    };

    const handleYesClick = () => {
        setLoading(true);
        axios
            .delete(`/delCustomer?i=${toDelId}`)
            .then(op => {
                // console.log("I am output::", op);
                setLoading(false);
                if (!_.isEmpty(op) && !_.isEmpty(op.data) && op.data.message === 'CUSTOMER_DELETED') {
                    loadList();
                    toast.success('Customer deleted successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setShowConfirmDelete(false);
                }
            })
            .catch(e => {
                console.log("Exception: ", e);
                setLoading(false);
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
            })
    }


    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Customer List- Craftsmen</title>
        </Helmet>
        <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
            <SubHeading
                mainApp={'Craftsmen'}
                pageBreadcrumb={'Customers'}
                pageTitle={'Customers List'}
            />
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                                <h6 className="font-weight-bolder">Customers List</h6>
                                {/* <button onClick={handleAddClick} type="button" className="btn btn-outline-primary btn-xs mb-0 py-2 px-3 text-capitalize"><i className="fas fa-plus-circle me-1"></i> New</button> */}
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive p-0" ref={delRefContainer}>
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Name</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Contact</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Email</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Address</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Gender</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created On</th>
                                                <th className="text-secondary opacity-7"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                !_.isEmpty(customerList) ? customerList.map(
                                                    (el, index) =>
                                                        <tr key={`customer-${el.userId}-${index}`}>
                                                            <td><span className="px-3 text-xs">{el.userId}</span></td>
                                                            <td>
                                                                <span className="me-2">
                                                                    {
                                                                        el.userImage ?
                                                                            <img src={getImagePath(el.userImage)} className="rounded-circle" style={{ width: 25, height: 25 }} alt="Avatar" loading="lazy" />
                                                                            :
                                                                            <i style={{ fontSize: 25 }} className="far fa-user-circle"></i>
                                                                    }
                                                                </span>

                                                                <span className="text-xs">

                                                                    {el.userName}
                                                                </span>
                                                            </td>
                                                            <td><div className="text-xs"><i className='bx bxs-phone-call me-1 phone-icon-color'></i> {el.userContactNumber}</div></td>
                                                            <td><span className="text-xs"><i className="fas fa-envelope-square me-1 mail-icon-color"></i> {el.userEmail}</span></td>
                                                            <td><span className="text-xs"><i className="fas fa-map-marker-alt me-1 address-icon-color"></i> {el.userAddress}</span></td>
                                                            <td><span className="text-xs">{el.userGender ? <i style={{ fontSize: 22 }} className="fas fa-male fx-2 gender-male"></i> : <i style={{ fontSize: 22 }} className="fas fa-female gender-female"></i>}</span></td>
                                                            <td>
                                                                <span className="text-secondary text-xs font-weight-bold px-3">
                                                                    {moment(el.createdDate).format('DD/MM/YYYY HH:mm:ss')}
                                                                </span>
                                                            </td>
                                                            <td className="">
                                                                <a href="/" onClick={(e) => handleDelClick(e, el.userId)} className="text-secondary font-weight-bold text-xs text-danger" data-toggle="tooltip" data-original-title="Delete customer">
                                                                    <i className="fas fa-trash-alt  me-1"></i> Delete
                                                                </a>
                                                            </td>
                                                        </tr>
                                                ) : handleLoadingStatus()
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </main>
        <Overlay
            show={showConfirmDelete}
            target={delTarget}
            placement="top"
            container={delRefContainer}
            containerPadding={20}
        >
            <Popover>
                <Popover.Header as="h6" className="text-xs">Confirm?</Popover.Header>
                <Popover.Body >
                    <p className="text-xs mb-2">Confirm delete customer</p>
                    <div className="d-flex align-items-center justify-content-end">
                        <div>
                            <Button onClick={() => setShowConfirmDelete(false)} style={{ minWidth: 35 }} size="small" variant="text"><span className="text-xs text-capitalize">No</span></Button>
                            <Button onClick={() => handleYesClick()} size="small" color="error" style={{ minWidth: 35 }} variant="text"><span className="text-xs text-capitalize">Yes</span></Button>
                        </div>
                    </div>
                </Popover.Body>
            </Popover>
        </Overlay>

        {loading && <Loader />}

    </>);
}