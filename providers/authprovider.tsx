"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      // In a real app, you would validate the token here
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        setUser({ email: userEmail });
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock login - in a real app, you would call an API
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // Mock successful login
      const mockToken =
        "mock-jwt-token-" + Math.random().toString(36).substring(2);
      localStorage.setItem("token", mockToken);
      localStorage.setItem("userEmail", email);

      setUser({ email });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
