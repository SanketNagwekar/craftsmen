import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import _ from 'lodash';
import axios from "../../shared/helper/apiHelper";
import { toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        width: 360
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function AddNewContractor({ openAddNewContractorDialog, setOpenAddNewContractorDialog, setLoading, loadList }) {

    const [contractorName, setContractorName] = useState('');
    const [contractorEmail, setContractorEmail] = useState('');
    const [contractorNumber1, setContractorNumber1] = useState('');
    const [contractorNumber2, setContractorNumber2] = useState('');
    const [contractorAddress, setContractorAddress] = useState('');


    const handleContractorAddressChange = (e) => { setContractorAddress(e.target.value); }
    const handleContractorEmailChange = (e) => { setContractorEmail(e.target.value); }
    const handleContractorNameChange = (e) => { setContractorName(e.target.value); }
    const handleContractorNumber1Change = (e) => { setContractorNumber1(e.target.value); }
    const handleContractorNumber2Change = (e) => { setContractorNumber2(e.target.value); }

    const simpleValidator = useRef(new SimpleReactValidator())

    const handleClose = () => {
        setOpenAddNewContractorDialog(false);
    };

    const handleAddClick = () => {

        if (simpleValidator.current.allValid()) {
            let postBody = {
                "contractorName": contractorName,
                "contractorAddress": contractorAddress,
                "contactNumber1": parseInt(contractorNumber1),
                "contactNumber2": parseInt(contractorNumber2),
                "contractorEmail": contractorEmail
            }
            setLoading(true);
            axios
                .post(`/addNewContractor`, postBody)
                .then(op => {
                    setLoading(false);
                    if (!_.isEmpty(op) && !_.isEmpty(op.data) && op.data === 'CONTRACTOR_CREATED') {
                        toast.success('Contractor created successfully', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        loadList();
                        handleClose();
                    }
                    else {
                        // Handle the errors here
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
        } else {
            simpleValidator.current.showMessages();
        }

    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={openAddNewContractorDialog}
            maxWidth="sm"
        >
            <BootstrapDialogTitle onClose={handleClose}>
                Add new contractor
            </BootstrapDialogTitle>

            <DialogContent dividers>

                <div className="mb-3">
                    <label htmlFor="contractorName" className="form-label">Contractor Name</label>
                    <input
                        value={contractorName}
                        onChange={handleContractorNameChange}
                        type="text"
                        className="form-control"
                        id="contractorName"
                        placeholder="Enter contractor name"
                        onBlur={() => simpleValidator.current.showMessageFor('contractorName')}
                    />
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('contractorName', contractorName, 'required')}
                </div>

                <div className="mb-3">
                    <label htmlFor="contractorEmail" className="form-label">Contractor Email</label>
                    <input
                        value={contractorEmail}
                        onChange={handleContractorEmailChange}
                        type="text"
                        className="form-control"
                        id="contractorEmail"
                        placeholder="Enter contractor email"
                        onBlur={() => simpleValidator.current.showMessageFor('contractorEmail')}
                    />
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('contractorEmail', contractorEmail, 'required')}
                </div>

                <div className="mb-3">
                    <label htmlFor="contractorNumber1" className="form-label">Contractor Contact Number 1</label>
                    <input
                        value={contractorNumber1}
                        onChange={handleContractorNumber1Change}
                        type="text"
                        className="form-control"
                        id="contractorNumber1"
                        placeholder="Enter contractor number 1"
                        onBlur={() => simpleValidator.current.showMessageFor('contractorNumber1')}
                    />
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('contractorNumber1', contractorNumber1, 'required')}
                </div>

                <div className="mb-3">
                    <label htmlFor="contractorNumber2" className="form-label">Contractor Contact Number 2</label>
                    <input
                        value={contractorNumber2}
                        onChange={handleContractorNumber2Change}
                        type="text"
                        className="form-control"
                        id="contractorNumber2"
                        placeholder="Enter contractor number 2"
                        onBlur={() => simpleValidator.current.showMessageFor('contractorNumber2')}
                    />
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('contractorNumber2', contractorNumber2, 'required')}
                </div>

                <div className="mb-3">
                    <label htmlFor="contractorAddress" className="form-label">Contractor Address</label>
                    <textarea
                        value={contractorAddress}
                        onChange={handleContractorAddressChange}
                        className="form-control"
                        id="contractorAddress"
                        placeholder="Enter contractor address"
                        onBlur={() => simpleValidator.current.showMessageFor('contractorAddress')}
                    />
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('contractorAddress', contractorAddress, 'required')}
                </div>

            </DialogContent>
            <DialogActions>
                <button
                    onClick={handleAddClick}
                    type="button"
                    className="btn-xs mb-0 py-2 px-3 text-capitalize btn bg-gradient-dark mb-0"
                >
                    <i className="fas fa-plus-circle me-1"></i> Save
                </button>
            </DialogActions>
        </BootstrapDialog>
    );
}

