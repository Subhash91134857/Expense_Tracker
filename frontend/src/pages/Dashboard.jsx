import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExpenseSummary from "../components/Dashboard/ExpenseSummary";
import CategoryChart from "../components/Dashboard/CategoryChart";
import MonthlyChart from "../components/Dashboard/MonthlyChart";
import ErrorMessage from "../components/Common/ErrorMessage";
import { apiService } from "../services/apiService";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load expenses on component mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Fetch expenses from API
  const fetchExpenses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiService.getExpenses();
      setExpenses(data);
    } catch (err) {
      setError("Failed to load expenses. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Expense Dashboard</h1>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Manage Expenses
        </Link>
      </div>

      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          {/* Total expenses */}
          <ExpenseSummary expenses={expenses} isLoading={isLoading} />

          {/* Pie Chart */}
          <div>
            <h3 className="text-lg font-medium mb-4">Expenses by Category</h3>
            <CategoryChart expenses={expenses} isLoading={isLoading} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          {/* Bar Chart */}
          <div>
            <h3 className="text-lg font-medium mb-4">Monthly Expenses</h3>
            <MonthlyChart expenses={expenses} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
