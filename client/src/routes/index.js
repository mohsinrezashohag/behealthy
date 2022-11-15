import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
const index = () => {
    return (
        <div>
            <BrowserRouter>


                <Routes>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/register" element={<Register></Register>}></Route>
                </Routes>

            </BrowserRouter>

        </div>
    );
};

export default index;