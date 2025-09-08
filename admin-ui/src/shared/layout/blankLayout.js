import React from "react";
import { Route,Routes } from 'react-router-dom';

import Login from '../../pages/Login';

import ShouldActivate from '../guards/shouldActivate';

export default function BlankLayout(props) {
    return (
        <Routes>
            <Route path="*" element={<Login/>} />
        </Routes>);
}