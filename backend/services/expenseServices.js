const Expense = require('../models/Expense');

//Getting all expenses
exports.getAll = async () => {
    return await Expense.find().sort({ date: -1 });
};
//Creating a new expense
exports.create = async (expenseData) => {
    const expense = new Expense(expenseData);
    return await expense.save();
};

//Updating an existing expense
exports.update = async (id, updatedData) => {
    return await Expense.findByIdAndUpdate(id, updatedData, { new: true });
};

//Removing an expense
exports.remove = async (id) => {
    return await Expense.findByIdAndDelete(id);
};
