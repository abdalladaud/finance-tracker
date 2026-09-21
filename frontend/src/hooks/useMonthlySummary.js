import { useQuery } from "@tanstack/react-query"
import { getMonthlySummary } from "@/lib/api/transactionApi"

function useMonthlySummary(month) {
  return useQuery({
    queryKey: ["monthlySummary", month],
    queryFn: () => getMonthlySummary(month),
  })
}

export default useMonthlySummary