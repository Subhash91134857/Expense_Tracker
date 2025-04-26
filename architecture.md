# 🏛️ Architecture & Flow - Expense Tracker App

The Expense Tracker project is built using the MERN stack — ensuring fullstack capabilities with clean, scalable code architecture.

## 🔥 Flow Diagram

Frontend (React) → Backend (Node.js + Express) → Database (MongoDB)

## 🛠 Backend Structure

Folder/File |    Purpose

config/db.js |   MongoDB connection setup
models/Expense.js |  Mongoose schema for expenses
services/expenseService.js |  Business logic for expense operations
controllers/expenseController.js |  Handles HTTP request/response
routes/expenseRoutes.js |  Defines API routes
server.js |  Initializes server, middleware, and routes

## 🎨 Frontend Structure

- components/Expenses/ExpenseForm.jsx
- components/Expenses/ExpenseList.jsx
- components/Dashboard/CategoryCharts.jsx
-components/Dashboard/ExpenseSummary.jsx
-components/Dashboard/MonthlyChart.jsx
- pages/ExpensesPage.jsx
- pages/Dashboard.jsx
- services/apiService.js
-utils/helpers.js
-utils/formatters.js
- App.jsx
- index.js

## 📊 Dashboard Visualizations

CategoryChart.jsx: Pie chart to show expenses grouped by category.

MonthlyChart.jsx: Bar chart to show expenses grouped by month.

ExpenseSummary.jsx: Shows quick KPIs like total spent, highest category.
