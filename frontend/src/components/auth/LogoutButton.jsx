import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "@/lib/store/authStore"

function LogoutButton({ onClose }) {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    onClose?.()
    navigate("/login", { replace: true })
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <LogOut className="size-4" strokeWidth={1.8} />
      <span>Logout</span>
    </button>
  )
}

export default LogoutButton