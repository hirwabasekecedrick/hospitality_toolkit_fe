"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CalendarDaysIcon,
  CreditCardIcon,
  EyeIcon,
  EyeOffIcon,
  FlagIcon,
  MapPinIcon,
  SparklesIcon,
  TicketIcon,
} from "lucide-react";
import { getAllTransactions } from "@/lib/corporateEmployeeTransactions";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  { label: "Confirmed", value: "0", icon: TicketIcon },
  { label: "Pending", value: "0", icon: FlagIcon },
  { label: "Trips", value: "0", icon: CalendarDaysIcon },
];

function StatCard({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: any;
}) {
  return (
    <div className="rounded-3xl border border-emerald-200/70 bg-white/10 p-2 text-white shadow-lg shadow-emerald-950/20 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-100/80">
          {label}
        </p>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-emerald-100">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-6 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default function Page() {
  const [showAmount, setShowAmount] = useState(false);
  const [card, setCard] = useState<{
    id: string;
    issueType: "Per diem" | "Corporate expense";
    amount: number;
    last4: string;
    cardholder: string;
    status: string;
  } | null>({
    id: "CARD-5129",
    issueType: "Per diem",
    amount: 375000,
    last4: "3948",
    cardholder: "Ndahayo Jaqcues",
    status: "Active",
  });

  const router = useRouter();
  const formattedAmount = (amount: number) => `RWF ${amount.toLocaleString()}`;
  const cardTypeLabel = card
    ? card.issueType === "Per diem"
      ? "Per Diem"
      : "Corporate expense"
    : "";

  const recentTransactions = getAllTransactions().slice(0, 3);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-2 space-y-1">
        <section
          id="card"
          className="overflow-hidden rounded-[2rem] bg-emerald-950 mb-6 text-white shadow-xl shadow-emerald-950/40"
        >
          {card ? (
            <div className="gap-6">
              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-[0_25px_100px_-60px_rgba(5,150,105,0.45)] backdrop-blur-xl">
                <div className="">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                      {card.id}
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                      {card.issueType}
                    </p>
                  </div>
                  <p className="mt-3 text-base tracking-[0.12em] text-emerald-100">
                    {card.cardholder}
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-end justify-center sm:justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                        Card number
                      </p>
                      <p className="mt-2 text-xl font-semibold tracking-[0.24em] text-white">
                        **** **** **** {card.last4}
                      </p>
                    </div>
                    <div className=" px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/90">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="mt-2 text-3xl font-semibold text-white">
                            {showAmount
                              ? formattedAmount(card.amount)
                              : "RWF ••••••"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowAmount((current) => !current)}
                          className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-emerald-100 transition hover:bg-white/15"
                        >
                          {showAmount ? (
                            <EyeOffIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/90">Cardholder</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/90">Card type</p>
                    <p className="mt-2 text-sm font-semibold text-white">{card.issueType}</p>
                  </div>
                </div> */}
              </div>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-white/25 bg-white/5 p-6 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
                No card available
              </p>
              <h2 className="mt-4 text-3xl font-semibold">
                You don’t have a corporate card yet.
              </h2>
              <p className="mt-3 text-sm text-emerald-100/80">
                Request a card from your finance team and it will appear here
                with the card ID, type, and amount details.
              </p>
              <button
                type="button"
                onClick={() =>
                  setCard({
                    id: "CARD-5129",
                    issueType: "Per diem",
                    amount: 375000,
                    last4: "3948",
                    cardholder: "User 1",
                    status: "Active",
                  })
                }
                className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50"
              >
                Request a card
              </button>
            </div>
          )}
        </section>

        <section className="grid gap-4 xl:grid-cols-1">
          {/* Main left column */}
          <div className="w-full">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Active Tours */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Active Tours
                  </h3>
                  <a className="text-sm text-emerald-700">View All</a>
                </div>
                <div className="mt-6 flex items-center justify-center p-8">
                  <div className="text-center text-slate-400">
                    <div className="mb-3">
                      <svg
                        className="mx-auto h-8 w-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M3 7l6-4 6 4 6-4v13a1 1 0 01-1 1H4a1 1 0 01-1-1V7z"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <p className="text-sm">No tours found</p>
                  </div>
                </div>
              </div>

              {/* Pending Bookings */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Pending Bookings
                  </h3>
                  <a className="text-sm text-emerald-700">View All</a>
                </div>
                <div className="mt-6 flex items-center justify-center p-8">
                  <div className="text-center text-slate-400">
                    <div className="mb-3">
                      <svg
                        className="mx-auto h-8 w-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <p className="text-sm">No pending bookings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex-1 space-y-6">
        <div className="space-y-4 h-full rounded-[1.5rem] bg-slate-50 shadow-sm border border-slate-200 xl:self-start xl:sticky xl:top-24">
          <div className="rounded-3xl p-5 text-slate-950">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Recent transactions
                </p>
                
              </div>
              <Link
                href="/corporate_employee/payments"
                className="rounded-full bg-emerald-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                View more
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {recentTransactions.map((txn) => (
                <button
                  key={txn.id}
                  type="button"
                  onClick={() => router.push(`/corporate_employee/payments/${txn.id}`)}
                  className="w-full rounded-3xl bg-white p-4 text-left shadow-sm border border-slate-200 transition hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">
                        {txn.title}
                      </p>
                      <p className="text-xs text-slate-500">{txn.datetime}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">
                        {formattedAmount(txn.amount)}
                      </p>
                      <p className="text-xs text-slate-500">{txn.status}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
