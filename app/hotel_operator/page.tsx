import {
  TrendingUpIcon,
  CreditCardIcon,
  ArrowRightLeftIcon,
  Building2Icon,
  AlertCircleIcon,
} from "lucide-react"

interface StatusCard {
  label: string
  value: string
  detail: string
  icon: React.ReactNode
}

const statusCards: StatusCard[] = [
  {
    label: "Revenue MTD",
    value: "RWF 12.4M",
    detail: "+18% vs last month",
    icon: <TrendingUpIcon className="size-5 text-emerald-600" />,
  },
  {
    label: "Settled today",
    value: "RWF 1.8M",
    detail: "Instant · zero delay",
    icon: <CreditCardIcon className="size-5 text-slate-600" />,
  },
  {
    label: "Card transactions",
    value: "147",
    detail: "62% of total revenue",
    icon: <ArrowRightLeftIcon className="size-5 text-blue-600" />,
  },
  {
    label: "Outstanding invoices",
    value: "RWF 0",
    detail: "No unpaid debts",
    icon: <AlertCircleIcon className="size-5 text-emerald-600" />,
  },
]

function StatusCard({ card }: { card: StatusCard }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-100">
      <div className="mb-4 flex items-start justify-between">
        <p className="text-sm text-slate-600">{card.label}</p>
        <div className="flex-shrink-0">{card.icon}</div>
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
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Today's transactions</p>
              <p className="text-xs text-slate-500">Latest hotel operator activity</p>
            </div>
            <a href="/hotel_operator/transactions" className="text-sm font-semibold text-blue-500 hover:text-blue-700">
              View all
            </a>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Kigali Marriott Hotel</p>
              <p className="text-xs text-slate-500">Room charge · card •••• 4821</p>
              <p className="mt-2 font-semibold text-slate-900">RWF 185,000</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">MTN Rwanda — Restaurant</p>
              <p className="text-xs text-slate-500">Lunch · card •••• 3302</p>
              <p className="mt-2 font-semibold text-slate-900">RWF 42,500</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">BK Group — Boardroom</p>
              <p className="text-xs text-slate-500">Boardroom · virtual card</p>
              <p className="mt-2 font-semibold text-slate-900">RWF 280,000</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Revenue by category</p>
              <p className="text-xs text-slate-500">Category breakdown</p>
            </div>
            <a href="/hotel_operator/revenue_reports" className="text-sm font-semibold text-blue-500 hover:text-blue-700">
              View report
            </a>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Room charges</p>
                <p className="text-xs text-slate-500">60%</p>
              </div>
              <p className="font-semibold text-slate-900">RWF 7.4M</p>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Food & beverage</p>
                <p className="text-xs text-slate-500">20%</p>
              </div>
              <p className="font-semibold text-slate-900">RWF 2.5M</p>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Meeting rooms</p>
                <p className="text-xs text-slate-500">15%</p>
              </div>
              <p className="font-semibold text-slate-900">RWF 1.9M</p>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Spa & ancillary</p>
                <p className="text-xs text-slate-500">5%</p>
              </div>
              <p className="font-semibold text-slate-900">RWF 620K</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
