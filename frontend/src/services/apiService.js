const API_BASE_URL = "http://localhost:8000/api/v1";

export const apiService = {
    // getting all expenses
    async getExpenses() {
        try {
            const response = await fetch(`${API_BASE_URL}/expenses/`);
            if (!response.ok) throw new Error('Failed to fetch expenses');
            return await response.json();
        } catch (error) {
            console.error('Error fetching expenses:', error);
            throw error;
        }
    },

    // creating new expenses
    async createExpense(expense) {
        try {
            const response = await fetch(`${API_BASE_URL}/expenses/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expense)
            })
            if (!response.ok) throw new Error('Failed to create expense');
            return await response.json();
        } catch (error) {
            console.error('Error creating expense:', error);
            throw error;
        }
    },

    // Updating existing expense
    async updateExpense(id, expense) {
        try {
            const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expense),
            });
            if (!response.ok) throw new Error('Failed to update expense');
            return await response.json();
        } catch (error) {
            console.error('Error updating expense:', error);
            throw error;
        }
    },

    // Deleting expense
    async deleteExpense(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete expense');
            return true;
        } catch (error) {
            console.error('Error deleting expense:', error);
            throw error;
        }
    }
}