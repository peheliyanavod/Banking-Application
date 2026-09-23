<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import UserList from './components/UserList.vue'
import CustomerList from './components/CustomerList.vue'

const currentView = ref('users')

const handleNavigate = (view) => {
  currentView.value = view
}
</script>

<template>
  <div class="app-container">
    <Navbar :currentView="currentView" @navigate="handleNavigate" />
    
    <main>
      <UserList v-if="currentView === 'users'" />
      <CustomerList v-if="currentView === 'customers'" />
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
