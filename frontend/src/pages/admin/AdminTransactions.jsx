import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdminTransactions } from "@/lib/api/adminApi";
import TransactionsTable from "@/components/admin/TransactionsTable";

function AdminTransactions() {
  const [expandedUserId, setExpandedUserId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminTransactions"],
    queryFn: getAdminTransactions,
  });

  const transactions = Array.isArray(data) ? data : [];

  const users = useMemo(() => {
    const grouped = new Map();

    transactions.forEach((transaction) => {
      const user = transaction.user;

      if (!user?._id) return;

      if (!grouped.has(user._id)) {
        grouped.set(user._id, {
          user,
          transactions: [],
          totalIncome: 0,
          totalExpenses: 0,
        });
      }

      const currentUser = grouped.get(user._id);

      currentUser.transactions.push(transaction);

      if (transaction.type === "income") {
        currentUser.totalIncome += Number(transaction.amount) || 0;
      }

      if (transaction.type === "expense") {
        currentUser.totalExpenses += Number(transaction.amount) || 0;
      }
    });

    return Array.from(grouped.values()).map((item) => ({
      ...item,
      transactionCount: item.transactions.length,
      net: item.totalIncome - item.totalExpenses,
    }));
  }, [transactions]);

  const handleToggleUser = (userId) => {
    setExpandedUserId((currentId) =>
      currentId === userId ? null : userId
    );
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Transactions
        </h1>

        <p className="text-sm text-muted-foreground">
          View transaction activity by user.
        </p>
      </div>

      <TransactionsTable
        users={users}
        expandedUserId={expandedUserId}
        onToggleUser={handleToggleUser}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default AdminTransactions;