import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "@/lib/api/authApi"
import useAuthStore from "@/lib/store/authStore"

function useCurrentUser() {
  const token = useAuthStore((state) => state.token)

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: Boolean(token),
    retry: false,
  })
}

export default useCurrentUser