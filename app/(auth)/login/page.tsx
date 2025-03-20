"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/loginform";
import { useAuth } from "@/providers/authprovider";

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
