import React from "react";
import { useNavigate } from "react-router-dom";

export default function SubHeading({ mainApp, pageBreadcrumb, pageTitle }) {

    const navigate = useNavigate();

    const handleLogoutClick = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/login');

    }

    return (
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky" id="navbarBlur" navbar-scroll="true">

            <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent mb-2 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="/">{mainApp}</a></li>
                        <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{pageBreadcrumb}</li>
                    </ol>
                    {/* <h6 className="font-weight-bolder mb-0">{pageTitle}</h6> */}
                </nav>
                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                        <div className="input-group">
                            {/* <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
                            <input type="text" className="form-control" placeholder="Type here..." /> */}
                        </div>
                    </div>
                    <ul className="navbar-nav  justify-content-end">

                        {/* <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                            <a href="/" className="nav-link text-body p-0" id="iconNavbarSidenav">
                                <div className="sidenav-toggler-inner">
                                    <i className="sidenav-toggler-line"></i>
                                    <i className="sidenav-toggler-line"></i>
                                    <i className="sidenav-toggler-line"></i>
                                </div>
                            </a>
                        </li> */}
                        {/* <li className="nav-item px-3 d-flex align-items-center">
                            <a href="/" className="nav-link text-body p-0">
                                <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                            </a>
                        </li>
                        <li className="nav-item dropdown pe-3 d-flex align-items-center">
                            <a href="/" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-bell cursor-pointer"></i>
                            </a>
                        </li> */}
                        <li className="nav-item d-flex align-items-center">
                            <a href={'#'} className="nav-link text-body font-weight-bold px-0" onClick={handleLogoutClick}>
                                {/* <i className="fa fa-user me-sm-1"></i> */}
                                <i className="fas fa-sign-out-alt"></i>
                                {/* <span className="d-sm-inline d-none">Log out</span> */}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}