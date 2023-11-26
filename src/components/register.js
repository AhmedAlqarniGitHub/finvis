import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Register = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        navigate('/login'); // Redirect to login after successful registration
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <Form
                    name="register"
                    onFinish={onFinish}
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
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input style={{ width: '100%' }} placeholder="Phone Number" />
                    </Form.Item>

                    <Form.Item
                        name="age"
                        rules={[{ required: true, message: 'Please input your age!' }]}
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
