import { Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

function TransactionTable({
  transactions,
  isLoading,
  isError,
  onEdit,
  onDelete,
}) {
  const formatAmount = (amount) => {
    return `$${Number(amount).toFixed(2)}`;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "2-digit",
    });

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card">
        <div className="flex min-h-40 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Loading transactions...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border bg-card">
        <div className="flex min-h-40 items-center justify-center">
          <p className="text-sm text-destructive">
            Failed to load transactions.
          </p>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border bg-card">
        <div className="flex min-h-40 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No transactions yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border bg-card">
      <Table className="w-full min-w-[560px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[22%] px-3 py-2 text-xs sm:text-sm">
              Title
            </TableHead>

            <TableHead className="w-[16%] px-3 py-2 text-xs sm:text-sm">
              Type
            </TableHead>

            <TableHead className="hidden w-[18%] px-3 py-2 text-xs sm:table-cell sm:text-sm">
              Category
            </TableHead>

            <TableHead className="w-[15%] px-3 py-2 text-xs sm:text-sm">
              Date
            </TableHead>

            <TableHead className="w-[17%] px-3 py-2 text-right text-xs sm:text-sm">
              Amount
            </TableHead>

            <TableHead className="w-[12%] px-3 py-2 text-right text-xs sm:text-sm">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell className="px-3 py-2 text-xs font-medium sm:text-sm">
                <div className="max-w-[160px] truncate">
                  {transaction.title}
                </div>
              </TableCell>

              <TableCell className="px-3 py-2 text-xs sm:text-sm">
                <span
                  className={
                    transaction.type === "income"
                      ? "text-emerald-600/75"
                      : "text-red-600/55"
                  }
                >
                  {transaction.type === "income"
                    ? "Income"
                    : "Expense"}
                </span>
              </TableCell>

              <TableCell className="hidden px-3 py-2 text-xs sm:table-cell sm:text-sm">
                <div className="max-w-[160px] truncate">
                  {transaction.category}
                </div>
              </TableCell>

              <TableCell className="whitespace-nowrap px-3 py-2 text-xs text-muted-foreground sm:text-sm">
                {formatDate(transaction.date)}
              </TableCell>

              <TableCell
                className={`whitespace-nowrap px-3 py-2 text-right text-xs font-medium sm:text-sm ${
                  transaction.type === "income"
                    ? "text-emerald-600/75"
                    : "text-red-600/55"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatAmount(transaction.amount)}
              </TableCell>

              <TableCell className="px-3 py-2">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(transaction)}
                    className="size-7 sm:size-8"
                  >
                    <Pencil
                      className="size-3.5 sm:size-4"
                      strokeWidth={1.8}
                    />

                    <span className="sr-only">
                      Edit transaction
                    </span>
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(transaction)}
                    className="size-7 text-muted-foreground hover:text-destructive sm:size-8"
                  >
                    <Trash2
                      className="size-3.5 sm:size-4"
                      strokeWidth={1.8}
                    />

                    <span className="sr-only">
                      Delete transaction
                    </span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TransactionTable;