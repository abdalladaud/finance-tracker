import { useQuery } from "@tanstack/react-query";
import {
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import AdminStatCard from "@/components/admin/AdminStatCard";
import { getAdminOverview } from "@/lib/api/adminApi";

function AdminDashboard() {
  const {
    data: overview,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: getAdminOverview,
  });

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount ?? 0);
  };

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Loading admin overview...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
          <p className="text-sm text-destructive">
            Failed to load admin overview.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Admin Overview
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor your finance tracker at a glance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AdminStatCard
          title="Total Users"
          value={overview?.totalUsers ?? 0}
          icon={Users}
        />

        <AdminStatCard
          title="Total Income"
          value={formatAmount(overview?.totalIncome)}
          icon={TrendingUp}
        />

        <AdminStatCard
          title="Total Expenses"
          value={formatAmount(overview?.totalExpenses)}
          icon={TrendingDown}
        />
      </div>

      {/* Top Spending Categories */}
      <div className="rounded-xl border bg-card">
        <div className="border-b px-6 py-5">
          <h2 className="font-semibold tracking-tight">
            Top Spending Categories
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Categories with the highest total spending.
          </p>
        </div>

        <div className="divide-y">
          {overview?.topSpendingCategories?.length > 0 ? (
            overview.topSpendingCategories.map((category, index) => (
              <div
                key={category._id ?? category.category ?? index}
                className="flex items-center justify-between gap-4 px-6 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
                    {index + 1}
                  </div>

                  <span className="truncate text-sm font-medium">
                    {category.name ??
                      category.category ??
                      category._id ??
                      "Unknown"}
                  </span>
                </div>

                <span className="shrink-0 text-sm font-medium">
                  {formatAmount(category.total ?? category.amount)}
                </span>
              </div>
            ))
          ) : (
            <div className="px-6 py-10 text-center">
              <p className="text-sm text-muted-foreground">
                No spending category data available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;