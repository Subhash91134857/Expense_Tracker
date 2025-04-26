import React from "react";
import { formatCurrency } from "../../utils/formatters";

export default function ExpenseSummary({ expenses, isLoading }) {
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  if (isLoading) {
    return (
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Total Expenses</h3>
        <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-2">Total Expenses</h3>
      <p className="text-3xl font-bold">{formatCurrency(totalExpenses)}</p>
    </div>
  );
}
