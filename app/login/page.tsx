"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { EyeIcon, EyeOffIcon, Loader2Icon, CreditCardIcon } from "lucide-react"

const roleRoutes: Record<string, string> = {
  SUPER_ADMIN: "/super_admin",
  CORPORATE_ADMIN: "/corporate_admin",
  CORPORATE_EMPLOYEE: "/corporate_employee",
  HOTEL_OPERATOR: "/hotel_operator",
  RHA_ADMIN: "/rha_admin",
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/auth/me`,
        { credentials: "include" },
      )
      const json = await res.json()
      const user = json.data || json
      const route = roleRoutes[user.role]
      if (route) {
        router.push(route)
      } else {
        router.push("/")
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid credentials"
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl p-8 shadow-2xl border border-white/20">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20">
            <CreditCardIcon className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">HCARD</h1>
          <p className="mt-1 text-sm text-emerald-200/80">Hospitality Card Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-emerald-100 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@company.com"
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-emerald-300/50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-emerald-100 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pr-12 text-sm text-white placeholder-emerald-300/50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300/60 hover:text-emerald-200"
              >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-500/20 border border-red-500/30 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2Icon className="h-4 w-4 animate-spin" />}
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  )
}
