"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { getBudgetById, type Budget } from "@/lib/budgetStore"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon } from "lucide-react"

export default function BudgetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [budget, setBudget] = useState<Budget | null>(null)

  useEffect(() => {
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id
    if (!id) return
    const found = getBudgetById(id)
    setBudget(found ?? null)
  }, [params])

  if (!budget) {
    return (
      <div className="rounded-3xl bg-white p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.push("/corporate_admin/budget")}
              className="inline-flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" /> Back
            </Button>
            <h1 className="text-2xl font-semibold">Budget not found</h1>
          </div>
          <p className="text-sm text-slate-500">The requested budget does not exist or may have been deleted.</p>
        </div>
      </div>
    )
  }

  const remaining = budget.allocated - budget.spent
  const usageRatio = budget.allocated ? (budget.spent / budget.allocated) * 100 : 0

  return (
    <div className="space-y-6 p-4">
      <div className="rounded-3xl bg-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950">{budget.name}</h1>
            <p className="mt-1 text-sm text-slate-500">{budget.purpose}</p>
          </div>
          <Badge variant={budget.status === "Active" ? "default" : "destructive"}>{budget.status}</Badge>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-slate-500">Allocated</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">RWF {budget.allocated.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-slate-500">Spent</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">RWF {budget.spent.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-slate-500">Remaining</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">RWF {remaining.toLocaleString()}</p>
        </Card>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Usage history</h2>
            <p className="mt-1 text-sm text-slate-500">See how budget funds were spent on each item.</p>
          </div>
          <div className="text-right text-sm text-slate-500">{usageRatio.toFixed(1)}% of allocation used</div>
        </div>

        <div className="mt-6 space-y-4">
          {budget.usage.length > 0 ? (
            budget.usage.map((usage) => (
              <div key={usage.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{usage.description}</p>
                    <p className="text-sm text-slate-500">{usage.date}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">RWF {usage.amount.toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No usage entries yet for this budget.</p>
          )}
        </div>
      </div>
    </div>
  )
}
