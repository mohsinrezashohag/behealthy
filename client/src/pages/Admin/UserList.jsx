import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Layout from '../../Layout/Layout';

const UserList = () => {
    const [users, setUsers] = useState([])
    const getAllUsers = async () => {
        try {
            const res = await axios.get('/api/v1/admin/get-all-users', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })

            console.log(res);
            if (res.data.success) {
                setUsers(res.data.data)
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllUsers();
    }, [])

    const OnlyUsers = users.filter(user => user.isAdmin !== true)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',

        },
        {
            title: 'Action',
            dataIndex: 'actions',
            render: (text, record) => (<div className='d-flex'>
                <p className='custom-link text-danger'>Block</p>
            </div>)
        }
    ];


    return (
        <Layout>
            <h1 className="page-title">Users</h1>
            <div>
                {/* {users?.map(user => <h1>

                    {user.name}
                </h1>)} */}
                <Table dataSource={OnlyUsers} columns={columns} />;


            </div>
        </Layout>
    );
};

export default UserList;