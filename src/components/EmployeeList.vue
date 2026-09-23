<script setup>
import { ref, onMounted } from 'vue'
import { fetchEmployees } from '../services/api'

const employees = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    employees.value = await fetchEmployees()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="list-container">
    <h2>Employees</h2>
    
    <div v-if="loading" class="loading">Loading employees...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Emp Number</th>
          <th>Name</th>
          <th>Email</th>
          <th>Job Title</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.employeeId">
          <td>{{ emp.employeeId }}</td>
          <td>{{ emp.employeeNumber }}</td>
          <td>{{ emp.firstName }} {{ emp.lastName }}</td>
          <td>{{ emp.email }}</td>
          <td>{{ emp.jobTitle }}</td>
          <td>{{ emp.status }}</td>
        </tr>
        <tr v-if="employees.length === 0">
          <td colspan="6" class="empty-state">No employees found.</td>
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
