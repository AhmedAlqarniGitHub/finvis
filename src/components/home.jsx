import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Layout, Menu } from "antd";
import { CssBaseline, Box } from "@mui/material";
import Dashboard from "./Dashboard";
import SalaryInfo from "./SalaryInfo";
import Logout from "./Logout";
import SavingsTarget from "./SavingsTarget";
import AddTransaction from "./AddTransaction";
// const AddTransaction = () => <div>Add New Transaction Component</div>;
// const Logout = () => <div>Logout Component</div>;
const { Header, Content, Sider, Footer } = Layout;

const Home = () => {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  // Create a MUI theme instance
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "rgb(97, 218, 251)",
      },
      background: {
        default: "#121212",
        paper: "#1A2027",
      },
    },
  });

  const renderComponent = () => {
    switch (selectedComponent) {
      case "dashboard":
        return <Dashboard />;
      case "salary-info":
        return <SalaryInfo />;
      case "saving-target":
        return <SavingsTarget />;
      case "add-transaction":
        return <AddTransaction />;
      case "logout":
        return <Logout />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout style={{ minHeight: "100vh", background: "none" }}>
        <Sider breakpoint="lg" collapsedWidth="0" theme="dark">
          <Box
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              fontSize: "1.5rem",
              textAlign: "center",
              margin: "20px",
              background: "transparent",
            }}
          >
            FINVIS
          </Box>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            onSelect={({ key }) => setSelectedComponent(key)}
          >
            <Menu.Item key="dashboard">Dashboard</Menu.Item>
            <Menu.Item key="salary-info">Salary Info</Menu.Item>
            <Menu.Item key="saving-target">Saving Target</Menu.Item>
            <Menu.Item key="add-transaction">Add New Transaction</Menu.Item>
            <Menu.Item key="logout">Logout</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: "transparent",
              color: "white",
              padding: "10px 20px",
            }}
          >
            {/* Add more header content here if needed */}
          </Header>
          <Content
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              background: "transparent",
            }}
          >
            <Box
              sx={{
                padding: 3,
                background: "linear-gradient(60deg, #29323c 30%, #485563 90%)",
                minHeight: 360,
                width: "100%",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              {renderComponent()}
            </Box>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              background: "transparent",
              color: theme.palette.primary.main,
            }}
          >
            FinVis ©2023 Created by ahmed and waleed
          </Footer>
        </Layout>
      </Layout>
    </ThemeProvider>
  );
};

export default Home;
