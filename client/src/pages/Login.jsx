import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';



const Login = () => {

    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            const res = await axios.post('/api/v1/user/login', values);
            if (res.data.success) {
                toast.success(res.data.message);
                localStorage.setItem("token", res.data.token);
                toast.success("Redirecting to home page");
                navigate('/')
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
                <h1 className="card-title">Welcome back !</h1>

                <Form layout="vertical" onFinish={onFinish}>


                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
                        <Input />
                    </Form.Item>

                    <Button className="primary-button" htmlType="submit">LOGIN</Button>

                </Form>
                <Link to="/register" className="login-link">CLICK HERE TO REGISTER</Link>

            </div>

        </div>
    );
};

export default Login;