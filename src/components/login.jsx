import React from 'react';
import { Form, Input, Button ,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate(); // Hook for navigation

    
    const handleLogin = async (values) => {
        try {
            const response = await axios.post(
              "https://europe-west3-finvis-406219.cloudfunctions.net/login",
              {
                username: values.username,
                password: values.password,
              }
            );
            // Save token to localStorage and redirect or do something else
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('userId',response.data.userid)
            message.success('Login successful');
            navigate("/");
            // Redirect or update state as needed
    
        } catch (error) {
            // Axios encapsulates the response error in error.response
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                message.error(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                message.error('No response from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                message.error('Error: ' + error.message);
            }
        }
    }
    

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="login-logo">
                <h2 className="login-header">FINVIS</h2> 
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={handleLogin}
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
