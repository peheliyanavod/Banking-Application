const API_URL = 'http://localhost:5202';

export const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
};

export const fetchCustomers = async () => {
    const response = await fetch(`${API_URL}/customers`);
    if (!response.ok) throw new Error('Failed to fetch customers');
    return response.json();
};

export const fetchAccounts = async () => {
    const response = await fetch(`${API_URL}/accounts`);
    if (!response.ok) throw new Error('Failed to fetch accounts');
    return response.json();
};

export const fetchBranches = async () => {
    const response = await fetch(`${API_URL}/branches`);
    if (!response.ok) throw new Error('Failed to fetch branches');
    return response.json();
};

export const fetchEmployees = async () => {
    const response = await fetch(`${API_URL}/employees`);
    if (!response.ok) throw new Error('Failed to fetch employees');
    return response.json();
};

export const fetchTransactions = async () => {
    const response = await fetch(`${API_URL}/transactions`);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
};
