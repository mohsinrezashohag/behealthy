import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Layout from '../Layout/Layout';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertReducer';

const Appointments = () => {
    const dispatch = useDispatch()

    const [appointments, setAppointments] = useState([])

    const getAppointmentsById = async () => {
        dispatch(showLoading())
        try {
            const appointments = await axios.get('/api/v1/user/get-appointments-by-id', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })

            dispatch(hideLoading())
            if (appointments.data.success) {
                setAppointments(appointments.data.data)
            }

        } catch (error) {
            dispatch(hideLoading())
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getAppointmentsById()
    }, [])




    const columns = [
        {
            title: 'Doctor Name',
            dataIndex: 'name',
            render: (text, record) => (
                <p>{record.doctorInfo.firstName} {record.doctorInfo.lastName}</p>
            )

        },
        {
            title: 'Specialization',
            dataIndex: 'specialization',
            render: (text, record) => (
                <p>{record.doctorInfo.specialization}</p>
            )

        },
        {
            title: 'Time',
            dataIndex: 'time',
            render: (text, record) => (
                <span>{moment(record.date).format('DD.MM.YY')} {moment(record.time).format('HH:mm')}</span>
            )
        },

        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => (
                <div>
                    {record.status === 'rejected' && <p className='text-danger fw-bold'>Rejected</p>}
                    {record.status === 'pending' && <p className='text-warning fw-bold'>Pending</p>}
                    {record.status === 'approved' && <p className='text-success fw-bold'>Approved</p>}
                </div>
            )

        },
    ];


    return (
        <Layout>
            <h1 className="page-title">Doctors</h1>
            <div>
                <Table dataSource={appointments} columns={columns} />;

            </div>
        </Layout>
    );
};

export default Appointments;