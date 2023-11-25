import React from 'react';
import { Table } from 'antd';

const BudgetCategory = ({ data }) => {
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
    },
    // You can add more columns as needed
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default BudgetCategory;
