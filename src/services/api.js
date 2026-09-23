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

export const fetchCustomerAccounts = async (customerId) => {
    const response = await fetch(`${API_URL}/accounts/customer/${customerId}`);
    if (!response.ok) throw new Error('Failed to fetch customer accounts');
    return response.json();
};

export const fetchAccountStatements = async (accountId) => {
    const response = await fetch(`${API_URL}/transactions/account/${accountId}`);
    if (!response.ok) throw new Error('Failed to fetch account statements');
    return response.json();
};

export const makeTransfer = async (transferData) => {
    const response = await fetch(`${API_URL}/transactions/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transferData)
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to make transfer');
    }
    
    return response.json();
};
