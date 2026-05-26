"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { addCard, type Card } from "@/lib/cardsStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronLeftIcon, PlusIcon, UserIcon } from "lucide-react"

const employees = [
  { id: "emp-1", name: "Amina Kamali", role: "Sales" },
  { id: "emp-2", name: "Samuel Nkurunziza", role: "Operations" },
  { id: "emp-3", name: "Grace Uwase", role: "Finance" },
  { id: "emp-4", name: "Eric Mutesi", role: "Marketing" },
  { id: "emp-5", name: "Ruth Bizimana", role: "Procurement" },
  { id: "emp-6", name: "John Mwizerwa", role: "IT" },
]

const defaultPurposes = [
  "Travel",
  "Marketing",
  "Office Supplies",
  "Events",
  "Training",
]

export default function AddCardPage() {
  const router = useRouter()

  const [selectedEmployees, setSelectedEmployees] = useState<{ id: string; name: string }[]>([])
  const [employeeQuery, setEmployeeQuery] = useState("")
  const [cardType, setCardType] = useState<"per diem" | "corporate expense">("per diem")
  const handleCardTypeChange = (value: string) => setCardType(value as "per diem" | "corporate expense")
  const [teamLeader, setTeamLeader] = useState<{ id: string; name: string } | null>(null)
  const [distributeToEmployees, setDistributeToEmployees] = useState(true)
  const [purpose, setPurpose] = useState("")
  const [amount, setAmount] = useState("")
  const [validityType, setValidityType] = useState<"single" | "range">("single")
  const [validFrom, setValidFrom] = useState("")
  const [validUntil, setValidUntil] = useState("")
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const filteredEmployees = useMemo(() => {
    const q = employeeQuery.trim().toLowerCase()
    const selectedIds = new Set(selectedEmployees.map((s) => s.id))
    return employees.filter(
      (employee) =>
        !selectedIds.has(employee.id) &&
        (employee.name.toLowerCase().includes(q) || employee.role.toLowerCase().includes(q))
    )
  }, [employeeQuery, selectedEmployees])

  const addEmployee = (value: { id: string; name: string } | string) => {
    if (!value) return
    if (cardType === "per diem" && selectedEmployees.length >= 1) return

    if (typeof value === "string") {
      const id = `custom-${Date.now()}`
      setSelectedEmployees((current) => [...current, { id, name: value }])
      setEmployeeQuery("")
      return
    }

    setSelectedEmployees((current) =>
      current.some((c) => c.id === value.id) ? current : [...current, { id: value.id, name: value.name }]
    )
    setEmployeeQuery("")
  }

  const removeEmployee = (id: string) => {
    setSelectedEmployees((current) => current.filter((item) => item.id !== id))
  }

  const handlePurposeChip = (value: string) => {
    setPurpose(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const createdAt = Date.now()
    const issueType = cardType === "per diem" ? "Per diem" : "Corporate expense"

    const buildCard = (
      holder: { id?: string; name: string },
      employeesForCard: { id: string; name: string }[] = []
    ): Card => {
      const id = `${createdAt}-${holder.id ?? "unassigned"}-${Math.floor(1000 + Math.random() * 9000)}`
      const last4 = Math.floor(1000 + Math.random() * 9000).toString()

      return {
        id,
        type: "Virtual",
        issueType,
        distributed: issueType === "Corporate expense" ? distributeToEmployees : false,
        cardholder: holder.name,
        cardholderId: holder.id,
        employees: employeesForCard,
        purpose,
        validityType,
        validFrom: validityType === "range" ? validFrom : undefined,
        validUntil: validityType === "range" ? validUntil : undefined,
        last4,
        status: "Active",
        limit: amount ? `RWF ${amount}` : undefined,
        amount: amount ? Number(amount) : undefined,
        lastUsed: "Never",
      }
    }

    if (cardType === "per diem") {
      const employee = selectedEmployees[0]
      addCard(
        buildCard(employee ? { id: employee.id, name: employee.name } : { name: "Unassigned" }, employee ? [employee] : [])
      )
    } else {
      const leader = teamLeader ?? { name: "Team leader" }
      addCard(buildCard(leader, selectedEmployees))
    }

    setSubmitted(true)
    router.push("/corporate_admin/cards")
  }

  return (
    <div className="space-y-6 p-2 sm:p-0">
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div>
              <h1 className="text-3xl font-semibold text-slate-950">Issue New Card</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
            <div className="space-y-3">
              <Tabs value={cardType} onValueChange={handleCardTypeChange} className="rounded-3xl border border-slate-200 bg-slate-50 p-2">
                <TabsList>
                  <TabsTrigger value="per diem" className="rounded-xl px-4 py-3">Per diem</TabsTrigger>
                  <TabsTrigger value="corporate expense" className="rounded-xl px-4 py-3">Corporate expense</TabsTrigger>
                </TabsList>
              </Tabs>
              <p className="text-sm text-slate-500">
                {cardType === "per diem"
                  ? "Issue a card for a single employee to manage their own payments."
                  : "Create a corporate expense card for a mission team, assign a leader, and optionally distribute access to the selected members."}
              </p>
            </div>

            {cardType === "corporate expense" ? (
              <div className="space-y-2">
                <Label>Team leader</Label>
                <select
                  value={teamLeader?.id ?? ""}
                  onChange={(e) => {
                    const leader = employees.find((emp) => emp.id === e.target.value) ?? null
                    setTeamLeader(leader)
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                >
                  <option value="">Select team leader</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} • {employee.role}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            <div className="space-y-2">
              <Label>{cardType === "per diem" ? "Employee / Cardholder" : "Selected team members"}</Label>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex flex-wrap gap-2">
                  {selectedEmployees.map((employee) => (
                    <button
                      type="button"
                      key={employee.id}
                      onClick={() => removeEmployee(employee.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 transition hover:border-slate-400"
                    >
                      {employee.name}
                      <span className="text-slate-400">×</span>
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-slate-300">
                        <UserIcon className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-500">Search employees or type a name</span>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-full max-w-md p-2">
                      <Command className="h-[320px]">
                        <CommandInput
                          placeholder="Search employees..."
                          value={employeeQuery}
                          onValueChange={(value) => setEmployeeQuery(value)}
                        />
                        <CommandList>
                          {filteredEmployees.length > 0 ? (
                            <CommandGroup heading="Employees">
                              {filteredEmployees.map((employee) => (
                                <CommandItem
                                  key={employee.id}
                                  onSelect={() => addEmployee(employee)}
                                >
                                  <span>{employee.name}</span>
                                  <span className="ml-auto text-xs text-slate-400">{employee.role}</span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          ) : (
                            <CommandEmpty>No matching employees.</CommandEmpty>
                          )}
                        </CommandList>
                      </Command>
                      <div className="mt-2 flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (employeeQuery.trim()) {
                              addEmployee(employeeQuery.trim())
                            }
                          }}
                          className="flex-1"
                        >
                          Add "{employeeQuery || "custom name"}"
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {cardType === "corporate expense" ? (
              <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={distributeToEmployees}
                    onChange={(e) => setDistributeToEmployees(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  Distribute the corporate expense card to the selected employees
                </label>
                <p className="text-sm text-slate-500">
                  When distributed, selected employees will see the remaining balance and transactions. If not distributed, only the team leader will have full visibility.
                </p>
              </div>
            ) : null}

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Input
                  id="purpose"
                  value={purpose}
                  onChange={(event) => setPurpose(event.target.value)}
                  placeholder="e.g. Q3 Marketing Trip"
                />
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {defaultPurposes.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handlePurposeChip(item)}
                      className={`rounded-2xl border px-3 py-2 text-left text-sm transition ${
                        purpose === item ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount Ceiling (RWF)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="500000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Validity</Label>
                  <Select value={validityType} onValueChange={(value) => setValidityType(value as "single" | "range") }>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose validity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Use</SelectItem>
                      <SelectItem value="range">Date Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {validityType === "range" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="validFrom">Valid From</Label>
                    <Input
                      id="validFrom"
                      type="date"
                      value={validFrom}
                      onChange={(event) => setValidFrom(event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validUntil">Valid Until</Label>
                    <Input
                      id="validUntil"
                      type="date"
                      value={validUntil}
                      onChange={(event) => setValidUntil(event.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Single use cards are valid for exactly one approved transaction.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">Review</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Confirm the card assignment and validity before creating the card.
                  </p>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">Assigned employees</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedEmployees.length > 0 ? (
                        selectedEmployees.map((employee) => (
                          <span key={employee.id} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                            {employee.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">No employee selected yet.</span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">Purpose</p>
                    <p className="mt-2 text-sm text-slate-900">{purpose || "Not set yet"}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">Validity</p>
                    <p className="mt-2 text-sm text-slate-900">
                      {validityType === "single"
                        ? "Single use"
                        : validFrom && validUntil
                        ? `${validFrom} → ${validUntil}`
                        : "Date range not set"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">Amount ceiling</p>
                    <p className="mt-2 text-sm text-slate-900">{amount ? `RWF ${amount}` : "Not set"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-700">
              Card request submitted. You can still adjust the values or navigate back to cards management.
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link href="/corporate_admin/cards" className="inline-flex justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Cancel
            </Link>
            <Button type="submit" className="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600">
              Create Card
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
