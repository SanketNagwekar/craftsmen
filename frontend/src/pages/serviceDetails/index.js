import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getImagePath } from '../../shared/helper/genHelper';
import _ from 'lodash';
import { Skeleton } from "antd";
import BookServiceModal from "./BookServiceModal";

export default function ServiceDetails() {

    const { id } = useParams();
    const [serviceDetails, setServiceDetails] = useState({});
    const [bookNowModalOpen, setBookNowModalOpen] = useState(false);
    const [selectedObj, setSelectedObj] = useState({});
    const [loadingService, setLoadingService] = useState(false);


    useEffect(() => {
        getServiceDetail(id);
    }, [id]);

    const getServiceDetail = (serviceId) => {
        setLoadingService(true);
        axios
            .get(`/getServicePrice?i=${serviceId}`)
            .then(op => {
                setLoadingService(false);
                if (op && op.data && op.data.result) {
                    setServiceDetails(op.data.result);
                }
            })
            .catch(e => { console.log("Exception:", e); setLoadingService(false); })
    }

    const handleBookClick = (contractorId, servicePriceId) => {
        setBookNowModalOpen(true);
        setSelectedObj({ contractorId: contractorId, servicePriceId: servicePriceId });
    }

    return (

        <main id="main">
            <section id="breadcrumbs" className="breadcrumbs">
                <div className="container">

                    <div className="d-flex justify-content-between align-items-center">
                        <h2>{loadingService ? <Skeleton.Input size="small" active /> : serviceDetails.serviceTitle}</h2>
                        <ol>
                            <li><a href="index.html">Home</a></li>
                            <li>{loadingService ? <Skeleton.Input size="small" active /> : serviceDetails.serviceTitle}</li>
                        </ol>
                    </div>
                </div>
            </section>

            <section id="portfolio-details" className="portfolio-details">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-8">
                            <div className="portfolio-details-slider swiper">
                                <div className="swiper-wrapper align-items-center">
                                    <div className="swiper-slide">
                                        {loadingService ? <Skeleton.Image style={{ width: '90vmin', height: '450px' }} block={true} active={true} /> :
                                            <img src={getImagePath(serviceDetails.serviceImage)} alt="Service Image" />
                                        }
                                    </div>
                                </div>
                                <div className="swiper-pagination"></div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="portfolio-info">
                                <h3>Service Details</h3>
                                <ul>
                                    <li><strong>Service Type</strong>: {loadingService ? <Skeleton.Input size="small" active /> : serviceDetails.serviceType}</li>
                                </ul>
                                <div className="card">
                                    <div className="card-header text-center bg-white">
                                        Prices for service
                                    </div>
                                    {loadingService ? <div className="p-3"><Skeleton active /></div> :
                                        !_.isEmpty(serviceDetails.prices) && serviceDetails.prices.map((el, index) =>
                                            <div key={`service${index}`} className="card-body mb-0 prices-container">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div>
                                                        <div className="card-title mb-0 text-decoration-line-through text-muted" style={{ fontSize: 12 }}><i className="fas fa-rupee-sign"></i> {el.unitPrice} </div>
                                                        <div className="card-title mb-0" style={{ color: '#B12704', fontSize: 18 }}><i className="fas fa-rupee-sign"></i> {el.discountPrice} <span className="fw-lighter" style={{ fontSize: 12 }}>(<i className="fas fa-rupee-sign"></i> {el.discountPrice} / {el.unit})</span></div>
                                                        <p className="card-text fw-lighter text-muted mb-0" style={{ fontSize: 12 }}>By : <span className="text-uppercase text-secondary fw-normal">{el.contractorName}</span></p>
                                                    </div>
                                                    <div>
                                                        <a onClick={() => handleBookClick(el.contractorId, el.servicePriceId)} className="btn btn-buy" style={{ "--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".5rem", "--bs-btn-font-size": ".75rem" }} ><i className="fas fa-calendar-alt me-1"></i> Book</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="portfolio-description">
                                <h2>Service Description</h2>
                                <p>{loadingService ? <><Skeleton active /></> : serviceDetails.serviceDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {bookNowModalOpen && <BookServiceModal
                selectedObj={selectedObj}
                id={id}
                setBookNowModalOpen={setBookNowModalOpen}
                bookNowModalOpen={bookNowModalOpen}
            />}

        </main>
    );
}