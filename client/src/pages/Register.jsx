import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom'



const Register = () => {


    const onFinish = (values) => {
        console.log('Success:', values);
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
                        <Input />
                    </Form.Item>

                    <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: 'Please confirm your password!' }]} >
                        <Input />
                    </Form.Item>

                    <Button className="primary-button" htmlType="submit">REGISTER</Button>

                </Form>
                <Link to="/login" className="login-link">CLICK HERE TO LOGIN</Link>

            </div>

        </div>
    );
};

export default Register;