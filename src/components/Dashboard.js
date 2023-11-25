import React from 'react';
import { Layout, Menu } from 'antd';
import IncomeChart from './IncomeChart';
import ExpenseChart from './ExpenseChart';
import BudgetCategory from './BudgetCategory';
import './style.css';



import incomeData from '../test_data/incomeData.json';
import expenseData from '../test_data/expenseData.json';
import budgetCategoryData from '../test_data/budgetCategoryData.json';

const { Header, Footer } = Layout;




const Dashboard = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Dashboard</Menu.Item>
          {/* other menu items */}
        </Menu>
      </Header>
        <div className="dashboard">
          {/* Content goes here */}
          <IncomeChart data={incomeData} />
          <ExpenseChart data={expenseData} />
          <BudgetCategory data={budgetCategoryData} />
        </div>
      <Footer style={{ textAlign: 'center' }}>FinVis ©2023 Created by ahmed and waleed</Footer>
    </Layout>
  );
};

export default Dashboard;
