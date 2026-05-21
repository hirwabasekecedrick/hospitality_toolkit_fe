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
    icon: <TrendingUpIcon className="size-5 text-emerald-600" />,
  },
  {
    label: "Spend MTD",
    value: "RWF 3.1M",
    detail: "62% of budget used",
    icon: <CreditCardIcon className="size-5 text-slate-600" />,
  },
  {
    label: "Active cards",
    value: "12",
    detail: "9 physical · 3 virtual",
    icon: <CreditCardIcon className="size-5 text-blue-600" />,
  },
  {
    label: "Pending approvals",
    value: "3",
    detail: "Action required",
    icon: <AlertCircleIcon className="size-5 text-orange-600" />,
  },
]

function StatusCard({ card }: { card: StatusCard }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
      <div className="mb-4 flex items-start justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{card.label}</p>
        <div>{card.icon}</div>
      </div>
      <h3 className="text-3xl font-bold text-slate-950">{card.value}</h3>
      <p className="mt-3 text-sm text-slate-500">{card.detail}</p>
    </div>
  )
}

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Corporate overview
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Dashboard</h1>
            
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              <PlusIcon className="mr-2 inline size-4" /> Issue card
            </button>
            <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-50">
              <DownloadIcon className="mr-2 inline size-4" /> Download report
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statusCards.map((card) => (
            <StatusCard key={card.label} card={card} />
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-slate-900">Recent activity</p>
              <p className="text-sm text-slate-500">Latest transactions and approval items.</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                Add funds
              </button>
              <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                Set limits
              </button>
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
            <a href="/corporate_admin/approvals" className="text-sm font-semibold text-blue-600 hover:text-blue-800">
              View all
            </a>
          </div>
          <ApprovalsOverview />
        </div>
      </div>
    </div>
  )
}
