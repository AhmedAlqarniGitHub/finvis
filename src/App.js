import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Menu } from "antd";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Dashboard from "./components/Dashboard";
import SalaryInfo from "./components/SalaryInfo";
import Login from "./components/login";
import Register from "./components/register";
import "./App.css";
import SavingsTarget from "./components/SavingsTarget";
import Home from "./components/home";
import ProtectedRoute from './components/isAuth'

// Set up Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // make sure this is the correct URI for your GraphQL server
  cache: new InMemoryCache(),
});

document.cookie = "userId=ahmed; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";


function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
