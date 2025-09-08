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
import AddNewContractor from "./AddNewContractor";
import EditContractor from "./EditContractor";
// import AddNewService from "./AddNewService";
// import EditService from "./EditService";
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { toast } from 'react-toastify';

import './style.css';


export default function Contractor() {

    const [contractorList, setContractorList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [delTarget, setDelTarget] = useState(null);
    const [toDelId, setToDelId] = useState(null);
    const delRefContainer = useRef(null);

    const [openAddNewContractorDialog, setOpenAddNewContractorDialog] = useState(false);
    const [openEditContractorDialog, setOpenEditContractorDialog] = useState(false);

    const [editRecord, setEditRecord] = useState(null);

    useEffect(() => {
        loadList();
    }, []);

    const loadList = () => {
        setLoading(true);
        axios
            .get('/getContractorsList')
            .then(op => {
                // console.log("I am output::", op);
                setLoading(false);
                if (!_.isEmpty(op) && !_.isEmpty(op.data) && !_.isEmpty(op.data.result)) {
                    setContractorList(op.data.result);
                }
            })
            .catch(e => {
                console.log("Exception: ", e);
                setLoading(false);
            })
    }

    const handleAddClick = () => {
        setOpenAddNewContractorDialog(true);
    }

    const handleLoadingStatus = () => {
        let dataStatus = "";
        if (loading) {
            dataStatus = <div className="text-center my-2">Loading Data...</div>;
        }
        else {
            dataStatus = <NoData handleButtonClick={handleAddClick} btnText={'Add new contractor'} imageWidth={'110px'} noDataTitle={'No Data Found'} noDataText={'We did not find any contractor created. You can add new by clicking on below button'} />;
        }
        return (<tr><td colSpan={7}>{dataStatus}</td></tr>);
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
        setOpenEditContractorDialog(true);
    }

    const handleYesClick = () => {
        setLoading(true);
        axios
            .delete(`/deleteContractor?i=${toDelId}`)
            .then(op => {
                // console.log("I am output::", op);
                setLoading(false);
                if (!_.isEmpty(op) && !_.isEmpty(op.data) && op.data.message === 'CONTRACTOR_DELTED') {
                    loadList();
                    toast.success('Contractor deleted successfully', {
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
            <title>Contractors List- Craftsmen</title>
        </Helmet>
        <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
            <SubHeading
                mainApp={'Craftsmen'}
                pageBreadcrumb={'Contractors'}
                pageTitle={'Contractors List'}
            />
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                                <h6 className="font-weight-bolder">Contractors List</h6>
                                <button onClick={handleAddClick} type="button" className="btn btn-outline-primary btn-xs mb-0 py-2 px-3 text-capitalize"><i className="fas fa-plus-circle me-1"></i> New</button>
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
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created On</th>
                                                <th className="text-secondary opacity-7"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                !_.isEmpty(contractorList) ? contractorList.map(
                                                    (el, index) =>
                                                        <tr key={`contractor-${el.contractorId}-${index}`}>
                                                            <td><span className="px-3 text-xs">{el.contractorId}</span></td>
                                                            <td><span className="text-xs">{el.contractorName}</span></td>
                                                            <td><div className="text-xs"><i className='bx bxs-phone-call me-1 phone-icon-color'></i> {el.contactNumber1}{!_.isEmpty(el.contactNumber2) && <div className="mt-2"><i className='bx bxs-phone-call me-1 phone-icon-color'></i> {el.contactNumber2}</div>}</div></td>
                                                            <td><span className="text-xs"><i className="fas fa-envelope-square me-1 mail-icon-color"></i> {el.contractorEmail}</span></td>
                                                            <td><span className="text-xs"><i className="fas fa-map-marker-alt me-1 address-icon-color"></i> {el.contractorAddress}</span></td>
                                                            <td>
                                                                <span className="text-secondary text-xs font-weight-bold px-3">
                                                                    {moment(el.createdDate).format('DD/MM/YYYY HH:mm:ss')}
                                                                </span>
                                                            </td>
                                                            <td className="">
                                                                <a href="/" onClick={(e) => handleEditClick(e, el)} className="text-secondary font-weight-bold text-xs me-3 border-end pe-3" data-toggle="tooltip" data-original-title="Edit contrator">
                                                                    <i className="fas fa-edit me-1"></i> Edit
                                                                </a>
                                                                <a href="/" onClick={(e) => handleDelClick(e, el.contractorId)} className="text-secondary font-weight-bold text-xs text-danger" data-toggle="tooltip" data-original-title="Delete contrator">
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
                    <p className="text-xs mb-2">Confirm delete contractor</p>
                    <div className="d-flex align-items-center justify-content-end">
                        <div>
                            <Button onClick={() => setShowConfirmDelete(false)} style={{ minWidth: 35 }} size="small" variant="text"><span className="text-xs text-capitalize">No</span></Button>
                            <Button onClick={() => handleYesClick()} size="small" color="error" style={{ minWidth: 35 }} variant="text"><span className="text-xs text-capitalize">Yes</span></Button>
                        </div>
                    </div>
                </Popover.Body>
            </Popover>
        </Overlay>

        {openAddNewContractorDialog && <AddNewContractor
            setOpenAddNewContractorDialog={setOpenAddNewContractorDialog}
            openAddNewContractorDialog={openAddNewContractorDialog}
            setLoading={setLoading}
            loadList={loadList}
        />}

        {openEditContractorDialog && <EditContractor
            setOpenEditContractorDialog={setOpenEditContractorDialog}
            openEditContractorDialog={openEditContractorDialog}
            setLoading={setLoading}
            loadList={loadList}
            editRecord={editRecord}
        />}

        {loading && <Loader />}

    </>);
}