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
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllUsers();
    }, [])



    return (
        <Layout>
            <h1 className="page-title">Users</h1>
            <div>
                {users?.map(user => <h1>

                    {user.name}
                </h1>)}
            </div>
        </Layout>
    );
};

export default UserList;