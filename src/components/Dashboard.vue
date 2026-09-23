<script setup>
import { ref, onMounted } from 'vue'
import { 
  fetchUsers, 
  fetchCustomers, 
  fetchAccounts, 
  fetchBranches, 
  fetchEmployees, 
  fetchTransactions 
} from '../services/api'

const stats = ref({
  users: 0,
  customers: 0,
  accounts: 0,
  branches: 0,
  employees: 0,
  transactions: 0
})

const loading = ref(true)

onMounted(async () => {
  try {
    const [users, customers, accounts, branches, employees, transactions] = await Promise.all([
      fetchUsers().catch(() => []),
      fetchCustomers().catch(() => []),
      fetchAccounts().catch(() => []),
      fetchBranches().catch(() => []),
      fetchEmployees().catch(() => []),
      fetchTransactions().catch(() => [])
    ])
    
    stats.value = {
      users: users.length,
      customers: customers.length,
      accounts: accounts.length,
      branches: branches.length,
      employees: employees.length,
      transactions: transactions.length
    }
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="dashboard">
    <h2>Dashboard Overview</h2>
    
    <div v-if="loading" class="loading">Loading stats...</div>
    
    <div v-else class="stats-grid">
      <div class="stat-card">
        <h3>Total Users</h3>
        <p class="stat-value">{{ stats.users }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Customers</h3>
        <p class="stat-value">{{ stats.customers }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Accounts</h3>
        <p class="stat-value">{{ stats.accounts }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Branches</h3>
        <p class="stat-value">{{ stats.branches }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Employees</h3>
        <p class="stat-value">{{ stats.employees }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Transactions</h3>
        <p class="stat-value">{{ stats.transactions }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 0 2rem;
}

h2 {
  margin-bottom: 2rem;
  color: #212529;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-card h3 {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #0d6efd;
  margin: 0;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}
</style>
