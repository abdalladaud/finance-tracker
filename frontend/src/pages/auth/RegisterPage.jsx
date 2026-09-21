import { Link } from "react-router-dom"
import RegisterForm from "@/components/auth/RegisterForm"

function RegisterPage() {
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
              Create an account
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Start managing your finances simply.
            </p>
          </div>
        </div>

        <RegisterForm />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
             className="font-medium text-foreground transition-colors hover:text-muted-foreground"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}

export default RegisterPage