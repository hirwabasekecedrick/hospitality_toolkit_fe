import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BudgetAllocations } from "@/components/corporate_admin/budget-allocations"

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">Budget & Allocations</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your corporate float, allocate funds to departments and cards, and monitor spending limits.</p>
          </div>
          <Link href="/corporate_admin/budget/create">
            <Button className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600">
              Create Budget
            </Button>
          </Link>
        </div>
      </div>
      <BudgetAllocations />
    </div>
  )
}
