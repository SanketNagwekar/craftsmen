import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import Footer from "../../shared/layout/commonAssets/footer";
import SubHeading from "../../shared/layout/commonAssets/subHeading";
import { NavLink } from 'react-router-dom';
import waves from '../../assets/img/waves-white.svg';
import booking from '../../assets/img/booking.png';
import axios from "../../shared/helper/apiHelper";


export default function Dashboard() {

    const [counts, setCounts] = useState(null);

    useEffect(() => {
        axios
            .get(`/getDashboardCount`)
            .then(op => {
                if (op && op.data && op.data.result) {
                    setCounts(op.data.result[0]);
                }
            })
            .catch(e => {
                console.log("Exception: ", e);
            })
    }, []);

    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Dashboard - Craftsmen</title>
        </Helmet>

        <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">

            <SubHeading
                mainApp={'Craftsmen'}
                pageBreadcrumb={'Dashboard'}
                pageTitle={'Craftsmen Dashboard'}
            />

            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Today's Bookings</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                {(counts && counts.bookingcount) ? counts.bookingcount : '-'}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-4 text-end">
                                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                            {/* <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i> */}
                                            <i class="fas fa-calendar-week text-lg opacity-10"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Total Customers</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                {(counts && counts.customercount) ? counts.customercount : '-'}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-4 text-end">
                                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                            {/* <i className="ni ni-world text-lg opacity-10" aria-hidden="true"></i> */}
                                            <i class="fas fa-users text-lg opacity-10"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Total Contractors</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                {(counts && counts.contractorcount) ? counts.contractorcount : '-'}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-4 text-end">
                                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                            {/* <i className="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true"></i> */}
                                            <i class="fas fa-users-cog text-lg opacity-10"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Total Services</p>
                                            <h5 className="font-weight-bolder mb-0">
                                                {(counts && counts.servicecount) ? counts.servicecount : '-'}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-4 text-end">
                                        <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                            {/* <i className="ni ni-cart text-lg opacity-10" aria-hidden="true"></i> */}
                                            <i class="fas fa-tools text-lg opacity-10"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-7 mb-lg-0 mb-4">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="d-flex flex-column h-100">
                                            <p className="mb-1 pt-2 text-bold">Bookings</p>
                                            <h5 className="font-weight-bolder">Bookings Made By Customers</h5>
                                            <p className="mb-5">Here you will get all the list of bookings made by customer for the services that you offer</p>
                                            <NavLink className="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto" to="/bookings-list">
                                                All Bookings
                                                <i className="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                                            </NavLink>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                                        <div className="bg-gradient-primary border-radius-lg h-100">
                                            <img src={waves} className="position-absolute h-100 w-50 top-0 d-lg-block d-none" alt="waves" />
                                            <div className="position-relative d-flex align-items-center justify-content-center h-100">
                                                <img className="position-relative z-index-2 pt-4" style={{ width: 230 }} src={booking} alt="rocket" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="card h-100 p-3">
                            <div className="overflow-hidden position-relative border-radius-lg bg-cover h-100">
                                <span className="mask bg-gradient-dark"></span>
                                <div className="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                                    <h5 className="text-white font-weight-bolder mb-4 pt-2">About Craftsmen</h5>
                                    <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of.</p>
                                    {/* <a className="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto" href="/">
                                        Read More
                                        <i className="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <Footer />
            </div>
        </main>
















    </>);
}