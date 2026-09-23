<script setup>
import { ref } from 'vue'
import { login } from '../services/auth.js'

const emit = defineEmits(['auth-success', 'switch-to-register'])

const username = ref('')
const password = ref('')
const error = ref(null)
const isLoading = ref(false)

const handleLogin = async () => {
  error.value = null
  isLoading.value = true
  try {
    await login(username.value, password.value)
    emit('auth-success')
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Login</h2>
      <p class="subtitle">Please enter your details to sign in.</p>
      
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label>Username</label>
          <input type="text" v-model="username" required placeholder="Enter username" />
        </div>
        
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="password" required placeholder="••••••••" />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
      
      <p class="toggle-text">
        Don't have an account? 
        <a href="#" @click.prevent="$emit('switch-to-register')">Register here</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  padding: 20px;
}

.auth-card {
  border: 1px solid #ccc;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.auth-card h2 {
  color: #1e293b;
}

.auth-card p {
  color: #1e293b;
}

.auth-form {
  margin-top: 15px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #1e293b;
}

input {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}

.submit-btn {
  margin-top: 10px;
  padding: 8px 12px;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.toggle-text {
  margin-top: 15px;
}
</style>
