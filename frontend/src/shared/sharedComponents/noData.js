import React from "react";
import empty from '../../assets/img/empty.png';

export default function NoData({ noDataTitle }) {
    return (
        <div className="py-5 bg-light text-center">
            <img style={{ width: 70 }} src={empty} alt={'Empty Folder'} />
            <h5 className="mt-3 fw-normal text-black-50">{noDataTitle ? noDataTitle : 'No Data'}</h5>
        </div>
    );
}