import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { VirtualCardGenerator } from "@/components/corporate_admin/virtual-card-generator"
import { CardsTable } from "@/components/corporate_admin/cards-table"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="space-y-6 p-4">
      <div className="rounded-3xl bg-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">Cards Management</h1>
            <p className="mt-1 text-sm text-slate-500">Manage physical and virtual cards for your corporate team. Set limits and track spending.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/corporate_admin/cards/add">
              <Button className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600">
                <span className="inline-flex items-center gap-2">
                  <PlusIcon className="h-4 w-4" /> Issue Card
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <CardsTable />
      </div>
    </div>
  )
}
