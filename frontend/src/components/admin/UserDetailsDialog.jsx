import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

function getInitials(name = "") {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function UserDetailsDialog({ user, open, onOpenChange }) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(user._id);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>

          <DialogDescription>
            View information about this user.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile */}
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarImage src={user.profileImage} alt={user.name} />

              <AvatarFallback className="text-base">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate font-semibold">{user.name}</p>

              <p className="truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>

          {/* User Information */}
          <div className="divide-y rounded-lg border">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-sm text-muted-foreground">Role</span>

              <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
                {user.role}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-sm text-muted-foreground">User ID</span>

              <div className="flex min-w-0 items-center gap-2">
                <span className="max-w-\[180px\] truncate text-sm font-medium">
                  {user._id}
                </span>

                <button
                  type="button"
                  onClick={handleCopyId}
                  className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Copy user ID"
                  title={copied ? "Copied" : "Copy user ID"}
                >
                  {copied ? (
                    <Check className="size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UserDetailsDialog;
