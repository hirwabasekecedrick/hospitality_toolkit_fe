import { CheckCircle } from "lucide-react"

interface ApprovalRequest {
  id: string
  name: string
  initials: string
  type: string
  amount: string
  details: string
  dateRange: string
}

const pendingApprovals: ApprovalRequest[] = [
  {
    id: "1",
    name: "Amina K.",
    initials: "AK",
    type: "Budget request",
    amount: "RWF 300,000",
    details: "Kigali Marriott",
    dateRange: "24-26 May",
  },
  {
    id: "2",
    name: "David N.",
    initials: "DN",
    type: "Limit increase",
    amount: "RWF 500,000 daily",
    details: "Card •••• 4821",
    dateRange: "",
  },
]

function ApprovalItem({ approval }: { approval: ApprovalRequest }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 py-4 last:border-0">
      <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700 sm:h-12 sm:w-12">
          {approval.initials}
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <p className="truncate font-semibold text-slate-900 sm:text-base">{approval.name}</p>
          <p className="text-xs text-slate-600 sm:text-sm">{approval.type}</p>
          <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
            {approval.amount}
            {approval.details && ` · ${approval.details}`}
            {approval.dateRange && ` · ${approval.dateRange}`}
          </p>
        </div>
      </div>
      <button className="shrink-0 rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-50 sm:px-4 sm:py-2 sm:text-sm">
        Approve
      </button>
    </div>
  )
}

import { ApprovalQueue } from "@/components/corporate_admin/approval-queue"

export default function Page() {
  return (
    <div className="space-y-6 p-4">
      <div className="rounded-3xl bg-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">Overrun Approvals</h1>
            <p className="mt-1 text-sm text-slate-500">Review and action pending requests for budget increases, virtual cards, and flagged transactions.</p>
          </div>
        </div>
      </div>
      <ApprovalQueue />
    </div>
  )
}

export function ApprovalsOverview() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <CheckCircle className="size-5 text-slate-600" />
          <span>Pending approvals</span>
        </div>
        <a
          href="/corporate_admin/approvals"
          className="text-xs font-semibold text-blue-500 transition hover:text-blue-700 sm:text-sm"
        >
          View all
        </a>
      </div>
      <div className="divide-y divide-slate-200 rounded-lg bg-white p-4 sm:p-6">
        {pendingApprovals.length > 0 ? (
          pendingApprovals.map((approval) => (
            <ApprovalItem key={approval.id} approval={approval} />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-slate-500">No pending approvals</p>
        )}
      </div>
    </section>
  )
}