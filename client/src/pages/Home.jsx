import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout/Layout';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertReducer';
import Doctor from '../components/Doctor';
import { Col, Row } from 'antd';



const Home = () => {

    const dispatch = useDispatch()
    const [doctors, setDoctors] = useState([])

    const getAllApprovedDoctors = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.get('/api/v1/user/get-all-approved-doctors', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });

            if (res.data.data) {
                setDoctors(res.data.data)
            }

            dispatch(hideLoading())
        } catch (error) {
            dispatch(hideLoading())
        }
    }
    useEffect(() => {
        getAllApprovedDoctors()
    }, []);

    console.log(doctors);
    return (
        <Layout>
            <h1 className="page-title">Home Page</h1>

            <Row gutter={16} className="p-2">
                {doctors?.map(doctor =>

                    <Col span={8}>  <Doctor key={doctor._id} doctor={doctor}></Doctor></Col>

                )}

            </Row>


        </Layout>
    );
};

export default Home;