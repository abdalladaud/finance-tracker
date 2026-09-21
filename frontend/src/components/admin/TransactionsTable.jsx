import { Fragment } from "react";
import {
  ChevronDown,
  ChevronRight,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function getInitials(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(date) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function TransactionsTable({
  users = [],
  expandedUserId,
  onToggleUser,
  isLoading,
  isError,
}) {
  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">Loading transactions...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Failed to load transactions.
        </p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-10 text-center">
        <p className="text-sm text-muted-foreground">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Transactions</TableHead>
              <TableHead>Income</TableHead>
              <TableHead>Expenses</TableHead>
              <TableHead>Net</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((item) => {
              const userId = item.user._id;
              const isExpanded = expandedUserId === userId;

              return (
                <Fragment key={userId}>
                  {/* User row */}
                  <TableRow
                    className="cursor-pointer transition-colors hover:bg-muted/40"
                    onClick={() => onToggleUser(userId)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {isExpanded ? (
                          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                        )}

                        <Avatar className="size-9">
                          <AvatarImage
                            src={item.user.profileImage}
                            alt={item.user.name}
                          />

                          <AvatarFallback>
                            {getInitials(item.user.name)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate">{item.user.name}</p>

                          <p className="truncate text-xs text-muted-foreground">
                            {item.user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="">{item.transactionCount}</span>
                    </TableCell>

                    <TableCell className="">
                      {formatCurrency(item.totalIncome)}
                    </TableCell>

                    <TableCell className="">
                      {formatCurrency(item.totalExpenses)}
                    </TableCell>

                    <TableCell className="">
                      {formatCurrency(item.net)}
                    </TableCell>
                  </TableRow>

                  {/* Expanded transactions */}
                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={5} className="bg-muted/20 p-0">
                        <div className="space-y-3 p-4 sm:p-5">
                          <div>
                            <h3 className="">{item.user.name}</h3>

                            <p className="text-sm text-muted-foreground">
                              {item.transactionCount} transactions
                            </p>
                          </div>

                          <div className="overflow-hidden rounded-lg border bg-background">
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Transaction</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                  </TableRow>
                                </TableHeader>

                                <TableBody>
                                  {item.transactions.map((transaction) => {
                                    const isIncome =
                                      transaction.type === "income";

                                    return (
                                      <TableRow key={transaction._id}>
                                        <TableCell>
                                          <div className="flex items-center gap-3">
                                            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                                              {isIncome ? (
                                                <ArrowDownLeft className="size-4 text-muted-foreground" />
                                              ) : (
                                                <ArrowUpRight className="size-4 text-muted-foreground" />
                                              )}
                                            </div>

                                            <p className="truncate">
                                              {transaction.title ||
                                                transaction.category ||
                                                "Transaction"}
                                            </p>
                                          </div>
                                        </TableCell>

                                        <TableCell className="capitalize">
                                          {transaction.type}
                                        </TableCell>

                                        <TableCell className="font-medium">
                                          {formatCurrency(
                                            Number(transaction.amount) || 0,
                                          )}
                                        </TableCell>

                                        <TableCell className="whitespace-nowrap text-muted-foreground">
                                          {formatDate(transaction.date)}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TransactionsTable;
