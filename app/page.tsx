"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Loader2Icon } from "lucide-react"

const roleRoutes: Record<string, string> = {
  SUPER_ADMIN: "/super_admin",
  CORPORATE_ADMIN: "/corporate_admin",
  CORPORATE_EMPLOYEE: "/corporate_employee",
  HOTEL_OPERATOR: "/hotel_operator",
  RHA_ADMIN: "/rha_admin",
}

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    if (user && user.role) {
      const route = roleRoutes[user.role]
      if (route) {
        router.replace(route)
      } else {
        router.replace("/login")
      }
    } else {
      router.replace("/login")
    }
  }, [user, isLoading, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900">
      <Loader2Icon className="h-8 w-8 animate-spin text-emerald-400" />
    </div>
  )
}
