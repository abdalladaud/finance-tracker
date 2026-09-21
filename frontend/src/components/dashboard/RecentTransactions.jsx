import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

function RecentTransactions({
  transactions,
  isLoading,
  isError,
}) {
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)

  const formatAmount = (amount) => {
    return `$${Number(amount).toFixed(2)}`
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your latest transactions
          </p>
        </div>

        <Link
          to="/transactions"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ArrowRight
            className="size-4"
            strokeWidth={1.8}
          />
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        {isLoading ? (
          <div className="flex min-h-40 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Loading transactions...
            </p>
          </div>
        ) : isError ? (
          <div className="flex min-h-40 items-center justify-center">
            <p className="text-sm text-destructive">
              Failed to load transactions.
            </p>
          </div>
        ) : recentTransactions.length === 0 ? (
          <div className="flex min-h-40 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No transactions yet
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex items-center justify-between gap-4 px-4 py-3.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {transaction.title}
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {transaction.category} ·{" "}
                    {formatDate(transaction.date)}
                  </p>
                </div>

                <p
                  className={`shrink-0 text-sm font-semibold ${
                    transaction.type === "income"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatAmount(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default RecentTransactions