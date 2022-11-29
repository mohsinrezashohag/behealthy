import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout/Layout';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertReducer';



const Home = () => {

    // const dispatch = useDispatch()
    // const getData = async () => {
    //     try {
    //         dispatch(showLoading())
    //         const res = await axios.post('/api/v1/user/get-user-by-id', {}, {
    //             headers: {
    //                 Authorization: 'Bearer ' + localStorage.getItem('token')
    //             }
    //         });
    //         dispatch(hideLoading())
    //     } catch (error) {
    //         dispatch(hideLoading())
    //     }
    // }
    // useEffect(() => {
    //     getData()
    // }, []);

    return (
        <Layout>
            <h1 className="page-title">Home Page</h1>

        </Layout>
    );
};

export default Home;