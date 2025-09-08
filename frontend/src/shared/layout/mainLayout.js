import React from "react";
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from "./commonAssets/header";
import Home from "../../pages/Home";
import Footer from "./commonAssets/footer";
import AboutUs from "../../pages/About";
import ContactUs from "../../pages/ContactUs";
import ServiceDetails from "../../pages/serviceDetails";
import MyBookings from '../../pages/MyBookings';


export default function MainLayout() {
    return (
        <>
            <Header />
            <Routes>
                <Route>
                    <Route index element={<Home />} />
                    <Route path="about-us" element={<AboutUs />} />
                    <Route path="contact-us" element={<ContactUs />} />
                    <Route path="service-details/:id" element={<ServiceDetails />} />
                    <Route path="my-bookings" element={<MyBookings />} />
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={true}
                draggable={false}
                pauseOnHover={true}
                theme="colored"
            />
            <Footer />
        </>
    );
}