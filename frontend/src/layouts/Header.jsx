import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

import UserProfile from "@/layouts/UserProfile";

import ThemeToggle from "@/components/theme-toggle";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/transactions": "Transactions",
  "/categories": "Categories",
  "/profile": "Profile",
};

function Header({ onMenuClick, mobileMenuOpen }) {
  const { pathname } = useLocation();

  const title = pageTitles[pathname] || "Finance Tracker";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex min-w-0 items-center">
        <button
          type="button"
          onClick={onMenuClick}
          className="mr-3 inline-flex size-9 items-center justify-center rounded-md hover:bg-muted md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? (
            <X className="size-5" strokeWidth={1.8} />
          ) : (
            <Menu className="size-5" strokeWidth={1.8} />
          )}
        </button>

        <h1 className="text-sm font-medium text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserProfile />
      </div>
    </header>
  );
}

export default Header;
