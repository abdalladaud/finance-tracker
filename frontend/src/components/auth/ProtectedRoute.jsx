import { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import useCurrentUser from "@/hooks/useCurrentUser"
import useAuthStore from "@/lib/store/authStore"

function ProtectedRoute() {
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)

  const { isLoading, isError } = useCurrentUser()

  useEffect(() => {
    if (isError) {
      logout()
    }
  }, [isError, logout])

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading...
        </p>
      </div>
    )
  }

  if (isError) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute