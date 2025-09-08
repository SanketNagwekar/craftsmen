import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { Spin } from 'antd';
import _ from 'lodash';
import NoData from "../../shared/sharedComponents/noData";
import { toast } from 'react-toastify';

import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Button from '@mui/material/Button';
// import Button from 'react-bootstrap/Button';

export default function MyBookings() {

    const [myBookings, setMyBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [toDelId, setToDelId] = useState(null);
    const [delTarget, setDelTarget] = useState(null);
    const delRefContainer = useRef(null);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = () => {
        setLoadingBookings(true);
        axios
            .get('/getCustomerBookings')
            .then(op => {
                console.log("I am list of all boookings", op)
                setMyBookings(op.data.result);
                // setMyBookings([]);
                setLoadingBookings(false);
            })
            .catch(e => {
                console.log("Exception: ", e);
                setLoadingBookings(false);
            })
    }

    const handleCancelClick = (event, id) => {
        console.log("handleCancelClick", id)
        event.preventDefault();
        setShowConfirmDelete(!showConfirmDelete);
        setDelTarget(event.target);
        setToDelId(id);
        console.log("I am toDelId: ", toDelId)
    };

    const handleYesClick = () => {
        console.log("handleYesClick")
        setLoading(true);
        axios
            .delete(`/cancelBooking?i=${toDelId}`)
            .then(op => {
                console.log("I am output::", op);
                loadBookings()
                setLoading(false);
                if (!_.isEmpty(op) && !_.isEmpty(op.data) && op.data.message === 'BOOKING_CANCELLED') {
                    // loadList();
                    toast.success('Booking Cancelled successfully', {
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
            })
    }

    return (<>
        <main id="main">
            <section className="breadcrumbs">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>My Bookings</h2>
                        <ol>
                            <li><a href="/">Home</a></li>
                            <li>My Bookings</li>
                        </ol>
                    </div>
                </div>
            </section>

            <section id="about" className="about">
                <div className="container">

                    <div className="section-title" data-aos="fade-up">
                        <h2>List of all bookings made by you</h2>
                    </div>

                    <div className="row content">
                        <div className="col-lg-12" data-aos="fade-up" data-aos-delay="150" ref={delRefContainer}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Booking Id</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Contractor</th>
                                        <th scope="col">Service</th>
                                        <th scope="col">From Date</th>
                                        <th scope="col">To Date</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loadingBookings ?
                                            <tr>
                                                <td className="text-center border-0" colSpan={7}>
                                                    <div className="py-5 bg-light">
                                                        <Spin />
                                                        <h5 className="mt-3 fw-normal text-black-50">Loading Data</h5>
                                                    </div>
                                                </td>
                                            </tr>
                                            :
                                            <>
                                                {
                                                    _.isEmpty(myBookings) ?
                                                        <>
                                                            <tr><td className="text-center border-0" colSpan={7}><NoData noDataTitle={'No bookings made by you'} /></td></tr>
                                                        </> : <>{

                                                            (myBookings) && myBookings.map((el) =>
                                                                <tr>
                                                                    <td>{el.bookingId}</td>
                                                                    <td>{el.userName}</td>
                                                                    <td>{el.contractorName}</td>
                                                                    <td>{el.serviceTitle}</td>
                                                                    <td>{dayjs(el.bookingDateTimeFrom).format('DD-MM-YYYY HH:MM')}</td>
                                                                    <td>{dayjs(el.bookingDateTimeTo).format('DD-MM-YYYY HH:MM')}</td>
                                                                    <td>{el.discountPrice}</td>
                                                                    <td>{el.bookingStatus}</td>
                                                                    <td>
                                                                        {/* <a href="/" className="text-secondary font-weight-bold text-xs text-danger" data-toggle="tooltip" data-original-title="Edit user">
                                                                            <i className="fas fa-trash-alt  me-1"></i> Cancel
                                                                        </a> */}
                                                                        <Button variant="outlined" loading  color="error" type="primary" disabled={el.bookingStatus == 'CANCEL'} onClick={(e) => handleCancelClick(e, el.bookingId)} ><i className="fas fa-trash-alt  me-1"></i> Cancel</Button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }</>
                                                }
                                            </>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </section>


        </main>
        <Overlay
            show={showConfirmDelete}
            target={delTarget}
            placement="left"
            container={delRefContainer}
            containerPadding={20}
        >
            <Popover>
                <Popover.Header as="h6" className="text-xs">Confirm?</Popover.Header>
                <Popover.Body className="pb-2">
                    <p className="text-xs mb-2">Confirm cancel booking</p>
                    <div className="d-flex align-items-center justify-content-end">
                        <div>
                            <Button onClick={() => setShowConfirmDelete(false)} style={{ minWidth: 35 }} size="small" variant="text"><span className="text-xs text-capitalize">No</span></Button>
                            <Button onClick={() => handleYesClick()} size="small" color="error" style={{ minWidth: 35 }} variant="text"><span className="text-xs text-capitalize">Yes</span></Button>
                        </div>
                    </div>
                </Popover.Body>
            </Popover>
        </Overlay>
    </>);
}