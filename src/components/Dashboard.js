import React from "react";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import IncomeChart from "./IncomeChart";
import ExpenseChart from "./ExpenseChart";
import BudgetCategory from "./BudgetCategory";

import incomeData from "../test_data/incomeData.json";
import expenseData from "../test_data/expenseData.json";
import budgetCategoryData from "../test_data/budgetCategoryData.json";

// Create a dark theme instance
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Dashboard = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="dashboard">
        <Grid container spacing={3}>
          {" "}
          {/* Adjusted spacing */}
          <Grid item xs={12} md={6}>
            <BudgetCategory data={budgetCategoryData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="column" spacing={3}>
              {" "}
              {/* Adjusted spacing */}
              <Grid item>
                <ExpenseChart data={expenseData} />
              </Grid>
              <Grid item>
                <IncomeChart data={incomeData} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
