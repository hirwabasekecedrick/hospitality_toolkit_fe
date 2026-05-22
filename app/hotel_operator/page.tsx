import type { ReactNode } from "react"
import { TransactionsOverview } from "./transactions/page"
import { SettlementsOverview } from "./settlements/page"
import {
  TrendingUpIcon,
  CreditCardIcon,
  ArrowRightLeftIcon,
  AlertCircleIcon,
  DownloadIcon,
  QrCodeIcon
} from "lucide-react"

interface StatusCard {
  label: string
  value: string
  detail: string
  icon: ReactNode
}

const statusCards: StatusCard[] = [
  {
    label: "Revenue MTD",
    value: "RWF 12.4M",
    detail: "+18% vs last month",
    icon: <TrendingUpIcon className="h-5 w-5 text-emerald-600" />,
  },
  {
    label: "Settled today",
    value: "RWF 1.8M",
    detail: "Instant · zero delay",
    icon: <CreditCardIcon className="h-5 w-5 text-emerald-600" />,
  },
  {
    label: "Card transactions",
    value: "147",
    detail: "62% of total revenue",
    icon: <ArrowRightLeftIcon className="h-5 w-5 text-emerald-600" />,
  },
  {
    label: "Outstanding",
    value: "RWF 0",
    detail: "No unpaid debts",
    icon: <AlertCircleIcon className="h-5 w-5 text-emerald-600" />,
  },
]

function StatusCard({ card }: { card: StatusCard }) {
  return (
    <div className="rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-slate-200">
      <div className="mb-4 flex items-start justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{card.label}</p>
        <div>{card.icon}</div>
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold text-slate-950">{card.value}</h3>
      <p className="mt-3 text-sm text-slate-500">{card.detail}</p>
    </div>
  )
}

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-950">Overview</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/hotel_operator/transactions" className="rounded-full w-full sm:w-auto bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 flex items-center justify-center">
              <QrCodeIcon className="mr-2 inline h-4 w-4" /> Process Payment
            </a>
            <a href="/hotel_operator/revenue_reports" className="rounded-full w-full sm:w-auto border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 flex items-center justify-center">
              <DownloadIcon className="mr-2 inline h-4 w-4" /> Export Report
            </a>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statusCards.map((card) => (
            <StatusCard key={card.label} card={card} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-slate-900">Recent Transactions</p>
              <p className="text-sm text-slate-500">Latest card payments at your property.</p>
            </div>
            <div className="flex gap-2">
              <a href="/hotel_operator/transactions" className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 inline-block">
                View All
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <TransactionsOverview />
          </div>
        </div>

        <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-slate-900">Settlement Activity</p>
              <p className="text-sm text-slate-500">Recent daily net transfers to your bank account.</p>
            </div>
            <a href="/hotel_operator/settlements" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
              Manage
            </a>
          </div>
          <SettlementsOverview />
        </div>
      </div>
    </div>
  )
}
