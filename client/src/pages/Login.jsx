import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertReducer';



const Login = () => {


    const { loading } = useSelector(state => state.alerts)
    const dispatch = useDispatch();



    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/login', values);
            dispatch(hideLoading())
            if (res.data.success) {
                toast.success(res.data.message);
                localStorage.setItem("token", res.data.data.token);
                navigate('/')
            }
            else if (!res.data.success) {
                toast.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="authentication">
            <div className="authentication-form card p-2">
                <h1 className="card-title">Welcome back !</h1>

                <Form layout="vertical" onFinish={onFinish}>


                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
                        <Input type="password" />
                    </Form.Item>

                    <Button className="primary-button" htmlType="submit">LOGIN</Button>

                </Form>
                <Link to="/register" className="login-link">CLICK HERE TO REGISTER</Link>

            </div>

        </div>
    );
};

export default Login;