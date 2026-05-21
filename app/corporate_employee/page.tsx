"use client";
import {
  CalendarDaysIcon,
  CreditCardIcon,
  FlagIcon,
  MapPinIcon,
  SparklesIcon,
  TicketIcon,
} from "lucide-react";
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
  { label: "Earnings", value: "RWF 0", icon: CreditCardIcon },
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
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-2 space-y-1">
        <section className="overflow-hidden rounded-[2rem] bg-emerald-950 px-4 py-4 text-white shadow-xl shadow-emerald-950/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full flex justify-center">
              <h1 className="mt-0 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Welcome back, user1!
              </h1>
              
            </div>
            
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                Icon={stat.icon}
              />
            ))}
          </div>
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
            {/* Charts row */}
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Earnings Overview */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Earnings Overview
                  </h3>
                  <span className="text-sm text-slate-500">Total Earnings</span>
                </div>
                <div className="mt-4 h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", v: 0 },
                        { month: "Feb", v: 0 },
                        { month: "Mar", v: 0 },
                        { month: "Apr", v: 0 },
                        { month: "May", v: 0 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e6eef0" />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="v"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Earnings Breakdown */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Earnings Breakdown
                  </h3>
                  <div className="text-sm text-slate-500">%</div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-40 w-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Confirmed", value: 55 },
                            { name: "Completed", value: 30 },
                            { name: "Pending", value: 10 },
                            { name: "Other", value: 5 },
                          ]}
                          dataKey="value"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={2}
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#34d399" />
                          <Cell fill="#f59e0b" />
                          <Cell fill="#d1d5db" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-emerald-600" />
                      <div className="flex-1 text-sm text-slate-700">
                        Confirmed
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        RWF 0
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-green-300" />
                      <div className="flex-1 text-sm text-slate-700">
                        Completed
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        RWF 0
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-yellow-300" />
                      <div className="flex-1 text-sm text-slate-700">
                        Pending
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        RWF 0
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex-1 space-y-6">
        <div className="space-y-4 h-full rounded-[1.5rem] bg-white p-6 shadow-sm border border-slate-200 xl:self-start xl:sticky xl:top-24">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">
              Availability
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Today's schedule and current online status.
            </p>
          </div>
          <div className="rounded-3xl bg-emerald-50 p-5 text-emerald-950">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-700/80">
                  Available
                </p>
                <p className="mt-3 text-3xl font-semibold">8:00 AM — 6:00 PM</p>
              </div>
              <MapPinIcon className="h-8 w-8 text-emerald-700" />
            </div>
            <button className="mt-6 w-full rounded-full bg-emerald-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
              Update availability
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-950">
              Recent messages
            </p>
            <p className="mt-3 text-sm text-slate-500">No messages yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
