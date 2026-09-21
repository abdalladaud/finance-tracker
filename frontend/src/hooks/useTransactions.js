import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "@/lib/api/transactionApi"

function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  })
}

export default useTransactions