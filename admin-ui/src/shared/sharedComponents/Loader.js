import React from "react";
import './loaderStyle.css';
import craftsmenLogo from '../../assets/img/craftsmen-logo.png'

export default function Loader() {

    return (
        <div className="loader-container">
            <div className="loader mb-3"></div>
            <img src={craftsmenLogo} className={'loader-logo'}/>
        </div>
    );
}