import React from "react";
import { Trash2, Edit, Loader2, CloudCog } from "lucide-react";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { getCategoryColor } from "../../utils/helpers";
import LoadingSpinner from "../Common/LoadingSpinner.jsx";

export default function ExpenseList({
  expenses,
  onEdit,
  onDelete,
  isLoading,
  deleteInProgress,
}) {
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-right">Amount</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                No expenses recorded yet.
              </td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr
                key={expense._id}
                className={`border-b hover:bg-gray-50 ${
                  deleteInProgress === expense._id ? "opacity-50" : ""
                }`}
              >
                <td className="px-4 py-3">{formatDate(expense.date)}</td>
                <td className="px-4 py-3">
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor: getCategoryColor(expense.category),
                    }}
                  ></span>
                  {expense.category}
                </td>
                <td className="px-4 py-3">{expense.description}</td>
                <td className="px-4 py-3 text-right font-medium">
                  {formatCurrency(expense.amount)}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      aria-label="Edit expense"
                      disabled={deleteInProgress === expense._id}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(expense._id)}
                      className="p-1 text-red-600 hover:text-red-800"
                      aria-label="Delete expense"
                      disabled={deleteInProgress === expense._id}
                    >
                      {deleteInProgress === expense._id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
