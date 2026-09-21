import { useState } from "react";
// import { Plus } from "lucide-react";
// import { Link } from "react-router-dom";

import SummaryCards from "@/components/dashboard/SummaryCards";
import MonthlySummary from "@/components/dashboard/MonthlySummary";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

import useTransactions from "@/hooks/useTransactions";
import useMonthlySummary from "@/hooks/useMonthlySummary";

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import TransactionForm from "@/components/transactions/TransactionForm"
import { createTransaction } from "@/lib/api/transactionApi"

function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();

    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0",
    )}`;
  });

  // Transaction section Create
  const queryClient = useQueryClient()

const [dialogOpen, setDialogOpen] = useState(false)

const [formValues, setFormValues] = useState({
  title: "",
  amount: "",
  type: "expense",
  category: "",
  date: "",
})

const createMutation = useMutation({
  mutationFn: createTransaction,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["transactions"],
    })

    queryClient.invalidateQueries({
      queryKey: ["monthlySummary"],
    })

    toast.success("Transaction added successfully")

    setDialogOpen(false)

    setFormValues({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: "",
    })
  },

  onError: () => {
    toast.error("Failed to add transaction")
  },
})

//

  const { data: transactions = [], isLoading, isError } = useTransactions();

  const { data: monthlySummary, isLoading: isMonthlyLoading } =
    useMonthlySummary(selectedMonth);

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const currentBalance = totalIncome - totalExpenses;

  const monthlyIncome =
    monthlySummary?.summary
      ?.filter((item) => item._id.type === "income")
      .reduce((total, item) => total + item.total, 0) || 0;

  const monthlyExpenses =
    monthlySummary?.summary
      ?.filter((item) => item._id.type === "expense")
      .reduce((total, item) => total + item.total, 0) || 0;


  
  // handleInputChange and handleSUbmit
  const handleInputChange = (event) => {
  const { name, value } = event.target

  setFormValues((prev) => ({
    ...prev,
    [name]: value,
  }))
}

const handleSubmit = (event) => {
  event.preventDefault()

  const transactionData = {
    title: formValues.title,
    amount: Number(formValues.amount),
    type: formValues.type,
    category: formValues.category,
    date: formValues.date,
  }

  createMutation.mutate(transactionData)
}

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Overview of your finances
          </p>
        </div>

        {/* Transaction Dialog in dashbaord */}

        <Dialog
  open={dialogOpen}
  onOpenChange={(open) => {
    setDialogOpen(open)

    if (!open) {
      setFormValues({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        date: "",
      })
    }
  }}
>
  <DialogTrigger
    render={
      <Button
        type="button"
        className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md bg-foreground px-2.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90 sm:px-4 sm:text-sm"
      />
    }
  >
    {/* <Plus
      className="size-3.5 sm:size-4"
      strokeWidth={1.8}
    /> */}

    <span>Add Transaction</span>
  </DialogTrigger>

  <DialogContent className="sm\:max-w-\[520px\]">
    <DialogHeader>
      <DialogTitle>Add Transaction</DialogTitle>

      <DialogDescription>
        Add a new income or expense transaction.
      </DialogDescription>
    </DialogHeader>

    <TransactionForm
      formValues={formValues}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      isLoading={createMutation.isPending}
      isEditing={false}
    />
  </DialogContent>
</Dialog>
      </div>

      {/* Summary Cards */}
      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        currentBalance={currentBalance}
      />

      {/* Monthly Summary */}
      <MonthlySummary
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        monthlyIncome={monthlyIncome}
        monthlyExpenses={monthlyExpenses}
        isLoading={isMonthlyLoading}
      />

      {/* Recent Transactions */}
      <RecentTransactions
        transactions={transactions}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default DashboardPage;
