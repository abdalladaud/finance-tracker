import { Link } from "react-router-dom"
import LoginForm from "@/components/auth/LoginForm"

function LoginPage() {
  return (
    <main className="min-h-screen bg-background px-6">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center py-12">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight"
          >
            Finance Tracker
          </Link>

          <div className="mt-8">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to manage your finances.
            </p>
          </div>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-foreground transition-colors hover:text-muted-foreground"
          >
            Create account
          </Link>
        </p>
      </div>
    </main>
  )
}

export default LoginPage