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

export default function EditServiceType({ openEditServiceDialog, setOpenEditServiceDialog, setLoading, loadList, editRecord }) {

    const [serviceType, setServiceType] = useState(editRecord.serviceType);
    const simpleValidator = useRef(new SimpleReactValidator())

    const handleClose = () => {
        setOpenEditServiceDialog(false);
    };

    const handleServiceTypeChange = (e) => {
        setServiceType(e.target.value);
    }

    const handleSaveClick = () => {

        if (simpleValidator.current.allValid()) {
            let postBody = {
                "serviceType": serviceType
            }
            setLoading(true);
            axios
                .put(`/updateServiceType?i=${editRecord.serviceTypeId}`, postBody)
                .then(op => {
                    setLoading(false);
                    if (!_.isEmpty(op) && !_.isEmpty(op.data) && op.data.message === 'SERVICE_TYPE_UPDATED') {
                        toast.success('Service type updated successfully', {
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
                Edit Service Type
            </BootstrapDialogTitle>

            <DialogContent dividers>
                <div className="mb-3">
                    <label htmlFor="serviceType" className="form-label">Service Type</label>
                    <input
                        value={serviceType}
                        onChange={handleServiceTypeChange}
                        type="text"
                        className="form-control"
                        id="serviceType"
                        placeholder="Enter Service Type"
                        onBlur={() => simpleValidator.current.showMessageFor('serviceType')}
                    />
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('serviceType', serviceType, 'required')}
                </div>
            </DialogContent>
            <DialogActions>
                {/* <Button autoFocus onClick={handleClose}>
                    Save changes
                </Button> */}
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

