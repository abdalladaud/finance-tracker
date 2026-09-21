import { useState } from "react";
// import { Plus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import TransactionForm from "@/components/transactions/TransactionForm";
import TransactionTable from "@/components/transactions/TransactionTable";
import { toast } from "sonner";

import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "@/lib/api/transactionApi";

const emptyForm = {
  title: "",
  amount: "",
  type: "expense",
  category: "",
  date: "",
};

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function TransactionsPage() {
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState(emptyForm);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const {
    data: transactions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const createMutation = useMutation({
    mutationFn: createTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      toast.success("Transaction added successfully");

      setDialogOpen(false);
      setFormValues(emptyForm);
    },

    onError: () => {
      toast.error("Failed to add transaction");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      toast.success("Transaction updated successfully");

      setDialogOpen(false);
      setEditingTransaction(null);
      setFormValues(emptyForm);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      toast.success("Transaction deleted successfully");
    },
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenCreate = () => {
    setEditingTransaction(null);
    setFormValues(emptyForm);
    setDialogOpen(true);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);

    setFormValues({
      title: transaction.title || "",
      amount: transaction.amount || "",
      type: transaction.type || "expense",
      category: transaction.category || "",
      date: transaction.date
        ? new Date(transaction.date).toISOString().split("T")[0]
        : "",
    });

    setDialogOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const transactionData = {
      title: formValues.title,
      amount: Number(formValues.amount),
      type: formValues.type,
      category: formValues.category,
      date: formValues.date,
    };

    if (editingTransaction) {
      updateMutation.mutate({
        id: editingTransaction._id,
        transactionData,
      });

      return;
    }

    createMutation.mutate(transactionData);
  };

  const handleDelete = (transaction) => {
    setTransactionToDelete(transaction);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Transactions
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your income and expenses
          </p>
        </div>


        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);

            if (!open) {
              setEditingTransaction(null);
              setFormValues(emptyForm);
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
            {/* <Plus className="size-3.5 sm:size-4" strokeWidth={1.8} /> */}

            <span>Add Transaction</span>
          </DialogTrigger>

          <DialogContent className=".sm\:max-w-\[520px\]">
            <DialogHeader>
              <DialogTitle>
                {editingTransaction ? "Edit Transaction" : "Add Transaction"}
              </DialogTitle>

              <DialogDescription>
                {editingTransaction
                  ? "Update the details of this transaction."
                  : "Add a new income or expense transaction."}
              </DialogDescription>
            </DialogHeader>

            <TransactionForm
              formValues={formValues}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              isEditing={Boolean(editingTransaction)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* DeleteCOnfirmation */}

      <AlertDialog
        open={Boolean(transactionToDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setTransactionToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete transaction?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                "{transactionToDelete?.title}"
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                if (!transactionToDelete) return;

                deleteMutation.mutate(transactionToDelete._id);

                setTransactionToDelete(null);
              }}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Transactions Table */}
      <TransactionTable
        transactions={transactions}
        isLoading={isLoading}
        isError={isError}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default TransactionsPage;
