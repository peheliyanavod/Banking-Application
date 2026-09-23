<script setup>
import { ref, onMounted } from 'vue'
import { fetchUsers } from '../services/api'

const users = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    users.value = await fetchUsers()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="list-container">
    <h2>Users</h2>
    
    <div v-if="loading" class="loading">Loading users...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.userId">
          <td>{{ user.userId }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.userType }}</td>
          <td>
            <span :class="['status-badge', user.status?.toLowerCase()]">
              {{ user.status }}
            </span>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="5" class="empty-state">No users found.</td>
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

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: #e9ecef;
  color: #495057;
}

.status-badge.active {
  background-color: #d1e7dd;
  color: #0f5132;
}
</style>
