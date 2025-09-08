import React from "react";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Sidebar from "./commonAssets/sidebar";

export default function MainLayout() {

    return (
        <React.Fragment>
            <Sidebar />
            <Outlet />
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
            {/* <ToastContainer /> */}
        </React.Fragment>
    );
}