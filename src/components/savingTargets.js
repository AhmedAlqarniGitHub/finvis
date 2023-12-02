import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Input, Button, Card, Typography, Form, Progress } from "antd";

// GraphQL Queries and Mutations
const GET_USER_SAVINGS = gql`
  query GetUserSavings($userId: ID!) {
    user(id: $userId) {
      monthlySavings {
        month
        amount
      }
      totalSavings
    }
  }
`;

const UPDATE_SAVINGS_GOAL = gql`
  mutation UpdateSavingsGoal($userId: ID!, $savingsGoal: Float!) {
    updateSavingsGoal(userId: $userId, savingsGoal: $savingsGoal) {
      id
      savingsGoal
    }
  }
`;

// React Component
const SavingsTargetPage = () => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const userId = getCookie("userId");
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [currentSavings, setCurrentSavings] = useState(0); // Initialize currentSavings state

  const { data, loading, error } = { data: "test", loading: false, error: "" };
  /*useQuery(GET_USER_SAVINGS, {
    variables: { userId },
    skip: !userId,
  });*/

  const [updateSavingsGoal] = useMutation(UPDATE_SAVINGS_GOAL);

  useEffect(() => {
    if (data && data.user) {
      // Assuming totalSavings is the cumulative savings from previous months
      setCurrentSavings(data.user.totalSavings);
    }
  }, [data]);

  const handleSubmit = () => {
    updateSavingsGoal({
      variables: {
        userId: userId,
        savingsGoal: parseFloat(savingsGoal),
      },
    });
  };

  // ... Other state and functions ...

  const { Title } = Typography;

  const progressPercent = (currentSavings / savingsGoal) * 100;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="register-container">
      {" "}
      {/* Use the same container class as the register page */}
      <div className="register-form">
        {" "}
        {/* Use the same form class as the register page */}
        <Title level={2}>Savings Goal Tracker</Title>
        <Form layout="vertical">
          {/* ... Form fields ... */}
          <Form.Item label="Savings Goal">
            <Input
              type="number"
              placeholder="Enter your savings goal"
              onChange={(e) => setSavingsGoal(e.target.value)}
            />
          </Form.Item>
          <Button
            onClick={handleSubmit}
            type="primary"
            style={{ marginTop: "20px" }}
          >
            Update Savings Goal
          </Button>
        </Form>
        <Title level={4} style={{ marginTop: "40px" }}>
          Current Savings Progress
        </Title>
        <Progress percent={isNaN(progressPercent) ? 0 : progressPercent} />
        <Title level={4} style={{ marginTop: "20px" }}>
          Total Savings: ${currentSavings.toFixed(2)}
        </Title>
      </div>
    </div>
  );
};

export default SavingsTargetPage;