<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Dashboard from './components/Dashboard.vue'
import UserList from './components/UserList.vue'
import CustomerList from './components/CustomerList.vue'
import AccountList from './components/AccountList.vue'
import BranchList from './components/BranchList.vue'
import EmployeeList from './components/EmployeeList.vue'
import TransactionList from './components/TransactionList.vue'

const currentView = ref('dashboard')

const handleNavigate = (view) => {
  currentView.value = view
}
</script>

<template>
  <div class="app-container">
    <Navbar :currentView="currentView" @navigate="handleNavigate" />
    
    <main>
      <Dashboard v-if="currentView === 'dashboard'" />
      <UserList v-if="currentView === 'users'" />
      <CustomerList v-if="currentView === 'customers'" />
      <AccountList v-if="currentView === 'accounts'" />
      <BranchList v-if="currentView === 'branches'" />
      <EmployeeList v-if="currentView === 'employees'" />
      <TransactionList v-if="currentView === 'transactions'" />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #f4f6f8;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 2rem;
}
</style>
