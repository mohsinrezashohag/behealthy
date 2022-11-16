import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { Toaster } from 'react-hot-toast'


const index = () => {
    return (
        <div>
            <BrowserRouter>

                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <Routes>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/register" element={<Register></Register>}></Route>
                </Routes>

            </BrowserRouter>

        </div>
    );
};

export default index;