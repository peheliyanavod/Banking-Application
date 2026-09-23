<script setup>
import { computed } from 'vue'
import { currentUser, isAdmin, logout } from '../services/auth.js'

defineProps({
  currentView: String
})

const showAdminLinks = computed(() => isAdmin())

const handleLogout = () => {
  logout()
  // App.vue reactivity will automatically hide the dashboard and show the login page
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">
      Bank App
    </div>
    <div class="navbar-menu">
      <template v-if="showAdminLinks">
        <button 
          :class="{ active: currentView === 'dashboard' }" 
          @click="$emit('navigate', 'dashboard')"
        >
          Dashboard
        </button>
        <button 
          :class="{ active: currentView === 'users' }" 
          @click="$emit('navigate', 'users')"
        >
          Users
        </button>
        <button 
          :class="{ active: currentView === 'customers' }" 
          @click="$emit('navigate', 'customers')"
        >
          Customers
        </button>
        <button 
          :class="{ active: currentView === 'accounts' }" 
          @click="$emit('navigate', 'accounts')"
        >
          Accounts
        </button>
        <button 
          :class="{ active: currentView === 'branches' }" 
          @click="$emit('navigate', 'branches')"
        >
          Branches
        </button>
        <button 
          :class="{ active: currentView === 'employees' }" 
          @click="$emit('navigate', 'employees')"
        >
          Employees
        </button>
        <button 
          :class="{ active: currentView === 'transactions' }" 
          @click="$emit('navigate', 'transactions')"
        >
          Transactions
        </button>
      </template>

      <div class="user-info">
        <span class="user-greeting">Hi, {{ currentUser?.username }}</span>
        <button class="logout-btn" @click="handleLogout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 2rem;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #212529;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-menu button {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  font-size: 1rem;
  cursor: pointer;
  color: #495057;
  border-radius: 4px;
}

.navbar-menu button:hover {
  background-color: #e9ecef;
}

.navbar-menu button.active {
  background-color: #0d6efd;
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  margin-left: 2rem;
  padding-left: 2rem;
  border-left: 1px solid #dee2e6;
}

.user-greeting {
  font-weight: 500;
  color: #495057;
  margin-right: 1rem;
}

.logout-btn {
  background-color: #f8d7da !important;
  color: #842029 !important;
  font-weight: bold;
}

.logout-btn:hover {
  background-color: #f5c2c7 !important;
}
</style>
