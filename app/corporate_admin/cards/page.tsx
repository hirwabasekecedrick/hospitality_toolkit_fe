import { VirtualCardGenerator } from "@/components/corporate_admin/virtual-card-generator"
import { CardsTable } from "@/components/corporate_admin/cards-table"

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">Cards Management</h1>
            <p className="mt-1 text-sm text-slate-500">Manage physical and virtual cards for your corporate team. Set limits and track spending.</p>
          </div>
          <VirtualCardGenerator />
        </div>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <CardsTable />
      </div>
    </div>
  )
}
