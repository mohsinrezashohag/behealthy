import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Layout from '../../Layout/Layout';

const DoctorLIst = () => {



    const [doctors, setDoctors] = useState([]);

    const getDoctors = async () => {
        try {
            const doctors = await axios.get('/api/v1/admin/get-all-doctors', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (doctors.data.success) {
                toast.success('Doctors Loaded successfully');
                setDoctors(doctors.data.data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctors()
    }, [])


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

        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div>
                    {record.status === 'pending' && <p className="custom-link">Approve</p>}
                    {record.status === 'success' && <p className="custom-link text-danger">Block</p>}
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