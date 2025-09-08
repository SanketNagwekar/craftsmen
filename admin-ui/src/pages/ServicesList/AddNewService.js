import React, { useState, useRef, useEffect } from "react";
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

export default function AddNewService({ openAddNewServiceDialog, setOpenAddNewServiceDialog, setLoading, loadList }) {

    const [serviceType, setServiceType] = useState('');
    const [serviceTitle, setServiceTitle] = useState('');
    const [serviceExcerpt, setServiceExcerpt] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [serviceTypeList, setServiceTypeList] = useState([]);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [file, setFile] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get('/getServicesTypeList')
            .then(op => {
                setLoading(false);
                if (!_.isEmpty(op) && !_.isEmpty(op.data) && !_.isEmpty(op.data.result)) {
                    setServiceTypeList(op.data.result);
                }
            })
            .catch(e => { console.log("Exception:", e); setLoading(false); })
    }, [])

    const handleClose = () => { setOpenAddNewServiceDialog(false); }

    const handleServiceTypeChange = (e) => { setServiceType(e.target.value) }
    const handleServiceTitleChange = (e) => { setServiceTitle(e.target.value) }
    const handleServiceExcerptChange = (e) => { setServiceExcerpt(e.target.value) }
    const handleServiceDescriptionChange = (e) => { setServiceDescription(e.target.value) }

    const handleAddClick = async () => {

        if (simpleValidator.current.allValid()) {
            let fileUrl = await uploadFile();
            console.log("I am file")
            let postBody = {
                "serviceTypeId": parseInt(serviceType),
                "serviceTitle": serviceTitle,
                "serviceDescription": serviceDescription,
                "serviceExcept": serviceExcerpt,
                "serviceImage": fileUrl
            }
            setLoading(true);
            axios
                .post(`/addNewService`, postBody)
                .then(op => {
                    setLoading(false);
                    if (!_.isEmpty(op) && !_.isEmpty(op.data) && op.data === 'SERVICE_CREATED') {
                        toast.success('Service added successfully', {
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


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const uploadFile = () => {
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem("__t")}`
                },
            };
            setLoading(true);
            return axios
                .post('/uploadFile', formData, config)
                .then(op => {
                    setLoading(false);
                    if (op && op.data && op.data.message === "IMAGE_UPLOADED") {
                        return (op.data.result);
                    }
                })
                .catch(e => {
                    console.log("Exception: ", e);
                    setLoading(false);
                })
        }
        else {
            return profilePict;
        }
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={openAddNewServiceDialog}
            maxWidth="sm"
        >
            <BootstrapDialogTitle onClose={handleClose}>
                Add new service
            </BootstrapDialogTitle>

            <DialogContent dividers>
                <div className="mb-3">
                    <label htmlFor="serviceType" className="form-label">Service type</label>
                    <Form.Select
                        aria-label="service-type"
                        value={serviceType}
                        onChange={handleServiceTypeChange}
                        onBlur={() => simpleValidator.current.showMessageFor('serviceType')}
                    >
                        <option value={''}>Select service type</option>
                        {
                            !_.isEmpty(serviceTypeList) && serviceTypeList.map((el, index) => <option key={`${el.serviceType}-${el.serviceTypeId}`} value={el.serviceTypeId}>{el.serviceType}</option>)
                        }
                    </Form.Select>
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('serviceType', serviceType, 'required')}
                </div>

                <div className="mb-3">
                    <label htmlFor="serviceTitle" className="form-label">Service title</label>
                    <input
                        value={serviceTitle}
                        onChange={handleServiceTitleChange}
                        type="text"
                        className="form-control"
                        id="serviceTitle"
                        placeholder="Enter service title"
                        onBlur={() => simpleValidator.current.showMessageFor('serviceTitle')}
                    />
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('serviceTitle', serviceTitle, 'required')}
                </div>
                <div className="mb-3">
                    <label htmlFor="serviceExcerpt" className="form-label">Service excerpt</label>
                    <textarea
                        value={serviceExcerpt}
                        onChange={handleServiceExcerptChange}
                        className="form-control"
                        id="serviceExcerpt"
                        placeholder="Enter service excerpt"
                        onBlur={() => simpleValidator.current.showMessageFor('serviceExcerpt')}
                    />
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('serviceExcerpt', serviceExcerpt, 'required')}
                </div>
                <div className="mb-3">
                    <label htmlFor="serviceDescription" className="form-label">Service description</label>
                    <textarea
                        value={serviceDescription}
                        onChange={handleServiceDescriptionChange}
                        className="form-control"
                        id="serviceDescription"
                        placeholder="Enter service description"
                        onBlur={() => simpleValidator.current.showMessageFor('serviceDescription')}
                    />
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('serviceDescription', serviceDescription, 'required')}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="serviceImage" className="form-label">Service Image</label>
                    <input className="form-control" onChange={handleFileChange} type="file" id="serviceImage" accept="image/png, image/jpeg, image/jpg" />
                </div>
            </DialogContent>
            <DialogActions>
                {/* <Button autoFocus onClick={handleClose}>
                    Save changes
                </Button> */}
                <button
                    onClick={handleAddClick}
                    type="button"
                    // disabled={!serviceType}
                    className="btn-xs mb-0 py-2 px-3 text-capitalize btn bg-gradient-dark mb-0"
                >
                    <i className="fas fa-plus-circle me-1"></i> Save
                </button>
            </DialogActions>
        </BootstrapDialog>
    );
}

