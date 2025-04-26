const expenseRoute=require('./expense/expenseRoutes');

module.exports = (app) => {
    app.use('/api/v1/expenses', expenseRoute);
}