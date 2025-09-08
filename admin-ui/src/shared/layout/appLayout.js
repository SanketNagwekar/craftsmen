import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import MainLayout from './mainLayout';
import Login from '../../pages/Login';
import PageNotFound from '../../pages/pageNotFound';
import Dashboard from "../../pages/Dashboard";
import ServicesList from "../../pages/ServicesList";
import ServicesType from '../../pages/ServicesTypes';
import Contractor from '../../pages/Contractor';
import Customers from '../../pages/Customers';
import Bookings from '../../pages/Bookings';
import ServicePrice from '../../pages/ServicePrice';

/* And designs library */

const ProtectedRoute = ({ children }) => {
    let token = localStorage.getItem("__t");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children ? children : <Outlet />;
};

const UnProtectedRoute = ({ children }) => {
    let token = localStorage.getItem("__t");
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }
    return children ? children : <Outlet />;
};


export default function AppLayout() {

    // useEffect(()=>{
    //     console.log("I am appLayout")
    // },[])

    return (
        <Routes>
            <Route element={<UnProtectedRoute />}>
                <Route path="login" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="service-list" element={<ServicesList />} />
                    <Route path="customer-list" element={<Customers />} />
                    <Route path="bookings-list" element={<Bookings />} />
                    <Route path="service-price-list" element={<ServicePrice />} />
                    <Route path="service-type" element={<ServicesType />} />
                    <Route path="contractor-list" element={<Contractor />} />
                </Route>

            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}