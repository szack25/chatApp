import React from "react";
import ReactLoading from 'react-loading';

export default function Loading() {
    return (
        <div className="Loading">
            <ReactLoading type="spin" height={100} width={50} color="white" />
        </div>
    )
}