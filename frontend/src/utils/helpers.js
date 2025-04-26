import { CATEGORIES } from "../constants/categories";

export const generateId = () => `exp-${Math.random().toString(36).substring(2, 9)}`;

export const getCategoryColor = (categoryName) => {
    const category = CATEGORIES.find(item => item.name === categoryName);
    return category ? category.color : '#000000';
}

export const INITIAL_FORM_STATE = {
    amount:"",
    category:'Groceries',
    description: "",
    date: new Date().toISOString().split('T')[0]
}