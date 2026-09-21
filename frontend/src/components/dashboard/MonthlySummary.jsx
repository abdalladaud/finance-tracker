function MonthlySummary({
  selectedMonth,
  onMonthChange,
  monthlyIncome,
  monthlyExpenses,
  isLoading,
}) {
  const formatAmount = (amount) => {
    return `$${Number(amount).toFixed(2)}`
  }

  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">
            Monthly Summary
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your transaction summary
          </p>
        </div>

        <div>
          <label htmlFor="month" className="sr-only">
            Select month
          </label>

          <input
            id="month"
            type="month"
            value={selectedMonth}
            onChange={(event) => {
              onMonthChange(event.target.value)
            }}
            className="h-9 w-\[155px\] rounded-md border bg-background px-3 text-sm font-medium outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="grid grid-cols-2 border-b bg-muted/30">
          <div className="border-r px-4 py-2.5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Income
            </p>
          </div>

          <div className="px-4 py-2.5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Expenses
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="border-r px-4 py-4">
            <p className="text-xl font-semibold">
              {isLoading
                ? "..."
                : formatAmount(monthlyIncome)}
            </p>
          </div>

          <div className="px-4 py-4">
            <p className="text-xl font-semibold">
              {isLoading
                ? "..."
                : formatAmount(monthlyExpenses)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MonthlySummary