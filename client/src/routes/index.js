import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { Toaster } from 'react-hot-toast'
import Home from '../pages/Home';
import { useDispatch, useSelector } from 'react-redux';


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
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/register" element={<Register></Register>}></Route>
                </Routes>

            </BrowserRouter >
        </div>
    );
};

export default Index;