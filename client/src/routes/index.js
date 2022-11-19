import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { Toaster } from 'react-hot-toast'
import Home from '../pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'


const Index = () => {

    const { loading } = useSelector(state => state.alerts)
    const dispatch = useDispatch();

    return (
        <div>
            <BrowserRouter  >

                {loading && <div className="spinner-parent">
                    <div className="spinner-border" role="status">
                    </div>
                </div>}

                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <Routes>
                    <Route path="/" element={<PrivateRoutes><Home></Home></PrivateRoutes>}></Route>
                    <Route path="/home" element={<PrivateRoutes><Home></Home></PrivateRoutes>} ></Route>


                    <Route path="/login" element={<PublicRoutes><Login></Login></PublicRoutes>}></Route>
                    <Route path="/register" element={<PublicRoutes><Register></Register></PublicRoutes>}></Route>
                </Routes>

            </BrowserRouter >
        </div>
    );
};

export default Index;