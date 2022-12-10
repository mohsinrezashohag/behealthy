import { Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Layout from '../../Layout/Layout';
import { hideLoading, showLoading } from '../../redux/alertReducer';

const DoctorAppointments = () => {
    const dispatch = useDispatch()
    const [appointments, setAppointments] = useState([])
    console.log(appointments);


    const getDoctorAppointmentsByDoctorId = async () => {
        dispatch(showLoading())
        try {
            const appointments = await axios.get('/api/v1/doctor/get-appointments-by-doctor-id', {
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
        getDoctorAppointmentsByDoctorId()
    }, [])


    const changeAppointmentStatus = async (appointmentId, status) => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                "/api/v1/doctor/change-appointment-status",
                { appointmentId: appointmentId, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                toast.success(res.data.message);
                getDoctorAppointmentsByDoctorId();
            }
        } catch (error) {
            toast.error("Error changing doctor account status");
            dispatch(hideLoading());
        }
    };


    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',


        },
        {
            title: 'Patient',
            dataIndex: 'name',
            render: (text, record) => (
                <span>{record.userInfo.name}</span>
            )


        },
        {
            title: "Date & Time",
            dataIndex: "time",
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")}{" "}
                    {moment(record.time).format("HH:mm")}
                </span>
            ),
        },

        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div>
                    {record.status === 'pending' && <div className="d-flex">

                        <p className="custom-link me-2 fw-bold text-success" onClick={() => changeAppointmentStatus(record._id, 'approved')}>Approve</p>
                        <p className="custom-link text-danger fw-bold" onClick={() => changeAppointmentStatus(record._id, 'rejected')}>Reject</p>

                    </div>}

                    {record.status === 'approved' && <p className='text-success fw-bold'>Approved</p>}
                    {record.status === 'rejected' && <p className='text-success fw-bold'>Rejected</p>}





                </div >
            )
        }
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

export default DoctorAppointments;