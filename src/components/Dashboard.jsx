import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid, ThemeProvider, createTheme } from '@mui/material';
import IncomeChart from './IncomeChart';
import ExpenseChart from './ExpenseChart';
import BudgetCategory from './BudgetCategory';
import { message } from 'antd';
import gql from 'graphql-tag';

const GET_INCOME_DATA = gql`
  query GetIncomeData($userId: ID!) {
    transactions(userId: $userId, transactionType: "income") {
      id
      amount
      date
      description
      category
    }
  }
`;

const GET_EXPENSE_DATA = gql`
  query GetExpenseData($userId: ID!) {
    transactions(userId: $userId, transactionType: "outcome") {
      id
      amount
      date
      description
      category
    }
  }
`;

const GET_BUDGET_CATEGORY_DATA = gql`
  query GetBudgetCategoryData($userId: ID!) {
    user(id: $userId) {
      obligations {
        id
        name
        amount
      }
    }
  }
`;



// Create a dark theme instance
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Dashboard = () => {
  const {
    data: incomeData,
    loading: loadingIncome,
    error: errorIncome
  } = useQuery(GET_INCOME_DATA);

  const {
    data: expenseData,
    loading: loadingExpense,
    error: errorExpense
  } = useQuery(GET_EXPENSE_DATA);

  const {
    data: budgetCategoryData,
    loading: loadingBudgetCategory,
    error: errorBudgetCategory
  } = useQuery(GET_BUDGET_CATEGORY_DATA);

  if (loadingIncome || loadingExpense || loadingBudgetCategory) {
    return <div>Loading...</div>;
  }

  if (errorIncome || errorExpense || errorBudgetCategory) {
    message.error('Error loading data!');
    return <div>Error loading data!</div>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <BudgetCategory data={budgetCategoryData?.budgetCategoryData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <ExpenseChart data={expenseData?.expenseData} />
              </Grid>
              <Grid item>
                <IncomeChart data={incomeData?.incomeData} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
