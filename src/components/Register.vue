<script setup>
import { ref } from 'vue'
import { register } from '../services/auth.js'

const emit = defineEmits(['auth-success', 'switch-to-login'])

const form = ref({
  username: '',
  password: '',
  email: '',
  userType: 'CUSTOMER'
})
const error = ref(null)
const isLoading = ref(false)

const handleRegister = async () => {
  error.value = null
  isLoading.value = true
  try {
    await register(form.value)
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
      <h2>Create Account</h2>
      
      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label>Username</label>
          <input type="text" v-model="form.username" required placeholder="Choose a username" />
        </div>
        
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="form.email" required placeholder="name@example.com" />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="form.password" required placeholder="••••••••" />
        </div>

        <div class="form-group">
          <label>Account Type</label>
          <select v-model="form.userType" class="select-input">
            <option value="CUSTOMER">Customer</option>
            <option value="ADMIN">Administrator</option>
            <!-- Could add EMPLOYEE later -->
          </select>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? 'Creating account...' : 'Register' }}
        </button>
      </form>
      
      <p class="toggle-text">
        Already have an account? 
        <a href="#" @click.prevent="$emit('switch-to-login')">Sign in here</a>
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

input, select {
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
