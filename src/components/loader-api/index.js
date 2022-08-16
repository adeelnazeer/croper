import React from 'react';
import './style.scss';
import Loaderapi from '../../static/assests/images/apiloader.gif';
export default()=>{
    return(
        <>
        <div className="text-center loader-api d-flex justify-content-center align-items-center">
            <div>
            <img src={Loaderapi} alt="Not Found"/>
            </div>
        </div>
        </>
    )
}