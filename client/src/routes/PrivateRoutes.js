import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = (props) => {

    if (localStorage.getItem("token")) {
        return props.children;
    } else {
        return <Navigate to="/login"></Navigate>
    }
};

export default PrivateRoutes;