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
import AddNewService from "./AddNewService";
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { toast } from 'react-toastify';
import EditService from "./EditService";

export default function ServicePrice() {

    const [servicesList, setServicesList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [delTarget, setDelTarget] = useState(null);
    const [toDelId, setToDelId] = useState(null);
    const delRefContainer = useRef(null);

    const [openAddNewServiceDialog, setOpenAddNewServiceDialog] = useState(false);
    const [openEditServiceDialog, setOpenEditServiceDialog] = useState(false);

    const [editRecord, setEditRecord] = useState(null);

    useEffect(() => {
        loadList();
    }, []);

    const loadList = () => {
        setLoading(true);
        axios
            .get('/getServicePriceList')
            .then(op => {
                // console.log("I am output::", op);
                setLoading(false);
                if (!_.isEmpty(op) && !_.isEmpty(op.data) && !_.isEmpty(op.data.result)) {
                    setServicesList(op.data.result);
                }
            })
            .catch(e => {
                console.log("Exception: ", e);
                setLoading(false);
            })
    }

    const handleAddClick = () => {
        setOpenAddNewServiceDialog(true);
    }

    const handleLoadingStatus = () => {
        let dataStatus = "";
        if (loading) {
            dataStatus = <div className="text-center my-2">Loading Data...</div>;
        }
        else {
            dataStatus = <NoData handleButtonClick={handleAddClick} btnText={'Add new service price'} imageWidth={'110px'} noDataTitle={'No Data Found'} noDataText={'We did not find any service price created. You can add new by clicking on below button'} />;
        }
        return (<tr><td colSpan={5}>{dataStatus}</td></tr>);
    }

    const handleDelClick = (event, id) => {
        event.preventDefault();
        setShowConfirmDelete(!showConfirmDelete);
        setDelTarget(event.target);
        setToDelId(id);
    };

    const handleEditClick = (e, el) => {
        e.preventDefault();
        setEditRecord(el);
        setOpenEditServiceDialog(true);
    }

    const handleYesClick = () => {
        setLoading(true);
        axios
            .delete(`/deleteServicePrice?i=${toDelId}`)
            .then(op => {
                // console.log("I am output::", op);
                setLoading(false);
                if (!_.isEmpty(op) && !_.isEmpty(op.data) && op.data.message === 'SERVICE_PRICE_DELTED') {
                    loadList();
                    toast.success('Service price deleted successfully', {
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
            <title>Service Price List- Craftsmen</title>
        </Helmet>
        <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
            <SubHeading
                mainApp={'Craftsmen'}
                pageBreadcrumb={'Service Price'}
                pageTitle={'Service Price List'}
            />
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                                <h6 className="font-weight-bolder">Service Price List</h6>
                                <button onClick={handleAddClick} type="button" className="btn btn-outline-primary btn-xs mb-0 py-2 px-3 text-capitalize"><i className="fas fa-plus-circle me-1"></i> New</button>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive p-0" ref={delRefContainer}>
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Service Title</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Contractor</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Price</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Unit</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created On</th>
                                                <th className="text-secondary opacity-7"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                !_.isEmpty(servicesList) ? servicesList.map(
                                                    (el, index) =>
                                                        <tr key={`service-${el.servicePriceId}-${index}`}>
                                                            <td><span className="px-3 text-xs">{el.servicePriceId}</span></td>
                                                            <td><span className="text-xs">{el.serviceTitle}</span></td>
                                                            <td><span className="text-xs">{el.contractorName}</span></td>
                                                            <td>
                                                                {/* <span className="text-xs">{el.discountPrice}{el.unitPrice}</span> */}
                                                                <div className="text-xs">
                                                                    <div><b>Unit Price: </b><span className="text-decoration-line-through">{el.unitPrice}</span></div>
                                                                    <div className="text-success"><b>Discount: </b>{el.discountPrice}</div>
                                                                </div>
                                                            </td>
                                                            <td><span className="text-xs">{el.unit}</span></td>
                                                            <td>
                                                                <span className="text-secondary text-xs font-weight-bold px-3">
                                                                    {moment(el.createdDate).format('DD/MM/YYYY HH:mm:ss')}
                                                                </span>
                                                            </td>
                                                            <td className="">
                                                                <a href="/" onClick={(e) => handleEditClick(e, el)} className="text-secondary font-weight-bold text-xs me-3 border-end pe-3" data-toggle="tooltip" data-original-title="Edit service price">
                                                                    <i className="fas fa-edit me-1"></i> Edit
                                                                </a>
                                                                <a href="/" onClick={(e) => handleDelClick(e, el.servicePriceId)} className="text-secondary font-weight-bold text-xs text-danger" data-toggle="tooltip" data-original-title="Delete service price">
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
                    <p className="text-xs mb-2">Confirm delete service price</p>
                    <div className="d-flex align-items-center justify-content-end">
                        <div>
                            <Button onClick={() => setShowConfirmDelete(false)} style={{ minWidth: 35 }} size="small" variant="text"><span className="text-xs text-capitalize">No</span></Button>
                            <Button onClick={() => handleYesClick()} size="small" color="error" style={{ minWidth: 35 }} variant="text"><span className="text-xs text-capitalize">Yes</span></Button>
                        </div>
                    </div>
                </Popover.Body>
            </Popover>
        </Overlay>

        {openAddNewServiceDialog && <AddNewService
            setOpenAddNewServiceDialog={setOpenAddNewServiceDialog}
            openAddNewServiceDialog={openAddNewServiceDialog}
            setLoading={setLoading}
            loadList={loadList}
        />}

        {openEditServiceDialog && <EditService
            setOpenEditServiceDialog={setOpenEditServiceDialog}
            openEditServiceDialog={openEditServiceDialog}
            setLoading={setLoading}
            loadList={loadList}
            editRecord={editRecord}
        />}

        {loading && <Loader />}

    </>);
}