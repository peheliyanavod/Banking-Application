<script setup>
import { computed } from 'vue'
import { currentUser } from '../services/auth.js'

const userName = computed(() => currentUser.value?.username || 'User')
const userType = computed(() => currentUser.value?.userType || 'CUSTOMER')
</script>

<template>
  <div class="welcome-container">
    <div class="welcome-hero">
      <h1>Welcome back, <span class="highlight">{{ userName }}</span>!</h1>
    </div>

    <div class="features-grid">
      <div class="feature-card">
        <h3>Accounts Overview</h3>
        <p>Check your balances and recent activity across all your accounts.</p>
        <button class="action-btn">View Accounts</button>
      </div>

      <div class="feature-card">
        <h3>Transfer Funds</h3>
        <p>Send money to other accounts quickly and securely.</p>
        <button class="action-btn">Make Transfer</button>
      </div>

      <div class="feature-card">
        <h3>Account Statement</h3>
        <p>Download and review your monthly statements.</p>
        <button class="action-btn">View Statements</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  padding: 20px;
}

.welcome-hero {
  margin-bottom: 20px;
}

.welcome-hero h1{
  color: #1e293b;
}

.features-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.feature-card {
  border: 1px solid #ccc;
  padding: 15px;
}

.feature-card h3, p{
  color: #1e293b;
  margin-bottom: 5px;
}

.action-btn {
  margin-top: 10px;
  padding: 5px 10px;
}
</style>
