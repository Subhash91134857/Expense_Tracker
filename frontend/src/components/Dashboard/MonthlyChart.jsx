import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency, formatMonthYear } from "../../utils/formatters";
import LoadingSpinner from "../Common/LoadingSpinner.jsx";

export default function MonthlyChart({ expenses, isLoading }) {
  if (isLoading) {
    return (
      <div className="h-64 bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Prepare data for bar chart - monthly expenses
  const chartData = Object.entries(
    expenses.reduce((acc, { date, amount }) => {
      const month = date.substring(0, 7); // Format: YYYY-MM
      acc[month] = (acc[month] || 0) + amount;
      return acc;
    }, {})
  )
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (chartData.length === 0) {
    return <p className="text-center text-gray-500 py-12">No data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={formatMonthYear} />
        <YAxis />
        <Tooltip
          formatter={(value) => [formatCurrency(value), "Total"]}
          labelFormatter={(label) => {
            const [year, month] = label.split("-");
            const monthNames = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            return `${monthNames[parseInt(month) - 1]} ${year}`;
          }}
        />
        <Legend />
        <Bar dataKey="total" fill="#4F46E5" name="Total Expenses" />
      </BarChart>
    </ResponsiveContainer>
  );
}
