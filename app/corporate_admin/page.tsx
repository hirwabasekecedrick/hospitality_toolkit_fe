import type { ReactNode } from "react"
import { TransactionsOverview } from "./transactions/page"
import { ApprovalsOverview } from "./approvals/page"
import {
  TrendingUpIcon,
  CreditCardIcon,
  AlertCircleIcon,
  PlusIcon,
  DownloadIcon,
} from "lucide-react"

interface StatusCard {
  label: string
  value: string
  detail: string
  icon: ReactNode
}

const statusCards: StatusCard[] = [
  {
    label: "Corporate float",
    value: "RWF 8.4M",
    detail: "Available now",
    icon: <TrendingUpIcon className="h-5 w-5 text-emerald-600" />,
  },
  {
    label: "Spend MTD",
    value: "RWF 3.1M",
    detail: "62% of budget used",
    icon: <CreditCardIcon className="h-5 w-5 text-emerald-600" />,
  },
  {
    label: "Active cards",
    value: "12",
    detail: "9 physical · 3 virtual",
    icon: <CreditCardIcon className="h-5 w-5 text-emerald-600" />,
  },
  {
    label: "Pending approvals",
    value: "3",
    detail: "Action required",
    icon: <AlertCircleIcon className="h-5 w-5 text-orange-600" />,
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
    <div className="space-y-6 max-w-7xl mx-auto px-0">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
           
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-950">Overview</h1>
            
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/corporate_admin/cards" className="rounded-full w-full sm:w-auto bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 flex items-center">
              <PlusIcon className="mr-2 inline h-4 w-4" /> Issue card
            </a>
            <a href="/corporate_admin/reports" className="rounded-full w-full sm:w-auto border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 flex items-center">
              <DownloadIcon className="mr-2 inline h-4 w-4" /> Download report
            </a>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statusCards.map((card) => (
            <StatusCard key={card.label} card={card} />
          ))}
        </div>
      </div>

      <div className="">
        <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-slate-900">Recent activity</p>
              <p className="text-sm text-slate-500">Latest transactions and approval items.</p>
            </div>
            <div className="flex gap-2">
              <a href="/corporate_admin/budget" className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 inline-block">
                Add funds
              </a>
              <a href="/corporate_admin/cards" className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 inline-block">
                Set limits
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
              <p className="text-base font-semibold text-slate-900">Pending approvals</p>
              <p className="text-sm text-slate-500">Review requests requiring your attention.</p>
            </div>
            <a href="/corporate_admin/approvals" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
              View all
            </a>
          </div>
          <ApprovalsOverview />
        </div>
      </div>
    </div>
  )
}
