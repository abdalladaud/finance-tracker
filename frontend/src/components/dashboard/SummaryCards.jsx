import {
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
} from "lucide-react"

function SummaryCards({
  totalIncome,
  totalExpenses,
  currentBalance,
}) {
  const formatAmount = (amount) => `$${Number(amount).toFixed(2)}`

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Total Income */}
      <div className="rounded-xl border bg-card p-6 transition-transform duration-200 hover:-translate-y-0.5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Income
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight">
              {formatAmount(totalIncome)}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              All income
            </p>
          </div>

          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <ArrowDownLeft
              className="size-5 text-muted-foreground"
              strokeWidth={1.8}
            />
          </div>
        </div>
      </div>

      {/* Total Expenses */}
      <div className="rounded-xl border bg-card p-6 transition-transform duration-200 hover:-translate-y-0.5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight">
              {formatAmount(totalExpenses)}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              All expenses
            </p>
          </div>

          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <ArrowUpRight
              className="size-5 text-muted-foreground"
              strokeWidth={1.8}
            />
          </div>
        </div>
      </div>

      {/* Current Balance */}
      <div className="rounded-xl border bg-card p-6 transition-transform duration-200 hover:-translate-y-0.5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Current Balance
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight">
              {formatAmount(currentBalance)}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Income minus expenses
            </p>
          </div>

          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <Wallet
              className="size-5 text-muted-foreground"
              strokeWidth={1.8}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryCards