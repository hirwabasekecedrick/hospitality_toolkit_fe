"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { getAllNotifications, type CorporateEmployeeNotification } from "@/lib/corporateEmployeeTransactions"
import { api } from "@/lib/api-client"
import { Loader2Icon, CheckCheckIcon } from "lucide-react"

export default function Page() {
  const [notifications, setNotifications] = useState<CorporateEmployeeNotification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllNotifications()
        setNotifications(data)
      } catch {
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleMarkAllRead = async () => {
    try {
      await api.post("/notifications/read-all")
      toast.success("All notifications marked as read")
    } catch {
      toast.error("Failed to mark all as read")
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2Icon className="h-6 w-6 animate-spin text-slate-400" /></div>
  }

  return (
    <div className="space-y-6 px-0">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950">Notifications</h1>
            <p className="mt-1 text-sm text-slate-500">Review the latest system and transaction alerts for your corporate employee account.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              <CheckCheckIcon className="h-4 w-4" />
              Mark all read
            </button>
            <Link href="/corporate_employee" className="rounded-full bg-emerald-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800">
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(280px,380px)_1fr]">
        <aside className="space-y-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Notifications</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">All updates</h2>
            <div className="mt-6 space-y-3">
              {notifications.map((notification) => (
                <Link
                  key={notification.id}
                  href={`/corporate_employee/notifications/${notification.id}`}
                  className="block rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200"
                >
                  <p className="text-sm font-semibold text-slate-950">{notification.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{notification.subtitle}</p>
                  <p className="text-xs text-slate-400 mt-2">{notification.datetime}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Tip</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Tap a notification to view it in detail</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Notifications are linked to your corporate transactions and important approvals. Select one to see the full message and related actions.
          </p>
        </div>
      </div>
    </div>
  )
}
