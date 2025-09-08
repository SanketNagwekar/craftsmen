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


export default function Bookings() {

    const [bookingsList, setBookingsList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showCSDialogue, setShowCSDialogue] = useState(false);
    const [csTarget, setCSTarget] = useState(null);
    const [bookingRecord, setBookingRecord] = useState(null);
    const [bookingStatus, setBookingStatus] = useState(null);
    const delRefContainer = useRef(null);


    useEffect(() => {
        loadList();
    }, []);

    const loadList = () => {
        setLoading(true);
        axios
            .get('/getBookingsList')
            .then(op => {
                setLoading(false);
                if (!_.isEmpty(op) && !_.isEmpty(op.data) && !_.isEmpty(op.data.result)) {
                    setBookingsList(op.data.result);
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
            dataStatus = <NoData imageWidth={'110px'} noDataTitle={'No Data Found'} noDataText={'We did not find any Booking. This list will be populated once a customer does a booking via portal'} />;
        }
        return (<tr><td colSpan={8}>{dataStatus}</td></tr>);
    }

    const handleCSClick = (event, booking) => {
        event.preventDefault();
        setShowCSDialogue(!showCSDialogue);
        setCSTarget(event.target);
        setBookingRecord(booking);
        setBookingStatus(booking.bookingStatus);
    };

    const handleChangeClick = () => {
        setLoading(true);
        let bookingData = {
            "bookingStatus": bookingStatus
        };
        axios
            .put(`/updateBooking?i=${bookingRecord.bookingId}`, bookingData)
            .then(op => {
                setLoading(false);
                if (!_.isEmpty(op) && !_.isEmpty(op.data) && op.data.message === 'BOOKING_UPDATED') {
                    loadList();
                    toast.success('Booking updated successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setShowCSDialogue(false);
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

    const handleChangeStatus = (e) => {
        setBookingStatus(e.target.value);
    }


    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Bookings List- Craftsmen</title>
        </Helmet>
        <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
            <SubHeading
                mainApp={'Craftsmen'}
                pageBreadcrumb={'Bookings'}
                pageTitle={'Bookings List'}
            />
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                                <h6 className="font-weight-bolder">Bookings List</h6>
                                {/* <button onClick={handleAddClick} type="button" className="btn btn-outline-primary btn-xs mb-0 py-2 px-3 text-capitalize"><i className="fas fa-plus-circle me-1"></i> New</button> */}
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive p-0" ref={delRefContainer}>
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Name</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Contractor</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Bookings Date</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Service Name</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Unit Price</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                                <th className="text-secondary opacity-7"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                !_.isEmpty(bookingsList) ? bookingsList.map(
                                                    (el, index) =>
                                                        <tr key={`booking-${el.bookingId}-${index}`}>
                                                            <td><span className="px-3 text-xs">{el.bookingId}</span></td>
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
                                                            <td><div className="text-xs">{el.contractorName}</div></td>
                                                            <td>
                                                                <div className="text-xs">
                                                                    <div className="mb-2">
                                                                        <i class="fas fa-calendar-alt me-2 phone-icon-color"></i><b>From: </b>{moment(el.bookingDateTimeFrom).format("DD-MM-YYYY HH:mm")}
                                                                    </div>
                                                                    <div>
                                                                        <i class="fas fa-calendar-alt me-2 address-icon-color"></i><b>To: </b>{moment(el.bookingDateTimeTo).format("DD-MM-YYYY HH:mm")}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td><span className="text-xs"><i class="fas fa-toolbox me-1 gender-female"></i> {el.serviceTitle}</span></td>
                                                            <td>
                                                                <div className="text-xs">
                                                                    <div><b>Unit Price: </b><span className="text-decoration-line-through">{el.unitPrice}</span></div>
                                                                    <div className="text-success"><b>Discount: </b>{el.discountPrice}</div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="text-secondary text-xs font-weight-bold px-3">
                                                                    {el.bookingStatus}
                                                                </span>
                                                            </td>
                                                            <td className="">
                                                                <a href="/" onClick={(e) => handleCSClick(e, el)} className="font-weight-bold text-xs text-info" data-toggle="tooltip" data-original-title="Change Booking Status">
                                                                    <i className="fas fa-edit me-1"></i> Change Status
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
            show={showCSDialogue}
            target={csTarget}
            placement="top"
            container={delRefContainer}
            containerPadding={20}
        >
            <Popover>
                <Popover.Header as="h6" className="text-xs">Change Booking Status?</Popover.Header>
                <Popover.Body >
                    <p className="text-xs mb-2">Please select the booking status to update customer.</p>

                    <div className="mb-3">
                        <label for="booking-status" className="form-label">Booking Status</label>
                        <select id={'booking-status'} className="form-select" aria-label="Select Booking Status" value={bookingStatus} onChange={(e) => handleChangeStatus(e)}>
                            <option value={"CONFIRM"}>CONFIRM</option>
                            <option value="IN-PROGRESS">IN-PROGRESS</option>
                            <option value="PENDING">PENDING</option>
                            <option value="COMPLETE">COMPLETE</option>
                            <option value="CANCEL">CANCEL</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                        <div>
                            <Button onClick={() => setShowCSDialogue(false)} style={{ minWidth: 35 }} size="small" variant="text"><span className="text-xs text-capitalize">Cancel</span></Button>
                            <Button onClick={() => handleChangeClick()} size="small" color="error" style={{ minWidth: 35 }} variant="text"><span className="text-xs text-capitalize">Change Status</span></Button>
                        </div>
                    </div>
                </Popover.Body>
            </Popover>
        </Overlay>

        {loading && <Loader />}

    </>);
}