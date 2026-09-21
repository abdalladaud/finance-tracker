import { Eye, Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function getInitials(name = "") {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function UsersTable({
  users = [],
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-foreground">
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  {/* User */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarImage
                          src={user.profileImage}
                          alt={user.name}
                        />

                        <AvatarFallback>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>

                      <span className="">
                        {user.name}
                      </span>
                    </div>
                  </TableCell>

                  {/* Email */}
                  <TableCell >
                    {user.email}
                  </TableCell>

                  {/* Role */}
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
                      {user.role}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => onView?.(user)}
                        className="size-8"
                        aria-label={`View ${user.name}`}
                      >
                        <Eye className="size-4" strokeWidth={1.8} />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit?.(user)}
                        className="size-8"
                        aria-label={`Edit ${user.name}`}
                      >
                        <Pencil className="size-4" strokeWidth={1.8} />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete?.(user)}
                        className="size-8"
                        aria-label={`Delete ${user.name}`}
                      >
                        <Trash2 className="size-4" strokeWidth={1.8} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default UsersTable;