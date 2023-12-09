import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Input, Button, Typography, Form, Table } from "antd";
import "./style.css"; // Ensure this is the correct path to your style file

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
    salary: 0,
    salaryDay: 0,
    obligations: [{ name: "", amount: 0 }], // Changed 'amount' to 'amount'
  });

  const [updateUser] = useMutation(UPDATE_USER);

  const handleSubmit = () => {
    updateUser({
      variables: {
        userId: salaryInfo.userId,
        salary: parseFloat(salaryInfo.salary),
        salaryDay: parseFloat(salaryInfo.salaryDay), 
        obligations: salaryInfo.obligations,
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
      title: "Cost",
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
            onChange={(e) =>
              setSalaryInfo({ ...salaryInfo, salary: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Salary Day">
          <Input
            type="number"
            placeholder="Enter the day of the month you get paid"
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