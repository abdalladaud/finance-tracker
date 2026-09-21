import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/lib/api/authApi";
import useAuthStore from "@/lib/store/authStore";


function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      login(data.user, data.token);
      navigate("/dashboard");
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

    loginMutation.mutate(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formValues.password}
            onChange={handleInputChange}
            className="pr-10"
            required
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
      </div>

      {loginMutation.isError && (
        <p className="text-sm text-destructive">
          {loginMutation.error?.response?.data?.message ||
            "Login failed. Please try again."}
        </p>
      )}

      <Button
        type="submit"
        className="h-8 w-full inline-flex shrink-0 items-center gap-2 rounded-md bg-foreground px-2.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90 sm:px-4 sm:text-sm"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}

export default LoginForm;
