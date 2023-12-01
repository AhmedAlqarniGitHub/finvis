import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate(); // Hook for navigation

    const onFinish = (values) => {
        axios.post("http://localhost:8080/login", {
          username: values.username,
          password: values.password
        }).then((response)=>{
            console.log(response);
            navigate("/dashboard"); // Redirect to the dashboard
        }).catch(err=>{
            console.log(err);
        });
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="login-logo">
                    <img src="path-to-your-logo.png" alt="logo" />
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="/register">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
