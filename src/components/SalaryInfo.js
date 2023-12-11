import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Input, Button, Typography, Form, Table, message } from "antd";
import "./style.css";

// GraphQL Query to Get User Info
const GET_USER_INFO = gql`
  query GetUserInfo($userId: ID!) {
    user(id: $userId) {
      salary
      salaryDay
      obligations {
        name
        amount
      }
    }
  }
`;

// GraphQL Mutation
const UPDATE_USER = gql`
  mutation UpdateUser(
    $userId: ID!
    $salary: Float
    $salaryDay: Int
    $obligations: [ObligationInput]
  ) {
    updateUser(
      userId: $userId
      salary: $salary
      salaryDay: $salaryDay
      obligations: $obligations
    ) {
      id
    }
  }
`;

// React Component
const SalaryInfo = () => {
 const userId = window.localStorage.getItem('userId');

  const [form] = Form.useForm();
  const [salaryInfo, setSalaryInfo] = useState({
    userId: userId,
    salary: '',
    salaryDay: '',
    obligations: [{ name: "", amount: 0 }],
  });

  const { data, loading, error } = useQuery(GET_USER_INFO, {
    variables: { userId },
    skip: !userId,
    fetchPolicy: 'network-only', // Ensures fresh data is fetched
  });

  useEffect(() => {
    if (loading) {
      // Optionally handle loading state
      return;
    }
  
    if (error) {
      message.error('An error occurred while fetching data.');
      return;
    }
  console.log(data.user.obligations)
    if (data && data.user) {
      setSalaryInfo(prevState => ({
        ...prevState,
        salary: data.user.salary || '',
        salaryDay: data.user.salaryDay || '',
        obligations: data.user.obligations.length > 0 ? data.user.obligations : [{ name: "", amount: 0 }],
      }));
    } else {
      message.info('Please enter your salary information.');
    }
  }, [data, loading, error]);


  const [updateUser] = useMutation(UPDATE_USER);

  const handleSubmit = () => {
    const cleanedObligations = salaryInfo.obligations.map(({ name, amount }) => ({ name, amount }));
  
    updateUser({
      variables: {
        userId: salaryInfo.userId,
        salary: parseFloat(salaryInfo.salary),
        salaryDay: parseInt(salaryInfo.salaryDay, 10),
        obligations: cleanedObligations,
      },
    });
  };

  const handleObligationChange = (index, field, value) => {
    const newObligations = [...salaryInfo.obligations];
    newObligations[index][field] = value;
    setSalaryInfo({ ...salaryInfo, obligations: newObligations });
  };

  const handleAddObligation = () => {
    setSalaryInfo({
      ...salaryInfo,
      obligations: [...salaryInfo.obligations, { name: "", amount: 0 }],
    });
  };

  const { Title } = Typography;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record, index) => (
        <Input
          value={record.name}
          onChange={(e) =>
            handleObligationChange(index, "name", e.target.value)
          }
        />
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, record, index) => (
        <Input
          type="number"
          value={record.amount}
          onChange={(e) =>
            handleObligationChange(index, "amount", parseFloat(e.target.value))
          }
        />
      ),
    },
  ];

  return (
    <div className="salary-info-container">
      <Title level={2} className="title">
        Finance Manager
      </Title>
      <Form form={form} layout="vertical" className="salary-form">
        <Form.Item label="Salary">
          <Input
            type="number"
            placeholder="Enter your salary"
            value={salaryInfo.salary}
            onChange={(e) =>
              setSalaryInfo({ ...salaryInfo, salary: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Salary Day">
          <Input
            type="number"
            placeholder="Enter the day of the month you get paid"
            value={salaryInfo.salaryDay}
            onChange={(e) =>
              setSalaryInfo({ ...salaryInfo, salaryDay: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Table
            dataSource={salaryInfo.obligations}
            columns={columns}
            rowKey={(record, index) => index}
            pagination={false}
            className="dark-theme-table"
          />
        </Form.Item>
        <Button onClick={handleAddObligation} className="add-obligation-btn">
          Add Obligation
        </Button>
        <Button onClick={handleSubmit} type="primary" className="submit-btn">
          Submit All Updates
        </Button>
      </Form>
    </div>
  );
};

export default SalaryInfo;
