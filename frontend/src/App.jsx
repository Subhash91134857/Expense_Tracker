import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpensesPage from "./pages/ExpensesPage";
import DashboardPage from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<ExpensesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}
