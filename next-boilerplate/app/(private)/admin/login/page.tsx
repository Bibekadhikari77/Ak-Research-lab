"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setError("Invalid email or password");
      return;
    }

    router.push("/admin/users");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-black/[.08] bg-white p-6 dark:border-white/[.145] dark:bg-zinc-950"
      >
        <h1 className="text-xl font-semibold">Admin login</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Demo credentials: admin@gmail.com / admin123
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
          />
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-foreground text-background mt-6 w-full rounded px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
