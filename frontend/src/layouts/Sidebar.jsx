import { useRef } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  UserRound,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import LogoutButton from "@/components/auth/LogoutButton";
import useAuthStore from "@/lib/store/authStore";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Categories",
    href: "/categories",
    icon: Tags,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserRound,
  },
];

function Sidebar({ mobileMenuOpen, onClose }) {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "admin";

  const touchStart = useRef({ x: 0, y: 0 });

  const handleTouchStart = (event) => {
    const touch = event.touches[0];

    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];

    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;

    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    const swipeDistance = Math.abs(deltaX);

    if (isHorizontalSwipe && deltaX < 0 && swipeDistance > 60) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/20 transition-opacity duration-200 md:hidden ${
          mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <aside
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col border-r bg-sidebar transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-6">
          <span className="text-lg font-semibold tracking-tight">
            Finance Tracker
          </span>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 items-center justify-center rounded-md hover:bg-muted md:hidden"
            aria-label="Close navigation"
          >
            <X className="size-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-6">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`
                  }
                >
                  <Icon className="size-4" strokeWidth={1.8} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Admin Section */}
          {isAdmin && (
            <div className="mt-8">
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Admin
              </p>

              <div className="space-y-1">
                <NavLink
                  to="/admin"
                  end
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`
                  }
                >
                  <ShieldCheck className="size-4" strokeWidth={1.8} />
                  <span>Overview</span>
                </NavLink>

                <NavLink
                  to="/admin/users"
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`
                  }
                >
                  <Users className="size-4" strokeWidth={1.8} />
                  <span>Users</span>
                </NavLink>

                <NavLink
                  to="/admin/transactions"
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`
                  }
                >
                  <ArrowLeftRight className="size-4" strokeWidth={1.8} />
                  <span>Transactions</span>
                </NavLink>
              </div>
            </div>
          )}
        </nav>

        {/* Logout */}
        <div className="flex h-14 shrink-0 items-center border-t px-3">
          <LogoutButton onClose={onClose} />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;