import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { Toaster } from 'react-hot-toast'
import Home from '../pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import ApplyDoctor from '../pages/ApplyDoctor';
import Notifications from '../pages/Notifications'
import UserList from '../pages/Admin/UserList';
import DoctorList from '../pages/Admin/DoctorList';
import Profile from '../pages/Doctor/Profile';


const Index = () => {

    const { loading } = useSelector(state => state.alerts)
    const { user } = useSelector(state => state.user)
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
                    <Route path="/apply-doctor" element={<PrivateRoutes><ApplyDoctor></ApplyDoctor></PrivateRoutes>} ></Route>


                    <Route path="/admin/notifications" element={<PrivateRoutes><Notifications></Notifications></PrivateRoutes>} ></Route>
                    <Route path="/admin/users" element={<PrivateRoutes><UserList></UserList></PrivateRoutes>} ></Route>
                    <Route path="/admin/doctors" element={<PrivateRoutes><DoctorList></DoctorList></PrivateRoutes>} ></Route>


                    <Route path={`/doctor/profile/:doctorId`} element={<PrivateRoutes><Profile></Profile></PrivateRoutes>} ></Route>


                    <Route path="/login" element={<PublicRoutes><Login></Login></PublicRoutes>}></Route>
                    <Route path="/register" element={<PublicRoutes><Register></Register></PublicRoutes>}></Route>
                </Routes>

            </BrowserRouter >
        </div >
    );
};

export default Index;