import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import gql from 'graphql-tag';

const { Option } = Select;

const ADD_TRANSACTION = gql`
  mutation AddTransaction($userId: ID!, $amount: Float!, $date: String!, $transactionType: String!, $description: String, $category: String) {
    addTransaction(userId: $userId, amount: $amount, date: $date, transactionType: $transactionType, description: $description, category: $category) {
      id
    }
  }
`;

const AddTransaction = () => {
  const userId = localStorage.getItem('userId'); // Replace with actual logic to get user ID

  const [addTransaction] = useMutation(ADD_TRANSACTION);
  const [transaction, setTransaction] = useState({
    amount: 0,
    date: '',
    transactionType: '',
    description: '',
    category: ''
  });

const handleSubmit = async () => {
  try {
    const variables = {
      ...transaction,
      amount: parseFloat(transaction.amount),
      userId: userId // Replace with actual logic to get user ID
    };

    const response = await addTransaction({ variables });
    message.success('Transaction added successfully');
    // Additional logic after successful submission
  } catch (error) {
    message.error('Error adding transaction');
    console.error(error);
  }
};

  const handleInputChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateString) => {
    setTransaction({ ...transaction, date: dateString });
  };

  const handleSelectChange = (value) => {
    setTransaction({ ...transaction, transactionType: value });
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Amount">
        <Input
          name="amount"
          type="number"
          value={transaction.amount}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item label="Date">
        <DatePicker onChange={handleDateChange} />
      </Form.Item>
      <Form.Item label="Transaction Type">
        <Select onChange={handleSelectChange}>
          <Option value="income">Income</Option>
          <Option value="outcome">Expense</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Category">
        <Input
          name="category"
          value={transaction.category}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          name="description"
          value={transaction.description}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Add Transaction
      </Button>
    </Form>
  );
};

export default AddTransaction;