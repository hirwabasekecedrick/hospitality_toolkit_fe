import { SettingsForm } from "@/components/corporate_admin/settings-form"

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">Settings</h1>
            <p className="mt-1 text-sm text-slate-500">Configure your company profile, approval workflows, users, and integrations.</p>
          </div>
        </div>
      </div>
      <SettingsForm />
    </div>
  )
}
