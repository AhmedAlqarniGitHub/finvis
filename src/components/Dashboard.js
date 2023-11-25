import React from 'react';
import { Layout, Menu } from 'antd';
import IncomeChart from './IncomeChart';
import ExpenseChart from './ExpenseChart';
import BudgetCategory from './BudgetCategory';

import incomeData from '../test_data/incomeData.json';
import expenseData from '../test_data/expenseData.json';
import budgetCategoryData from '../test_data/budgetCategoryData.json';

const { Header, Content, Footer } = Layout;




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
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          {/* Content goes here */}
          <IncomeChart data={incomeData} />
          <ExpenseChart data={expenseData} />
          <BudgetCategory data={budgetCategoryData} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>FinVis ©2023 Created by YourName</Footer>
    </Layout>
  );
};

export default Dashboard;
