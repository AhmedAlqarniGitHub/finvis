import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const { Option } = Select;

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = async (values) => {
        try {
            const response = await axios.post(
              "https://finvisgateway-do3f1fd7.nw.gateway.dev/register",
              {
                username: values.username,
                email: values.email,
                password: values.password,
                phone: values.phone,
                age: values.age,
                incomeSource: values.incomeSource,
              }
            );

            // Handle post-registration logic
            message.success('Registration successful');
            // For example, navigate to the login page or a success page
            navigate("/login");

        } catch (error) {
            if (error.response) {
                // Server responded with a non-2xx status code
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
        <div className="register-container">
            <div className="register-form">
                <Form
                    name="register"
                    onFinish={handleRegister}
                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { type: 'email', message: 'The input is not valid E-mail!' },
                            { required: true, message: 'Please input your E-mail!' }
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                        hasFeedback
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        rules={[
                            { required: true, message: 'Please input your phone number!' },
                            { pattern: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' } // Adjust the regex as needed
                        ]}
                    >
                        <Input style={{ width: '100%' }} placeholder="Phone Number" />
                    </Form.Item>

                    <Form.Item
                        name="age"
                        rules={[
                            { required: true, message: 'Please input your age!' },
                            () => ({
                                validator(_, value) {
                                    if (!value) {
                                        return Promise.resolve();
                                    }
                                    const age = parseInt(value, 10);
                                    if (isNaN(age) || age < 1 || age > 150) {
                                        return Promise.reject(new Error('Age must be a number between 1 and 150'));
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input type="number" placeholder="Age" />
                    </Form.Item>

                    <Form.Item
                        name="incomeSource"
                        rules={[{ required: true, message: 'Please select your main income source!' }]}
                    >
                        <Select placeholder="Select your main income source">
                            <Option value="employment">Employment</Option>
                            <Option value="business">Business</Option>
                            <Option value="investments">Investments</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Register;
