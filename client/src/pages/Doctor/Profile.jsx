
import { Button, Col, Form, Input, Row, TimePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DoctorForm from '../../components/DoctorForm';
import Layout from '../../Layout/Layout';
import { hideLoading, showLoading } from '../../redux/alertReducer';

const Profile = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [doctor, setDoctor] = useState(null)

    const getDoctorAccount = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.get('/api/v1/doctor/get-doctor-account-by-userId', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            dispatch(hideLoading())
            if (res.data.data) {
                setDoctor(res.data.data)
                dispatch(hideLoading())

            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getDoctorAccount()
    }, [])





    const onFinish = async (values) => {
        try {
            const res = await axios.post('/api/v1/doctor/update-doctor-profile',
                {
                    ...values,
                    userId: user?._id,
                    timings: [

                        moment(values.timings[0]).format("HH:mm"),
                        moment(values.timings[1]).format("HH:mm"),
                    ]
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
            dispatch(hideLoading())

            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/')
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error('Something went wrong ')
        }
    }



    return (
        <Layout>
            <h1 className="page-title">Profile</h1>
            <hr />

            {doctor && <DoctorForm onFinish={onFinish} initialValues={doctor}   ></DoctorForm>}
        </Layout >
    );
};

export default Profile;