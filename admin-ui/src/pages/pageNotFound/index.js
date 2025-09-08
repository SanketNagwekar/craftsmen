import React from "react";
import './styles.css';

export default function PageNotFound(props) {

    return (<div id="notfound">
        <div className="notfound">
            <div className="notfound-404">
                <h1>404</h1>
            </div>
            <h2>Oops! Nothing was found</h2>
            <p>The page you are looking for was not found or is temporarily unavailable. <a href="/">Return to homepage</a></p>
        </div>
    </div>);
}