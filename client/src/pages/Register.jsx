import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {

    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const res = await axios.post('/api/v1/user/register', values);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login')
                toast.success("Redirecting to login");
            }
            else if (!res.data.success) {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };



    return (
        <div className="authentication">
            <div className="authentication-form card p-2">
                <h1 className="card-title">Nice to meet you !</h1>

                <Form layout="vertical" onFinish={onFinish}>

                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input />
                    </Form.Item>


                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
                        <Input type="password"></Input>
                    </Form.Item>

                    <Form.Item label="Confirm Password" name="confirmPassword" type="password" rules={[{ required: true, message: 'Please confirm your password!' }]} >
                        <Input type="password"></Input>
                    </Form.Item>

                    <Button className="primary-button" htmlType="submit">REGISTER</Button>

                </Form>
                <Link to="/login" className="login-link">CLICK HERE TO LOGIN</Link>

            </div>

        </div>
    );
};

export default Register;