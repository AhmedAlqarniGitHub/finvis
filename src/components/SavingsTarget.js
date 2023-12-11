import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Input, Button, Typography, Form, Progress, message } from "antd";
import "./style.css";

// GraphQL Query to Get User Savings Target
const GET_USER_SAVINGS = gql`
  query GetUserSavings($userId: ID!) {
    savingsTarget(userId: $userId) {
      id
      user
      targetAmount
      currentAmount
    }
  }
`;

// GraphQL Mutation to Add or Update Savings Target
const UPDATE_SAVINGS_GOAL = gql`
  mutation UpdateSavingsGoal($userId: ID!, $targetAmount: Float!) {
    addSavingsTarget(userId: $userId, targetAmount: $targetAmount) {
      id
      user
      targetAmount
      currentAmount
    }
  }
`;

// GraphQL Query to Get Total Savings
const GET_TOTAL_SAVINGS = gql`
  query GetTotalSavings($userId: ID!) {
    totalSavings(userId: $userId)
  }
`;

const SavingsTarget = () => {
  const userId = window.localStorage.getItem('userId');

  // Initialize states
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [totalSavings, setTotalSavings] = useState(null); // Initialize to null

  const { data: savingsData, loading: savingsLoading, error: savingsError } = useQuery(GET_USER_SAVINGS, {
    variables: { userId },
    skip: !userId,
  });

  const { data: totalSavingsData, loading: totalSavingsLoading } = useQuery(GET_TOTAL_SAVINGS, {
    variables: { userId },
    skip: !userId,
  });

  const [updateSavingsGoal] = useMutation(UPDATE_SAVINGS_GOAL, {
    refetchQueries: [{ query: GET_USER_SAVINGS, variables: { userId } }],
  });

  useEffect(() => {
    console.log("Savings Data:", savingsData); // Debugging log
    console.log("Total Savings Data:", totalSavingsData); // Debugging log
    if (savingsData && savingsData.savingsTarget) {
      setSavingsGoal(savingsData.savingsTarget.targetAmount);
      console.log("ggggg:: "+ (savingsData.savingsTarget.targetAmount)/(totalSavingsData.totalSavings)*100)
      setCurrentSavings((totalSavingsData.totalSavingst)/(savingsData.savingsTarget.targetAmount)*100);
    } else {
      setSavingsGoal(0);
      setCurrentSavings(0);
    }

    if (totalSavingsData && totalSavingsData.totalSavings !== undefined) {
      setTotalSavings(totalSavingsData.totalSavings);
    }
  }, [savingsData, totalSavingsData]);

  const handleSubmit = () => {
    updateSavingsGoal({
      variables: {
        userId: userId,
        targetAmount: parseFloat(savingsGoal),
      },
    });
  };

  const { Title } = Typography;

  let progressPercent = 0;
  if (totalSavings > 0) {
   progressPercent = currentSavings;
  } else if (totalSavings === 0 && savingsGoal > 0) {
    message.warning("Total savings is zero. Please review your financial data.");
  }

  if (totalSavings === null || totalSavings === undefined) {
    return <p>Loading total savings...</p>;
  }

  if (savingsLoading || totalSavingsLoading) return <p>Loading...</p>;
  if (savingsError) return <p>Error: {savingsError.message}</p>;

  return (
    <div className="salary-info-container">
      <Title level={2} className="title">
        Savings Goal Tracker
      </Title>
      <Form layout="vertical" className="salary-form">
        <Form.Item label="Savings Goal">
          <Input
            type="number"
            placeholder="Enter your savings goal"
            value={savingsGoal}
            onChange={(e) => setSavingsGoal(e.target.value)}
          />
        </Form.Item>
        <Button onClick={handleSubmit} type="primary" className="submit-btn">
          Update Savings Goal
        </Button>
        <Title
          level={4}
          className="current-savings-title"
          style={{ marginTop: "40px" }}
        >
          Current Savings Progress
        </Title>
        <Progress
          percent={isNaN(progressPercent) ? 0 : progressPercent}
          className="savings-progress"
        />
        <Title
          level={4}
          className="total-savings-title"
          style={{ marginTop: "20px" }}
        >
          Total Savings: ${totalSavings.toFixed(2)}
        </Title>
      </Form>
    </div>
  );
};

export default SavingsTarget;
