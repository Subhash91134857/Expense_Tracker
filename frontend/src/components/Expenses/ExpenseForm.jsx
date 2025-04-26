import React, { useState, useEffect } from "react";
import { X, Save, Loader2, Heading1 } from "lucide-react";
import { CATEGORIES } from "../../constants/categories";
import { INITIAL_FORM_STATE } from "../../utils/helpers";


export default function ExpenseForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing,
  isSubmitting,
}) {
  const [formData, setFormData] = useState(initialData || INITIAL_FORM_STATE);

  useEffect(() => {
    setFormData(initialData || INITIAL_FORM_STATE);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-md mb-6">
      <h3 className="text-lg font-medium mb-4">
        {isEditing ? "Edit Expense" : "Add New Expense"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Amount ($)</label>
          <input
            type="number"
            name="amount"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full p-2 border rounded-md"
          >
            {CATEGORIES.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
        >
          <X size={16} className="mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 size={16} className="mr-2 animate-spin" />
          ) : (
            <Save size={16} className="mr-2" />
          )}
          {isEditing ? "Update" : "Save"} Expense
        </button>
      </div>
    </form>
  );
}