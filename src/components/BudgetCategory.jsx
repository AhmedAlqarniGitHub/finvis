import React from "react";
import { Table } from "antd";
import "./style.css";

const BudgetCategory = ({ data }) => {

    if (!Array.isArray(data)) {
    return <div>No expense data available</div>;
  }

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
    },
    // You can add more columns as needed
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      className="budget-category"
      pagination={false}
    />
  );
};

export default BudgetCategory;
