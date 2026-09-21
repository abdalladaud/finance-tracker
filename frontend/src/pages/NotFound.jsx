import { CircleAlert } from "lucide-react"
import { Link } from "react-router-dom"
import useAuthStore from "@/lib/store/authStore"

function NotFound() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  )

  return (
    <main className="min-h-screen bg-background px-6">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center">
        <div className="-translate-y-10 w-full max-w-3xl">
          {/* Error */}
<div className="flex items-center gap-3">
  <div className="flex size-9 items-center justify-center rounded-md border">
    <CircleAlert
      className="size-4 text-muted-foreground"
      strokeWidth={1.7}
    />
  </div>

  <p className="text-sm font-medium text-muted-foreground">
    Error · 404
  </p>
</div>

<h1 className="mt-5 text-6xl font-semibold tracking-tight sm:text-7xl">
  Not found
</h1>

<p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
  The page you are looking for doesn't exist or may have been moved.
</p>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-foreground/90"
              >
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex h-10 items-center justify-center rounded-md border px-5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Sign in
                </Link>

                <Link
                  to="/register"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-foreground/90"
                 
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default NotFound