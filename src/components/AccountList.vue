<script setup>
import { ref, onMounted } from 'vue'
import { fetchAccounts } from '../services/api'

const accounts = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    accounts.value = await fetchAccounts()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="list-container">
    <h2>Accounts</h2>
    
    <div v-if="loading" class="loading">Loading accounts...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Account Number</th>
          <th>Customer ID</th>
          <th>Branch ID</th>
          <th>Balance</th>
          <th>Currency</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="account in accounts" :key="account.accountId">
          <td>{{ account.accountId }}</td>
          <td>{{ account.accountNumber }}</td>
          <td>{{ account.customerId }}</td>
          <td>{{ account.branchId }}</td>
          <td>{{ account.balance }}</td>
          <td>{{ account.currency }}</td>
          <td>{{ account.status }}</td>
        </tr>
        <tr v-if="accounts.length === 0">
          <td colspan="7" class="empty-state">No accounts found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.list-container {
  padding: 0 2rem;
}

h2 {
  margin-bottom: 1rem;
  color: #212529;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.data-table th, .data-table td {
  padding: 1rem;
  text-align: left;
  color: #212529;
  border-bottom: 1px solid #dee2e6;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #495057;
}

.data-table tr:hover {
  background-color: #f8f9fa;
}

.loading, .error, .empty-state {
  padding: 2rem;
  text-align: center;
  color: #6c757d;
}

.error {
  color: #dc3545;
}
</style>
