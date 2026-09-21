import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/lib/api/authApi";
import { getFieldErrors, getErrorMessage } from "@/utils/errorUtils";

function RegisterForm() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    registerMutation.mutate(formValues);
  };

  const fieldErrors = getFieldErrors(registerMutation.error);

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
            {fieldErrors.name[0]}
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
            {fieldErrors.email[0]}
          </p>
        )}
      </div>

      {/* Password */}
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
            className={`border-border/60 pr-10 focus-visible:border-primary/60 ${
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
            {fieldErrors.password[0]}
          </p>
        )}
      </div>

      {/* General error */}
      {registerMutation.isError && Object.keys(fieldErrors).length === 0 && (
        <p className="text-xs font-normal leading-4 text-destructive/80">
          {getErrorMessage(registerMutation.error)}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        className="h-8 w-full inline-flex shrink-0 items-center gap-2 rounded-md bg-foreground px-2.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90 sm:px-4 sm:text-sm"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}

export default RegisterForm;
