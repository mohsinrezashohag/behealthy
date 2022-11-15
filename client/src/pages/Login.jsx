import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom'



const Login = () => {


    const onFinish = (values) => {
        console.log('Success:', values);
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