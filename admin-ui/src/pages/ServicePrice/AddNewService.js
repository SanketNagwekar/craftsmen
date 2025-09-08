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
    const [contractor, setContractor] = useState('');
    const [unit, setUnit] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');

    const [serviceTypeList, setServiceTypeList] = useState([]);
    const [contractorList, setContractorList] = useState([]);
    const simpleValidator = useRef(new SimpleReactValidator());

    useEffect(() => {
        setLoading(true);
        axios
            .get('/getServicesList')
            .then(op => {
                setLoading(false);
                if (!_.isEmpty(op) && !_.isEmpty(op.data) && !_.isEmpty(op.data.result)) {
                    setServiceTypeList(op.data.result);
                }
            })
            .catch(e => { console.log("Exception:", e); setLoading(false); })

        axios
            .get('/getContractorsList')
            .then(op => {
                setLoading(false);
                if (!_.isEmpty(op) && !_.isEmpty(op.data) && !_.isEmpty(op.data.result)) {
                    setContractorList(op.data.result);
                }
            })
            .catch(e => { console.log("Exception:", e); setLoading(false); })
    }, [])

    const handleClose = () => { setOpenAddNewServiceDialog(false); }

    const handleServiceTypeChange = (e) => { setServiceType(e.target.value) }
    const handleContractorChange = (e) => { setContractor(e.target.value) }
    const handleUnitChange = (e) => { setUnit(e.target.value) }
    const handleUnitPriceChange = (e) => { setUnitPrice(e.target.value) }
    const handleDiscountPriceChange = (e) => { setDiscountPrice(e.target.value) }

    const handleAddClick = async () => {

        if (simpleValidator.current.allValid()) {

            let postBody = {
                "serviceId": parseInt(serviceType),
                "contractorId": parseInt(contractor),
                "unit": unit,
                "unitPrice": parseFloat(unitPrice),
                "discountPrice": parseFloat(discountPrice)
            }
            setLoading(true);
            axios
                .post(`/addNewServicePrice`, postBody)
                .then(op => {
                    setLoading(false);
                    if (!_.isEmpty(op) && !_.isEmpty(op.data) && op.data === 'SERVICE_PRICES_CREATED') {
                        toast.success('Service price added successfully', {
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
            open={openAddNewServiceDialog}
            maxWidth="sm"
        >
            <BootstrapDialogTitle onClose={handleClose}>
                Add new service price
            </BootstrapDialogTitle>

            <DialogContent dividers>
                <div className="mb-3">
                    <label htmlFor="service" className="form-label">Service</label>
                    <Form.Select
                        aria-label="service"
                        value={serviceType}
                        onChange={handleServiceTypeChange}
                        onBlur={() => simpleValidator.current.showMessageFor('service')}
                    >
                        <option value={''}>Select service</option>
                        {
                            !_.isEmpty(serviceTypeList) && serviceTypeList.map((el, index) => <option key={`${el.serviceTitle}-${el.serviceId}`} value={el.serviceId}>{el.serviceTitle}</option>)
                        }
                    </Form.Select>
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('service', serviceType, 'required')}
                </div>

                <div className="mb-3">
                    <label htmlFor="contractor" className="form-label">Contractor</label>
                    <Form.Select
                        aria-label="contractor"
                        value={contractor}
                        onChange={handleContractorChange}
                        onBlur={() => simpleValidator.current.showMessageFor('contractor')}
                    >
                        <option value={''}>Select contractor</option>
                        {
                            !_.isEmpty(contractorList) && contractorList.map((el, index) => <option key={`${el.contractorName}-${el.contractorId}`} value={el.contractorId}>{el.contractorName}</option>)
                        }
                    </Form.Select>
                    {!_.isEmpty(simpleValidator.current) && simpleValidator.current.message('contractor', contractor, 'required')}
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

