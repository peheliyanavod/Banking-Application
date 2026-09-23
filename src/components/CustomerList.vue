<script setup>
import { ref, onMounted } from 'vue'
import { fetchCustomers } from '../services/api'

const customers = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    customers.value = await fetchCustomers()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="list-container">
    <h2>Customers</h2>
    
    <div v-if="loading" class="loading">Loading customers...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>NIC</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Branch</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.customerId">
          <td>{{ customer.customerId }}</td>
          <td>{{ customer.firstName }} {{ customer.lastName }}</td>
          <td>{{ customer.nic }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.branchID }}</td>
        </tr>
        <tr v-if="customers.length === 0">
          <td colspan="6" class="empty-state">No customers found.</td>
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
