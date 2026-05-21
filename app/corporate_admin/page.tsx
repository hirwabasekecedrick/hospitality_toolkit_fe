import { TransactionsOverview } from "./transactions/page"
import { ApprovalsOverview } from "./approvals/page"
import { TrendingUpIcon, CreditCardIcon, AlertCircleIcon } from "lucide-react"

interface StatusCard {
  label: string
  value: string
  detail: string
  icon?: React.ReactNode
  trend?: "up" | "down" | "neutral"
}

const statusCards: StatusCard[] = [
  {
    label: "Corporate Float",
    value: "RWF 8.4M",
    detail: "Available now",
    icon: <TrendingUpIcon className="size-5 text-emerald-600" />,
    trend: "up",
  },
  {
    label: "Spend MTD",
    value: "RWF 3.1M",
    detail: "62% of budget used",
    icon: <CreditCardIcon className="size-5 text-slate-600" />,
    trend: "neutral",
  },
  {
    label: "Active Cards",
    value: "12",
    detail: "9 physical · 3 virtual",
    icon: <CreditCardIcon className="size-5 text-blue-600" />,
    trend: "neutral",
  },
  {
    label: "Pending Approvals",
    value: "3",
    detail: "Action required",
    icon: <AlertCircleIcon className="size-5 text-orange-600" />,
    trend: "down",
  },
]

function StatusCard({ card }: { card: StatusCard }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-100">
      <div className="mb-4 flex items-start justify-between">
        <p className="text-sm text-slate-600">{card.label}</p>
        {card.icon && <div className="flex-shrink-0">{card.icon}</div>}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">{card.value}</h3>
      <p className="mt-2 text-xs text-slate-500 md:text-sm">{card.detail}</p>
    </div>
  )
}

export default function Page() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {statusCards.map((card) => (
          <StatusCard key={card.label} card={card} />
        ))}
      </div>
      <div className="min-h-auto flex flex-col sm:flex-row rounded-xl bg-muted/50 gap-2 md:min-h-min p-2">
        <div className="w-full sm:w-1/2 bg-white rounded-lg p-4">
          <TransactionsOverview />
        </div>
        <div className="w-full sm:w-1/2 bg-white rounded-lg p-4">
          <ApprovalsOverview />
        </div>
      </div>
    </>
  )
}
