const expenseService = require('../services/expenseServices');

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await expenseService.getAll();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

exports.createExpense = async (req, res) => {
    try {
        const newExpense = await expenseService.create(req.body);
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

exports.removeExpense = async (req, res) => {
    try {
        await expenseService.remove(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const updatedExpense = await expenseService.update(req.params.id, req.body);
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
