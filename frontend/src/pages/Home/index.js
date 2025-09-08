import React, { useEffect, useState } from "react";
import heroImg from '../../assets/img/hero-img.png';
import { Spin } from 'antd';
import axios from "axios";
import _ from 'lodash';
import NoData from "../../shared/sharedComponents/noData";

import { getImagePath } from '../../shared/helper/genHelper';

export default function Home() {

    const [servicesList, setServicesList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('/getServicesList')
            .then(op => {
                // console.log("I am the op", op)
                setLoading(false);
                if (op && op.data && op.data.result) {
                    setServicesList(op.data.result);
                }
            })
            .catch(e => {
                console.log("Exception: ", e);
                setLoading(false);
            })
    }, []);


    return (
        <>
            <section id="hero" className="d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1 data-aos="fade-up">Grow your work done with Craftsmen</h1>
                            <h2 data-aos="fade-up" data-aos-delay="400">We are team of talented craftsmen making homes, places to amaze</h2>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left" data-aos-delay="200">
                            <img src={heroImg} className="img-fluid animated" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <main id="main">
                <section id="services" className="services">
                    <div className="container">

                        <div className="section-title" data-aos="fade-up">
                            <h2>Services</h2>
                            <p>Magnam dolores commodi suscipit eius consequatur ex aliquid fug</p>
                        </div>

                    </div>
                </section>


                <section id="more-services" className="more-services">
                    <div className="container">

                        <div className="row">
                            {
                                loading ? <div className="py-5 bg-light text-center"><Spin /><h5 className="mt-3 fw-normal text-black-50">Loading Services</h5></div>
                                    :
                                    <>
                                        {
                                            _.isEmpty(servicesList) ? <NoData noDataTitle={'No Data'} /> : <>{
                                                !_.isEmpty(servicesList) && servicesList.map((el) =>
                                                    <div key={`service-${el.serviceId}`} className="col-md-6 d-flex align-items-stretch  mb-4">
                                                        <div className="card" style={{ backgroundImage: `url(${getImagePath(el.serviceImage)})` }} data-aos="fade-up" data-aos-delay="100">
                                                            <div className="card-body">
                                                                <h5 className="card-title"><a href={`service-details/${el.serviceId}`}>{el.serviceTitle}</a></h5>
                                                                <p className="card-text">{el.serviceExcept}</p>
                                                                <div className="read-more"><a href={`service-details/${el.serviceId}`}><i className="bi bi-arrow-right"></i> Know More</a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            </>
                                        }
                                    </>
                            }
                        </div>

                    </div>
                </section>


            </main>

        </>
    );
}