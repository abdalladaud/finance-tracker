import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getAdminUsers,
  updateAdminUser,
  deleteAdminUser,
} from "@/lib/api/adminApi";
import UsersTable from "@/components/admin/UsersTable";

import DeleteUserDialog from "@/components/admin/DeleteUserDialog";

import { useState } from "react";
import UserDetailsDialog from "@/components/admin/UserDetailsDialog";
import EditUserDialog from "@/components/admin/EditUserDialog";

function AdminUsers() {
  //view user
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  //Edit user
  const [editOpen, setEditOpen] = useState(false);

  //delete user
  const [deleteOpen, setDeleteOpen] = useState(false);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ userId, userData }) => updateAdminUser(userId, userData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminUsers"],
      });

      toast.success("User updated successfully");

      setEditOpen(false);
      setSelectedUser(null);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update user.");
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (userId) => deleteAdminUser(userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminUsers"],
      });

      toast.success("User deleted successfully");

      setDeleteOpen(false);
      setSelectedUser(null);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete user.");
    },
  });

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: getAdminUsers,
  });

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex min-h-\[300px\] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
          <p className="text-sm text-destructive">Failed to load users.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Users
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage users in your finance tracker.
        </p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">
          <UsersTable
            users={users}
            onView={(user) => {
              setSelectedUser(user);
              setDetailsOpen(true);
            }}
            onEdit={(user) => {
              setSelectedUser(user);
              setEditOpen(true);
            }}
            onDelete={(user) => {
              setSelectedUser(user);
              setDeleteOpen(true);
            }}
          />

          <UserDetailsDialog
            user={selectedUser}
            open={detailsOpen}
            onOpenChange={(open) => {
              setDetailsOpen(open);

              if (!open) {
                setSelectedUser(null);
              }
            }}
          />

          <EditUserDialog
            user={selectedUser}
            open={editOpen}
            onOpenChange={(open) => {
              setEditOpen(open);

              if (!open) {
                setSelectedUser(null);
              }
            }}
            isSaving={updateMutation.isPending}
            onSave={(userData) => {
              updateMutation.mutate({
                userId: selectedUser._id,
                userData,
              });
            }}
          />

          <DeleteUserDialog
            user={selectedUser}
            open={deleteOpen}
            onOpenChange={(open) => {
              setDeleteOpen(open);

              if (!open) {
                setSelectedUser(null);
              }
            }}
            isDeleting={deleteMutation.isPending}
            onConfirm={() => {
              deleteMutation.mutate(selectedUser._id);
            }}
          />
        </p>
      </div>
    </div>
  );
}

export default AdminUsers;
