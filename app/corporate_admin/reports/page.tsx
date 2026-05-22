import { ReportsDashboard } from "@/components/corporate_admin/reports-dashboard"

export default function Page() {
  return (
    <div className="space-y-6 p-4">
      <div className="rounded-3xl bg-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">Analytics & Reports</h1>
            <p className="mt-1 text-sm text-slate-500">Generate comprehensive spending reports and analyze corporate float usage across hotels and categories.</p>
          </div>
        </div>
      </div>
      <ReportsDashboard />
    </div>
  )
}
