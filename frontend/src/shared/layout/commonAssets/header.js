import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Spin } from 'antd';
import _ from 'lodash';
import axios from "axios";
import LoginModal from "../../sharedComponents/loginModal";
import ProfileSettings from "../../sharedComponents/profileSettings";
import { isUserLogin, getImagePath } from '../../helper/genHelper';
import craftsmenLogo from '../../../assets/img/craftsmen-logo.png';

export default function Header() {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
    const [customerDetails, setCustomerDetails] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCustomer();
    }, []);

    const getCustomer = async () => {
        if (isUserLogin()) {
            setLoading(true);
            axios
                .get('/getCustomerDetails', { headers: { 'Authorization': `Bearer ${localStorage.getItem("__t")}` } })
                .then(op => {
                    setLoading(false);
                    if (op && op.data && op.data.result) {
                        setCustomerDetails(op.data.result);
                    }
                })
                .catch(e => {
                    console.log("Exception:", e);
                    setLoading(false);
                })
        }
    }

    const openLoginModal = (e) => {
        e.preventDefault();
        setIsLoginOpen(true);
    }

    const handleProfileSettingsClick = (e) => {
        e.preventDefault();
        setIsProfileSettingsOpen(true);
    }

    const handleLogoutClick = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.reload();
    }

    return (

        <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">
                <div className="logo">
                    <NavLink to="/"><img src={craftsmenLogo} alt="Craftsmen Logo" className="img-fluid" /></NavLink>
                </div>
                <nav id="navbar" className="navbar">
                    <ul>
                        <li><NavLink className={(navData) => { return (navData.isActive ? 'active nav-link' : 'nav-link ') }} to="/">Home</NavLink></li>
                        <li><NavLink className={(navData) => { return (navData.isActive ? 'active nav-link' : 'nav-link ') }} to="/about-us">About Us</NavLink></li>
                        {/* <li><NavLink className={(navData) => { return (navData.isActive ? 'active nav-link' : 'nav-link ') }} to="/services">Services</NavLink></li> */}
                        <li><NavLink className={(navData) => { return (navData.isActive ? 'active nav-link' : 'nav-link ') }} to="/contact-us">Contact Us</NavLink></li>
                        {!isUserLogin() && <li><a className="getstarted scrollto" href="#" onClick={openLoginModal}>Login</a></li>}
                        {isUserLogin() && <li className="dropdown">
                            <a href="#">
                                {
                                    loading ? <Spin /> :
                                        <span>
                                            {
                                                customerDetails && customerDetails.userImage ?
                                                    <Avatar size="large" src={<img src={getImagePath(customerDetails.userImage)} alt={'avatar'} />} />
                                                    :
                                                    <Avatar size="large" icon={<i className="fas fa-user-circle text-secondary"></i>} />
                                            }
                                        </span>
                                }
                            </a>
                            <ul>
                                <li><a className={`dropdown-item ${loading ? 'disabled' : ''}`} onClick={handleProfileSettingsClick} href="#">Profile Settings</a></li>
                                <li><a href="/my-bookings">My Bookings</a></li>
                                <li><a onClick={handleLogoutClick} href="#">Logout</a></li>
                            </ul>
                        </li>}
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

            </div>
            {isLoginOpen &&
                <LoginModal
                    setIsLoginOpen={setIsLoginOpen}
                    isLoginOpen={isLoginOpen}
                />
            }
            {isProfileSettingsOpen &&
                <ProfileSettings
                    setIsProfileSettingsOpen={setIsProfileSettingsOpen}
                    isProfileSettingsOpen={isProfileSettingsOpen}
                    customerDetails={customerDetails}
                    getCustomer={getCustomer}
                />
            }
        </header>

    );
}