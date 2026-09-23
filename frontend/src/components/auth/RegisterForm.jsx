import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { registerUser } from "@/lib/api/authApi"
import { getFieldErrors, getErrorMessage } from "@/utils/errorUtils"

function RegisterForm() {
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  })

   const [showPassword, setShowPassword] = useState(false);

  const [clientErrors, setClientErrors] = useState({})

  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      navigate("/login")
    },
  })

  const handleInputChange = (event) => {
  const { name, value } = event.target

  setFormValues((prev) => ({
    ...prev,
    [name]: value,
  }))

  setClientErrors((prev) => {
    if (!prev[name]) {
      return prev
    }

    let isValid = false

    if (name === "name") {
      isValid = value.trim().length >= 1
    }

    if (name === "email") {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }

    if (name === "password") {
      isValid = value.length >= 6
    }

    if (!isValid) {
      return prev
    }

    const updatedErrors = { ...prev }
    delete updatedErrors[name]

    return updatedErrors
  })
}

  const validateForm = () => {
    const errors = {}

    if (!formValues.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formValues.email.trim()) {
      errors.email = "Email is required"
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)
    ) {
      errors.email = "Please enter a valid email address"
    }

    if (!formValues.password) {
      errors.password = "Password is required"
    } else if (formValues.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    return errors
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const errors = validateForm()

    setClientErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    registerMutation.mutate(formValues)
  }

  const serverFieldErrors = getFieldErrors(registerMutation.error)

  const fieldErrors = {
    ...serverFieldErrors,
    ...clientErrors,
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto w-full max-w-sm space-y-5"
    >
      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>

        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          value={formValues.name}
          onChange={handleInputChange}
          className={`border-border/60 focus-visible:border-primary/60 ${
            fieldErrors.name
              ? "border-destructive/50 focus-visible:border-destructive/60"
              : ""
          }`}
        />

        {fieldErrors.name && (
          <p className="text-xs font-normal leading-4 text-destructive/80">
            {fieldErrors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          name="email"
          type="text"
          placeholder="you@example.com"
          value={formValues.email}
          onChange={handleInputChange}
          className={`border-border/60 focus-visible:border-primary/60 ${
            fieldErrors.email
              ? "border-destructive/50 focus-visible:border-destructive/60"
              : ""
          }`}
        />

        {fieldErrors.email && (
          <p className="text-xs font-normal leading-4 text-destructive/80">
            {fieldErrors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>

        <div className="relative">
          <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={formValues.password}
          onChange={handleInputChange}
          className={`border-border/60 focus-visible:border-primary/60 ${
            fieldErrors.password
              ? "border-destructive/50 focus-visible:border-destructive/60"
              : ""
          }`}
        />

        <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>

          </div>

        {fieldErrors.password && (
          <p className="text-xs font-normal leading-4 text-destructive/80">
            {fieldErrors.password}
          </p>
        )}
      </div>

      {/* General server error */}
      {registerMutation.isError &&
        Object.keys(serverFieldErrors).length === 0 && (
          <p className="text-xs font-normal leading-4 text-destructive/80">
            {getErrorMessage(registerMutation.error)}
          </p>
        )}

      {/* Submit */}
      <Button
        type="submit"
        className="inline-flex h-8 w-full shrink-0 items-center gap-2 rounded-md bg-foreground px-2.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90 sm:px-4 sm:text-sm"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending
          ? "Creating account..."
          : "Create account"}
      </Button>
    </form>
  )
}

export default RegisterForm