import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import ExpenseList from "../components/Expenses/ExpenseList";
import ErrorMessage from "../components/Common/ErrorMessage";
import LoadingSpinner from "../components/Common/LoadingSpinner.jsx";
import { apiService } from "../services/apiService";
import { INITIAL_FORM_STATE } from "../utils/helpers";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

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

  // Get sorted expenses
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Handle form submission
  const handleExpenseSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    console.log(formData);
    try {
      if (editingId) {
        const updatedExpense = await apiService.updateExpense(
          editingId,
          formData
        );
        setExpenses(
          expenses.map((expense) =>
            expense._id === editingId ? updatedExpense : expense
          )
        );
      } else {
        const newExpense = await apiService.createExpense(formData);
        setExpenses([...expenses, newExpense]);
      }

      setShowForm(false);
      setEditingId(null);
    } catch (err) {
      setError(
        editingId ? "Failed to update expense." : "Failed to add expense."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit an expense
  const handleEdit = (expense) => {
    setEditingId(expense._id);
    setShowForm(true);
  };

  // Delete an expense
  const handleDelete = async (id) => {
    setDeleteInProgress(id);
    setError(null);

    try {
      await apiService.deleteExpense(id);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (err) {
      setError("Failed to delete expense.");
    } finally {
      setDeleteInProgress(null);
    }
  };

  // Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <Link
          to="/dashboard"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          View Dashboard
        </Link>
      </div>

      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Expenses</h2>
          <div className="flex gap-2">
            {isLoading && !showForm && <LoadingSpinner size="small" />}
            <button
              onClick={() => setShowForm(!showForm)}
              disabled={isLoading && !showForm}
              className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {showForm ? (
                <X size={16} className="mr-1" />
              ) : (
                <Plus size={16} className="mr-1" />
              )}
              {showForm ? "Cancel" : "Add Expense"}
            </button>
          </div>
        </div>

        {/* Expense Form */}
        {showForm && (
          <ExpenseForm
            onSubmit={handleExpenseSubmit}
            onCancel={handleCancel}
            initialData={
              editingId
                ? expenses.find((e) => e.id === editingId)
                : INITIAL_FORM_STATE
            }
            isEditing={!!editingId}
            isSubmitting={isSubmitting}
          />
        )}

        {/* Expense List */}
        <ExpenseList
          expenses={sortedExpenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading && !showForm}
          deleteInProgress={deleteInProgress}
        />
      </div>
    </div>
  );
}
