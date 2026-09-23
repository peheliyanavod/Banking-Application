<script setup>
import { ref, computed } from 'vue'
import { currentUser, isAdmin } from './services/auth.js'
import Navbar from './components/Navbar.vue'
import Dashboard from './components/Dashboard.vue'
import UserList from './components/UserList.vue'
import CustomerList from './components/CustomerList.vue'
import AccountList from './components/AccountList.vue'
import BranchList from './components/BranchList.vue'
import EmployeeList from './components/EmployeeList.vue'
import TransactionList from './components/TransactionList.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Welcome from './components/Welcome.vue'

const currentView = ref('dashboard')
const authView = ref('login') // 'login' or 'register'

const handleNavigate = (view) => {
  currentView.value = view
}

const handleAuthSuccess = () => {
  currentView.value = isAdmin() ? 'dashboard' : 'welcome'
}

const showAdminViews = computed(() => currentUser.value && isAdmin())
const showWelcomeView = computed(() => currentUser.value && !isAdmin())
</script>

<template>
  <div class="app-container">
    <div v-if="!currentUser">
      <Login 
        v-if="authView === 'login'" 
        @auth-success="handleAuthSuccess" 
        @switch-to-register="authView = 'register'" 
      />
      <Register 
        v-if="authView === 'register'" 
        @auth-success="handleAuthSuccess" 
        @switch-to-login="authView = 'login'" 
      />
    </div>

    <div v-else>
      <Navbar :currentView="currentView" @navigate="handleNavigate" />
      
      <main>
        <!-- Admin Views -->
        <template v-if="showAdminViews">
          <Dashboard v-if="currentView === 'dashboard'" />
          <UserList v-if="currentView === 'users'" />
          <CustomerList v-if="currentView === 'customers'" />
          <AccountList v-if="currentView === 'accounts'" />
          <BranchList v-if="currentView === 'branches'" />
          <EmployeeList v-if="currentView === 'employees'" />
          <TransactionList v-if="currentView === 'transactions'" />
        </template>
        
        <!-- Non-Admin Views -->
        <template v-if="showWelcomeView">
          <Welcome />
        </template>
      </main>
    </div>
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
