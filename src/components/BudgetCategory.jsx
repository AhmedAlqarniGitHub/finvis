import React from "react";
import { Table } from "antd";
import "./style.css";

const BudgetCategory = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No budget data available</div>;
  }

  const columns = [
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Budget",
      dataIndex: "amount",
      key: "amount",
    },
    // Add more columns as needed
  ];

  const transformedData = data.map((item, index) => ({
    key: index,
    name: item.name,
    amount: item.amount,
  }));

  return (
    <Table
      dataSource={transformedData}
      columns={columns}
      className="budget-category"
      pagination={false}
    />
  );
};
export default BudgetCategory;
