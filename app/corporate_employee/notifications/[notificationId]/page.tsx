"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { NotificationDetail } from "@/components/notification-detail"
import {
  getNotificationById,
  getAllNotifications,
  getAllTransactions,
  type CorporateEmployeeNotification,
  type CorporateEmployeeTransaction,
} from "@/lib/corporateEmployeeTransactions"
import { api } from "@/lib/api-client"
import { Loader2Icon } from "lucide-react"

function formatAmount(amount: number) {
  return `RWF ${amount.toLocaleString()}`
}

export default function Page() {
  const params = useParams()
  const notificationId = Array.isArray(params?.notificationId) ? params.notificationId[0] : params?.notificationId

  const [notification, setNotification] = useState<CorporateEmployeeNotification | null>(null)
  const [notifications, setNotifications] = useState<CorporateEmployeeNotification[]>([])
  const [transactions, setTransactions] = useState<CorporateEmployeeTransaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      if (!notificationId) return
      try {
        const [notif, notifs, txns] = await Promise.all([
          getNotificationById(notificationId),
          getAllNotifications(),
          getAllTransactions(),
        ])
        setNotification(notif)
        setNotifications(notifs)
        setTransactions(txns)

        if (notif) {
          api.post(`/notifications/${notificationId}/read`).catch(() => {})
        }
      } catch {
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [notificationId])

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2Icon className="h-6 w-6 animate-spin text-slate-400" /></div>
  }

  if (!notification) {
    return (
      <div className="space-y-6 px-0">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-950">Notification not found</h1>
              <p className="mt-1 text-sm text-slate-500">The notification with ID {notificationId} does not exist.</p>
            </div>
            <Link href="/corporate_employee" className="rounded-full bg-emerald-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800">
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 px-0">
      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">All transactions</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950">Transaction history</h2>
              </div>
              <Link href="/corporate_employee/payments" className="text-sm font-semibold text-emerald-700">
                View all
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {transactions.slice(0, 5).map((txn) => (
                <Link
                  key={txn.id}
                  href={`/corporate_employee/payments/${txn.id}`}
                  className="block rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-emerald-200"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{txn.title}</p>
                      <p className="text-xs text-slate-500">{txn.datetime}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{formatAmount(txn.amount)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Notifications</p>
            <div className="mt-4 space-y-3">
              {notifications.map((item) => (
                <Link
                  key={item.id}
                  href={`/corporate_employee/notifications/${item.id}`}
                  className={`block rounded-3xl px-4 py-3 transition ${item.id === notification.id ? "border border-emerald-200 bg-emerald-50" : "border border-slate-200 bg-slate-50 hover:border-emerald-200"}`}
                >
                  <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <main>
          <NotificationDetail notification={notification} />

          {notification.transactionId ? (
            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Related transaction</p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-950">{notification.transactionId}</h2>
                </div>
                <Link href={`/corporate_employee/payments/${notification.transactionId}`} className="text-sm font-semibold text-emerald-700">
                  Open transaction
                </Link>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  )
}
