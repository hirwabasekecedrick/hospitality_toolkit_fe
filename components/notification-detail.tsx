import Link from "next/link"
import { CorporateEmployeeNotification } from "@/lib/corporateEmployeeTransactions"

type NotificationDetailProps = {
  notification: CorporateEmployeeNotification
}

export function NotificationDetail({ notification }: NotificationDetailProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">{notification.type}</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">{notification.title}</h1>
          <p className="mt-2 text-sm text-slate-500">{notification.subtitle}</p>
        </div>
        <div className="rounded-3xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
          {notification.datetime}
        </div>
      </div>

      <div className="rounded-3xl bg-slate-50 p-6 text-slate-700">
        <p className="text-sm leading-7">{notification.message}</p>
      </div>

      {notification.actionLabel ? (
        <div className="mt-6">
          <Link
            href={notification.actionUrl ?? "/"}
            className="inline-flex rounded-full bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            {notification.actionLabel}
          </Link>
        </div>
      ) : null}
    </div>
  )
}
