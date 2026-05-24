import { ArrowRightLeftIcon, Building2Icon, CheckCircle2Icon } from "lucide-react"

export function SettlementsOverview() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-emerald-50/50 p-5">
          <p className="text-sm font-semibold text-slate-600">Next scheduled transfer</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">RWF 1,840,000</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-emerald-700">
            <CheckCircle2Icon className="h-4 w-4" />
            <span className="font-medium">Scheduled for 4:00 PM today</span>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
          <p className="text-sm font-semibold text-slate-600">Total settled this week</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">RWF 14.2M</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <Building2Icon className="h-4 w-4" />
            <span>To Bank of Kigali •••• 4821</span>
          </div>
        </div>
      </div>
      
      <div className="rounded-2xl border border-slate-200 bg-white mt-6 overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h3 className="font-semibold text-slate-900">Recent Settlements</h3>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <ArrowRightLeftIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Daily Net Settlement</p>
                <p className="text-xs text-slate-500">Yesterday, 4:00 PM • REF-9281</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-slate-900">RWF 2,450,000</p>
              <p className="text-xs text-emerald-600 font-medium">Completed</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <ArrowRightLeftIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Daily Net Settlement</p>
                <p className="text-xs text-slate-500">May 20, 4:00 PM • REF-9280</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-slate-900">RWF 1,820,000</p>
              <p className="text-xs text-emerald-600 font-medium">Completed</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <ArrowRightLeftIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Daily Net Settlement</p>
                <p className="text-xs text-slate-500">May 19, 4:00 PM • REF-9279</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-slate-900">RWF 3,100,000</p>
              <p className="text-xs text-emerald-600 font-medium">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
          <button className="w-full text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            View full settlement history
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="space-y-6  px-0">
      <div className="rounded-3xl bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950">Settlements</h1>
          </div>
          <button className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 w-full sm:w-auto">
            Generate Report
          </button>
        </div>
        <div className="mt-8">
          <SettlementsOverview />
        </div>
      </div>
    </div>
  )
}
