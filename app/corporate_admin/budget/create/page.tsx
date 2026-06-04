"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { addBudget } from "@/lib/budgetStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeftIcon } from "lucide-react"

const allocationSuggestions = [
  "Department",
  "Project",
  "Card",
  "Travel",
  "Operations",
  "Events",
  "Procurement",
  "Training",
]

export default function CreateBudgetPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [purpose, setPurpose] = useState("")
  const [allocationType, setAllocationType] = useState("Department")
  const [allocated, setAllocated] = useState("")
  const [ceiling, setCeiling] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(true)

  const filteredAllocationSuggestions = useMemo(() => {
    const query = allocationType.trim().toLowerCase()
    return allocationSuggestions.filter((option) =>
      option.toLowerCase().includes(query) && option.toLowerCase() !== query
    )
  }, [allocationType])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const result = await addBudget({
        name: name || "New Budget",
        allocationType,
        purpose,
        allocated: Number(allocated) || 0,
        ceiling: Number(ceiling) || Number(allocated) || 0,
      })
      router.push(`/corporate_admin/budget/${result.id}`)
    } catch {
      toast.error("Failed to create budget")
    }
  }

  return (
    <div className="space-y-6 px-2 sm:px-4 lg:px-6 pt-4">
      <div className="rounded-3xl bg-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">Create Budget</h1>
            <p className="mt-1 text-sm text-slate-500">Create a new budget allocation.</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Budget name</Label>
              <Input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Marketing Campaign" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Input id="purpose" value={purpose} onChange={(event) => setPurpose(event.target.value)} placeholder="e.g. Ads, events, subscriptions" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Allocation type</Label>
              <Input
                id="type"
                value={allocationType}
                onChange={(event) => {
                  setAllocationType(event.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                placeholder="e.g. Department, Travel, Events"
              />
              {showSuggestions && filteredAllocationSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {filteredAllocationSuggestions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-200"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => setAllocationType(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="allocated">Allocated amount</Label>
              <Input id="allocated" value={allocated} type="number" onChange={(event) => setAllocated(event.target.value)} placeholder="2500000" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="ceiling">Ceiling</Label>
              <Input id="ceiling" value={ceiling} type="number" onChange={(event) => setCeiling(event.target.value)} placeholder="2500000" />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link href="/corporate_admin/budget" >
            <Button className="inline-flex w-full sm:w-auto justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Cancel
              </Button>
            </Link>
            <Button type="submit" className="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
              Create Budget
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
