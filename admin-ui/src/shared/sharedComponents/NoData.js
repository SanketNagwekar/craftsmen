import React from "react";
import noData from '../../assets/img/no-data.png';
import _ from 'lodash';

export default function NoData({ imageWidth, noDataText, noDataTitle, btnText, handleButtonClick }) {

    const handleClick = (e) => { handleButtonClick(e); }

    return (
        <div className="text-center my-2 ">
            <img style={{ width: imageWidth }} src={noData} className={'mb-2'} />
            <p className="text-xs font-weight-bold mb-2">{noDataTitle}</p>
            <p className="text-center mb-3 text-xs text-secondary">{noDataText}</p>
            {!_.isEmpty(btnText) && <button onClick={handleClick} type="button" className="btn btn-outline-primary btn-xs mb-0 py-2 text-capitalize">{btnText}</button>}
        </div>
    );
}