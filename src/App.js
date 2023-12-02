import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Dashboard from "./components/Dashboard";
import FinancePage from "./components/finantial_data";
import Login from "./components/login";
import Register from "./components/register";
import "./App.css";
import SavingsTargetPage from "./components/savingTargets";

// Set up Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // make sure this is the correct URI for your GraphQL server
  cache: new InMemoryCache(),
});

document.cookie = "userId=ahmed; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";


function App() {
  return (
    <ApolloProvider client={client}>
      {" "}
      {/* Wrap your app with ApolloProvider */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fin" element={<FinancePage />} />
          <Route path="/saving_target" element={<SavingsTargetPage />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
