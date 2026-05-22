import type { LucideIcon } from "lucide-react"
import {
  ArrowRightLeftIcon,
  Building2Icon,
  CreditCardIcon,
  ForkKnifeIcon,
  LayoutDashboardIcon,
  UserIcon,
} from "lucide-react"

interface TransactionRecord {
  id: string
  title: string
  category: string
  customer: string
  date: string
  time: string
  amount: number
  currency: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

const transactions: TransactionRecord[] = [
  {
    id: "1",
    title: "Kigali Marriott Hotel",
    category: "Room",
    customer: "Jean K.",
    date: "Today",
    time: "09:14",
    amount: -185000,
    currency: "RWF",
    icon: Building2Icon,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
  },
  {
    id: "2",
    title: "Radisson Blu — Restaurant",
    category: "F&B",
    customer: "Amira R.",
    date: "Yesterday",
    time: "12:38",
    amount: -42000,
    currency: "RWF",
    icon: ForkKnifeIcon,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    id: "3",
    title: "Serena Hotel — Boardroom",
    category: "Meeting",
    customer: "3 guests",
    date: "19 May",
    time: "14:50",
    amount: -120000,
    currency: "RWF",
    icon: UserIcon,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    id: "4",
    title: "Ubumwe Grande Hotel",
    category: "Room",
    customer: "David N.",
    date: "18 May",
    time: "10:22",
    amount: -98000,
    currency: "RWF",
    icon: Building2Icon,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
  },
  {
    id: "5",
    title: "Kigali Serena — Breakfast",
    category: "F&B",
    customer: "Jean K.",
    date: "17 May",
    time: "08:50",
    amount: -28000,
    currency: "RWF",
    icon: ForkKnifeIcon,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
]

function formatTransactionAmount(amount: number, currency: string) {
  const formatted = Math.abs(amount).toLocaleString("en-US")
  return `${amount < 0 ? "-" : "+"}${currency} ${formatted}`
}

function TransactionItem({ transaction }: { transaction: TransactionRecord }) {
  const Icon = transaction.icon

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-slate-200/80 bg-slate-60/70 p-4 transition hover:border-slate-300 sm:p-5">
      <div className={`grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-2xl ${transaction.iconBg}`}>
        <Icon className={`h-5 w-5 ${transaction.iconColor}`} />
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="truncate text-sm font-semibold text-slate-950">
          {transaction.title}
        </p>
        <p className="mt-1 min-w-0 text-xs text-slate-500">
          <span className="truncate">
            {transaction.category} · {transaction.customer} 
          </span>
        </p>
        <p className="mt-2 text-xs text-slate-400">
          {transaction.time} · {transaction.date}
        </p>
      </div>
      <div className="mt-3 sm:mt-0 shrink-0 text-right">
        <p className={`text-sm font-semibold ${transaction.amount < 0 ? "text-destructive" : "text-emerald-600"}`}>
          {formatTransactionAmount(transaction.amount, transaction.currency)}
        </p>
      </div>
    </div>
  )
}

import { TransactionLog } from "@/components/corporate_admin/transaction-log"

export default function Page() {
  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950">Transactions</h1>
            <p className="mt-1 text-sm text-slate-500">View and manage all corporate card transactions, including receipts and tax breakdowns.</p>
          </div>
        </div>
      </div>
      <TransactionLog />
    </div>
  )
}

export function TransactionsOverview() {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <ArrowRightLeftIcon className="size-5 text-muted-foreground" />
          <span>Recent transactions</span>
        </div>
        <a
          href="/corporate_admin/transactions"
          className="text-sm font-semibold text-blue-500 transition hover:text-blue-700"
        >
          View all
        </a>
      </div>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </section>
  )
}
