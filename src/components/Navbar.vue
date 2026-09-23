<script setup>
defineProps({
  currentView: String
})
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">
      Bank App Admin
    </div>
    <div class="navbar-menu">
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
</style>
