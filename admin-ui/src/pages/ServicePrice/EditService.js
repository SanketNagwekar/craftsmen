import React, { useEffect, useState, useRef } from "react";
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
import Form from 'react-bootstrap/Form';

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

export default function EditServiceType({ openEditServiceDialog, setOpenEditServiceDialog, setLoading, loadList, editRecord }) {

    const [serviceType, setServiceType] = useState(editRecord.serviceTitle);
    const [contractor, setContractor] = useState(editRecord.contractorName);
    const [unit, setUnit] = useState(editRecord.unit);
    const [unitPrice, setUnitPrice] = useState(editRecord.unitPrice);
    const [discountPrice, setDiscountPrice] = useState(editRecord.discountPrice);

    const simpleValidator = useRef(new SimpleReactValidator());

    const handleClose = () => {
        setOpenEditServiceDialog(false);
    };

    const handleUnitChange = (e) => { setUnit(e.target.value) }
    const handleUnitPriceChange = (e) => { setUnitPrice(e.target.value) }
    const handleDiscountPriceChange = (e) => { setDiscountPrice(e.target.value) }

    const handleSaveClick = async () => {
        if (simpleValidator.current.allValid()) {
            let postBody = {
                "unit": unit,
                "unitPrice": parseFloat(unitPrice),
                "discountPrice": parseFloat(discountPrice)
            }
            setLoading(true);
            axios
                .put(`/updateServicePrice?i=${editRecord.servicePriceId}`, postBody)
                .then(op => {
                    setLoading(false);
                    if (!_.isEmpty(op) && !_.isEmpty(op.data) && op.data.message === 'SERVICE_PRICE_UPDATED') {
                        toast.success('Service updated successfully', {
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
            open={openEditServiceDialog}
            maxWidth="sm"
        >
            <BootstrapDialogTitle onClose={handleClose}>
                Edit service price
            </BootstrapDialogTitle>

            <DialogContent dividers>
                <div className="mb-3">
                    <label htmlFor="service" className="form-label">Service</label>
                    <input
                        value={serviceType}
                        disabled
                        type="text"
                        className="form-control"
                        id="service"
                        placeholder="Enter service"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contractor" className="form-label">Contractor</label>
                    <input
                        value={contractor}
                        disabled
                        type="text"
                        className="form-control"
                        id="contractor"
                        placeholder="Enter contractor"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="unit" className="form-label">Unit</label>
                    <input
                        value={unit}
                        onChange={handleUnitChange}
                        type="text"
                        className="form-control"
                        id="unit"
                        placeholder="Enter unit"
                        onBlur={() => simpleValidator.current.showMessageFor('unit')}
                    />
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('unit', unit, 'required')}
                </div>
                
                <div className="mb-3">
                    <label htmlFor="unitPrice" className="form-label">Unit price</label>
                    <input
                        type="text"
                        value={unitPrice}
                        onChange={handleUnitPriceChange}
                        className="form-control"
                        id="unitPrice"
                        placeholder="Enter unit price"
                        onBlur={() => simpleValidator.current.showMessageFor('unitPrice')}
                    />
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('unitPrice', unitPrice, 'required')}
                </div>
                <div className="mb-3">
                    <label htmlFor="discountPrice" className="form-label">Discount price</label>
                    <input
                        type="text"
                        value={discountPrice}
                        onChange={handleDiscountPriceChange}
                        className="form-control"
                        id="discountPrice"
                        placeholder="Enter discount price"
                        onBlur={() => simpleValidator.current.showMessageFor('discountPrice')}
                    />
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('discountPrice', discountPrice, 'required')}
                </div>
                
            </DialogContent>
            <DialogActions>
                <button
                    onClick={handleSaveClick}
                    type="button"
                    // disabled={!serviceType}
                    className="btn-xs mb-0 py-2 px-3 text-capitalize btn bg-gradient-dark mb-0"
                >
                    <i className="far fa-save me-1"></i> Save
                </button>
            </DialogActions>
        </BootstrapDialog>
    );
}

