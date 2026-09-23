const API_URL = 'http://localhost:5202';

export const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};

export const fetchCustomers = async () => {
    const response = await fetch(`${API_URL}/customers`);
    if (!response.ok) {
        throw new Error('Failed to fetch customers');
    }
    return response.json();
};
