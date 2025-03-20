"use client";
import { useState } from "react";
import { useAuth } from "@/providers/authprovider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      await login(email, password);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="overflow-hidden border shadow-lg transition-all duration-300 hover:shadow-2xl rounded-xl bg-white/90 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 opacity-50"></div>

        <CardHeader className="space-y-1 relative z-10 pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="h-7 w-7 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 space-y-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => validateEmail(email)}
                  disabled={isLoading}
                  className={`pl-10 transition-all rounded-lg shadow-sm focus:ring-2 focus:ring-primary/50 ${
                    emailError
                      ? "border-destructive focus:ring-destructive/50"
                      : "focus:border-primary"
                  }`}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
              </div>
              {emailError && (
                <p
                  id="email-error"
                  className="text-sm text-destructive font-medium mt-1.5"
                >
                  {emailError}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => validatePassword(password)}
                  disabled={isLoading}
                  className={`pl-10 pr-10 transition-all rounded-lg shadow-sm focus:ring-2 focus:ring-primary/50 ${
                    passwordError
                      ? "border-destructive focus:ring-destructive/50"
                      : "focus:border-primary"
                  }`}
                  aria-invalid={!!passwordError}
                  aria-describedby={
                    passwordError ? "password-error" : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p
                  id="password-error"
                  className="text-sm text-destructive font-medium mt-1.5"
                >
                  {passwordError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 rounded-lg shadow-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
