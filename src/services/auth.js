import { ref } from 'vue';

const API_URL = 'http://localhost:5202';

// State
export const currentUser = ref(JSON.parse(localStorage.getItem('user')) || null);

// Actions
export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, passwordHash: password })
    });

    if (!response.ok) {
        throw new Error('Invalid credentials');
    }

    const user = await response.json();
    currentUser.value = user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
};

export const register = async (userData) => {
    // userData might include username, passwordHash, email, userType
    const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: userData.username,
            passwordHash: userData.password, // mapped to passwordHash in backend DTO temporarily
            email: userData.email,
            userType: userData.userType
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
    }

    const user = await response.json();
    currentUser.value = user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
};

export const logout = () => {
    currentUser.value = null;
    localStorage.removeItem('user');
};

export const isAdmin = () => {
    return currentUser.value?.userType === 'ADMIN';
};
