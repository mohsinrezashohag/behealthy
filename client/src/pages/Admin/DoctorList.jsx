import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Layout from '../../Layout/Layout';

const DoctorLIst = () => {

    const { user } = useSelector(state => state.user)

    const [doctors, setDoctors] = useState([]);


    const getDoctors = async () => {
        try {
            const doctors = await axios.get('/api/v1/admin/get-all-doctors', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (doctors.data.success) {
                setDoctors(doctors.data.data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctors()
    }, [])


    // updating doctors
    const updateDoctorAccount = async (doctorId, status) => {
        try {
            const res = await axios.post('/api/v1/admin/update-doctor-account-status', { doctorId, status }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })

            if (res.data.success) {
                toast.success(res.data.message)
                getDoctors()
            }

        } catch (error) {

        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <div>
                    <p>{record.firstName} {record.lastName}</p>
                </div>
            )

        },
        {
            title: 'Specialization',
            dataIndex: 'specialization',

        },
        {
            title: 'Consultation Fee',
            dataIndex: 'feePerConsultation',

        },
        {
            title: 'Status',
            dataIndex: 'status',

        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: (text, record) => {
                return record._id
            }

        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div>
                    {record.status === 'pending' && <p className="custom-link" onClick={() => updateDoctorAccount(record._id, 'success')}>Approve</p>}
                    {record.status === 'success' && <p className="custom-link text-danger" onClick={() => updateDoctorAccount(record._id, 'pending')}>Remove</p>}
                </div>
            )
        }
    ];

    return (
        <Layout>
            <h1 className="page-title">Doctors</h1>
            <div>
                <Table dataSource={doctors} columns={columns} />;

            </div>
        </Layout>
    );
};

export default DoctorLIst;