// formating currency and formateDate and Monthyear


export const formatCurrency = (amount) => `$${parseFloat(amount).toFixed(2)}`;

export const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

export const formatMonthYear = (dateString) => {
    const [year, month] = dateString.split('-');
    return `${month}/${year.substring(2)}`;
}