import { Link } from "react-router-dom";

import useAuthStore from "@/lib/store/authStore";

function UserProfile() {
  const user = useAuthStore((state) => state.user);

  const name = user?.name || "User";
  const initial = name.charAt(0).toUpperCase();

  return (
    <Link
      to="/profile"
      className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/50"
    >
      <div className="flex size-9 items-center justify-center overflow-hidden rounded-full border bg-muted">
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt={name}
            className="size-full object-cover"
          />
        ) : (
          <span className="text-sm font-medium text-muted-foreground">
            {initial}
          </span>
        )}
      </div>

      <div className="hidden min-w-0 sm:block">
        <p className="truncate text-sm font-medium">
          {name}
        </p>

        <p className="truncate text-xs text-muted-foreground">
          {user?.email}
        </p>
      </div>
    </Link>
  );
}

export default UserProfile;