export const getFieldErrors = (error) => {
  return error?.response?.data?.errors || {}
}

export const getErrorMessage = (error) => {
  const data = error?.response?.data

  if (!data) {
    return "Something went wrong. Please try again."
  }

  return data.message || "Something went wrong. Please try again."
}