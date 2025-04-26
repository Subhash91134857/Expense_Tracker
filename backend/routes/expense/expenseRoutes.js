const express = require('express');
const router = express.Router();
const expenseController = require('../../controllers/expenseController');


router.post('/', expenseController.createExpense);
router.get('/', expenseController.getAllExpenses);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.removeExpense);

module.exports = router;
