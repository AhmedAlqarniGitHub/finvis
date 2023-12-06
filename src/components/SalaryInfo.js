import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Input, Button, Typography, Form, Table } from "antd";
import "./style.css"; // Ensure this is the correct path to your style file

// GraphQL Mutation
const UPDATE_SALARY_INFO = gql`
  mutation UpdateSalaryInfo(
    $userId: ID!
    $salary: Float!
    $salaryDay: Int!
    $obligations: [ObligationInput!]!
  ) {
    updateSalaryInfo(
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
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const [form] = Form.useForm();
  const [salaryInfo, setSalaryInfo] = useState({
    userId: getCookie("userId"),
    salary: 0,
    salaryDay: 0,
    obligations: [{ name: "", cost: 0 }],
  });

  const [updateSalaryInfo] = useMutation(UPDATE_SALARY_INFO);

  const handleSubmit = () => {
    updateSalaryInfo({
      variables: {
        userId: salaryInfo.userId,
        salary: parseFloat(salaryInfo.salary),
        salaryDay: parseInt(salaryInfo.salaryDay, 10),
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
      obligations: [...salaryInfo.obligations, { name: "", cost: 0 }],
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
      dataIndex: "cost",
      key: "cost",
      render: (_, record, index) => (
        <Input
          type="number"
          value={record.cost}
          onChange={(e) =>
            handleObligationChange(index, "cost", parseFloat(e.target.value))
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