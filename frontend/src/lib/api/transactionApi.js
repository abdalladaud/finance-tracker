import api from "./apiclient"

// Get all transactions for the authenticated user
export const getTransactions = async () => {
  const response = await api.get("/transactions")
  return response.data
}

// Get a single transaction by ID
export const getTransaction = async (id) => {
  const response = await api.get(`/transactions/${id}`)
  return response.data
}

// Get monthly transaction summary
export const getMonthlySummary = async (month) => {
  const response = await api.get("/transactions/monthly-summary", {
    params: month ? { month } : {},
  })

  return response.data
}

// Create a new transaction
export const createTransaction = async (transactionData) => {
  const response = await api.post("/transactions", transactionData)
  return response.data
}

// Update a transaction
export const updateTransaction = async ({ id, transactionData }) => {
  const response = await api.put(
    `/transactions/${id}`,
    transactionData
  )

  return response.data
}

// Delete a transaction
export const deleteTransaction = async (id) => {
  const response = await api.delete(`/transactions/${id}`)
  return response.data
}