<script setup>
import { ref, computed, onMounted } from 'vue'
import { currentUser } from '../services/auth.js'
import { fetchCustomerAccounts, fetchAccountStatements, makeTransfer as apiMakeTransfer } from '../services/api.js'

const userName = computed(() => currentUser.value?.username || 'User')
const customerId = computed(() => currentUser.value?.customerId)

const activeSection = ref('welcome')

const accounts = ref([])
const statements = ref([])
const selectedAccountId = ref(null)

const transferForm = ref({
  fromAccountId: '',
  toAccountNumber: '',
  amount: '',
  description: ''
})

const isLoading = ref(false)
const errorMsg = ref(null)
const successMsg = ref(null)

const goBack = () => {
  activeSection.value = 'welcome'
  errorMsg.value = null
  successMsg.value = null
}

const loadAccounts = async () => {
  if (!customerId.value) {
    errorMsg.value = "No customer profile linked to this user."
    return false
  }
  isLoading.value = true
  errorMsg.value = null
  try {
    accounts.value = await fetchCustomerAccounts(customerId.value)
    return true
  } catch (err) {
    errorMsg.value = err.message
    return false
  } finally {
    isLoading.value = false
  }
}

const viewAccounts = async () => {
  activeSection.value = 'accounts'
  await loadAccounts()
}

const openMakeTransfer = async () => {
  activeSection.value = 'transfer'
  await loadAccounts()
  if (accounts.value.length > 0) {
    transferForm.value.fromAccountId = accounts.value[0].accountId
  }
}

const handleTransfer = async () => {
  isLoading.value = true
  errorMsg.value = null
  successMsg.value = null
  try {
    await apiMakeTransfer({
      fromAccountId: parseInt(transferForm.value.fromAccountId),
      toAccountNumber: transferForm.value.toAccountNumber,
      amount: parseFloat(transferForm.value.amount),
      description: transferForm.value.description
    })
    successMsg.value = "Transfer successful!"
    transferForm.value.toAccountNumber = ''
    transferForm.value.amount = ''
    transferForm.value.description = ''
  } catch (err) {
    errorMsg.value = err.message
  } finally {
    isLoading.value = false
  }
}

const viewStatements = async () => {
  activeSection.value = 'statements'
  await loadAccounts()
  if (accounts.value.length > 0) {
    selectedAccountId.value = accounts.value[0].accountId
    await loadStatements()
  }
}

const loadStatements = async () => {
  if (!selectedAccountId.value) return
  isLoading.value = true
  errorMsg.value = null
  try {
    statements.value = await fetchAccountStatements(selectedAccountId.value)
  } catch (err) {
    errorMsg.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="welcome-container">
    
    <div v-if="activeSection === 'welcome'">
      <div class="welcome-hero">
        <h1>Welcome back, <span class="highlight">{{ userName }}</span>!</h1>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <h3>Accounts Overview</h3>
          <p>Check your balances and recent activity across all your accounts.</p>
          <button class="action-btn" @click="viewAccounts">View Accounts</button>
        </div>

        <div class="feature-card">
          <h3>Transfer Funds</h3>
          <p>Send money to other accounts quickly and securely.</p>
          <button class="action-btn" @click="openMakeTransfer">Make Transfer</button>
        </div>

        <div class="feature-card">
          <h3>Account Statement</h3>
          <p>Download and review your monthly statements.</p>
          <button class="action-btn" @click="viewStatements">View Statements</button>
        </div>
      </div>
    </div>

    <!-- Accounts View -->
    <div v-if="activeSection === 'accounts'">
      <h2>My Accounts</h2>
      <button @click="goBack" class="action-btn">Back to Welcome</button>
      
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="errorMsg" style="color: red;">{{ errorMsg }}</div>
      <div v-else>
        <table class="basic-table">
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Currency</th>
              <th>Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="acc in accounts" :key="acc.accountId">
              <td>{{ acc.accountNumber }}</td>
              <td>{{ acc.currency }}</td>
              <td>${{ acc.balance.toFixed(2) }}</td>
              <td>{{ acc.status }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="accounts.length === 0">No accounts found.</p>
      </div>
    </div>

    <!-- Transfer View -->
    <div v-if="activeSection === 'transfer'">
      <h2>Make Transfer</h2>
      <button @click="goBack" class="action-btn">Back to Welcome</button>
      
      <div v-if="errorMsg" style="color: red; margin-top: 10px;">{{ errorMsg }}</div>
      <div v-if="successMsg" style="color: green; margin-top: 10px;">{{ successMsg }}</div>
      
      <form @submit.prevent="handleTransfer" style="margin-top: 20px;">
        <div style="margin-bottom: 10px;">
          <label>From Account:</label><br>
          <select v-model="transferForm.fromAccountId" required>
            <option v-for="acc in accounts" :key="acc.accountId" :value="acc.accountId">
              {{ acc.accountNumber }} - Balance: ${{ acc.balance.toFixed(2) }}
            </option>
          </select>
        </div>
        <div style="margin-bottom: 10px;">
          <label>To Account Number:</label><br>
          <input type="text" v-model="transferForm.toAccountNumber" required />
        </div>
        <div style="margin-bottom: 10px;">
          <label>Amount:</label><br>
          <input type="number" step="0.01" v-model="transferForm.amount" required />
        </div>
        <div style="margin-bottom: 10px;">
          <label>Description:</label><br>
          <input type="text" v-model="transferForm.description" />
        </div>
        <button type="submit" class="action-btn" :disabled="isLoading">Send Transfer</button>
      </form>
    </div>

    <!-- Statements View -->
    <div v-if="activeSection === 'statements'">
      <h2>Account Statements</h2>
      <button @click="goBack" class="action-btn">Back to Welcome</button>
      
      <div style="margin-top: 20px; margin-bottom: 20px;">
        <label>Select Account: </label>
        <select v-model="selectedAccountId" @change="loadStatements">
          <option v-for="acc in accounts" :key="acc.accountId" :value="acc.accountId">
            {{ acc.accountNumber }}
          </option>
        </select>
      </div>

      <div v-if="isLoading">Loading...</div>
      <div v-else-if="errorMsg" style="color: red;">{{ errorMsg }}</div>
      <div v-else>
        <table class="basic-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance Before</th>
              <th>Balance After</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stmt in statements" :key="stmt.transactionId">
              <td>{{ new Date(stmt.transactionDate).toLocaleString() }}</td>
              <td>{{ stmt.description }}</td>
              <!-- Type 2 is DEBIT, subtract. In statements logic typically amount is positive but we can just show amount directly.
                   Wait, to differentiate debit/credit nicely, let's just show it. 
                   If balance before > balance after, it's a debit -->
              <td :style="{ color: stmt.balanceBefore > stmt.balanceAfter ? 'red' : 'green' }">
                {{ stmt.balanceBefore > stmt.balanceAfter ? '-' : '+' }}${{ stmt.amount.toFixed(2) }}
              </td>
              <td>${{ stmt.balanceBefore.toFixed(2) }}</td>
              <td>${{ stmt.balanceAfter.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="statements.length === 0">No transactions found for this account.</p>
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

h2{
  color: #1e293b;
}

td, th, label{
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

.feature-card h3, p {
  color: #1e293b;
  margin-bottom: 5px;
}

.action-btn {
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.basic-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.basic-table th, .basic-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.basic-table th {
  background-color: #f2f2f2;
}

input, select {
  padding: 5px;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
}
</style>
