"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { addCard } from "@/lib/cardsStore";
import { getEmployees } from "@/lib/usersStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronLeftIcon, PlusIcon, UserIcon } from "lucide-react";

// employees will be fetched from backend

const defaultPurposes = [
  "Travel",
  "Marketing",
  "Office Supplies",
  "Events",
  "Training",
];

export default function AddCardPage() {
  const router = useRouter();

  const [selectedEmployees, setSelectedEmployees] = useState<
    { id: string; name: string }[]
  >([]);
  const [employeeQuery, setEmployeeQuery] = useState("");
  const [cardType, setCardType] = useState<"per diem" | "corporate expense">(
    "per diem",
  );
  const handleCardTypeChange = (value: string) =>
    setCardType(value as "per diem" | "corporate expense");
  const [teamLeader, setTeamLeader] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [employees, setEmployees] = useState<
    { id: string; name: string; role?: string }[]
  >([]);
  const [distributeToEmployees, setDistributeToEmployees] = useState(true);
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [validityType, setValidityType] = useState<"single" | "range">(
    "single",
  );
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filteredEmployees = useMemo(() => {
    const q = employeeQuery.trim().toLowerCase();
    const selectedIds = new Set(selectedEmployees.map((s) => s.id));
    return employees.filter((employee) => {
      const role = (employee.role || "").toLowerCase();
      return (
        !selectedIds.has(employee.id) &&
        (employee.name.toLowerCase().includes(q) || role.includes(q))
      );
    });
  }, [employeeQuery, selectedEmployees]);

  const addEmployee = (value: { id: string; name: string } | string) => {
    if (!value) return;
    // Both card types limit to 1 team leader selection
    if (selectedEmployees.length >= 1) return;

    if (typeof value === "string") {
      const id = `custom-${Date.now()}`;
      setSelectedEmployees((current) => [...current, { id, name: value }]);
      setEmployeeQuery("");
      return;
    }

    setSelectedEmployees((current) =>
      current.some((c) => c.id === value.id)
        ? current
        : [...current, { id: value.id, name: value.name }],
    );
    setEmployeeQuery("");
  };

  useEffect(() => {
    let mounted = true;
    Promise.all([
      getEmployees("CORPORATE_EMPLOYEE"),
      getEmployees("CORPORATE_ADMIN"),
    ])
      .then(([employees, admins]) => {
        if (!mounted) return;
        setEmployees([...employees, ...admins]);
      })
      .catch(() => {
        toast.error("Failed to load employees");
      });
    return () => {
      mounted = false;
    };
  }, []);

  const removeEmployee = (id: string) => {
    setSelectedEmployees((current) => current.filter((item) => item.id !== id));
  };

  const handlePurposeChip = (value: string) => {
    setPurpose(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const backendType =
      cardType === "per diem" ? "PER_DIEM" : "CORPORATE_EXPENSE";
    const employeeIds = selectedEmployees.map((e) => e.id);

    try {
      const created = await addCard({
        type: backendType as "PER_DIEM" | "CORPORATE_EXPENSE",
        cardPassword: "1234",
        limit: amount ? Number(amount) : undefined,
        amount: amount ? Number(amount) : undefined,
        validityType: validityType === "range" ? "RANGE" : "SINGLE",
        validFrom: validityType === "range" ? validFrom : undefined,
        validUntil: validityType === "range" ? validUntil : undefined,
        purpose: purpose || undefined,
        distributed:
          cardType === "corporate expense" ? distributeToEmployees : false,
        teamLeaderId:
          cardType === "corporate expense"
            ? selectedEmployees[0]?.id
            : teamLeader?.id,
        employeeIds:
          cardType === "per diem"
            ? selectedEmployees.length > 0
              ? [selectedEmployees[0].id]
              : undefined
            : employeeIds,
      });
      setSubmitted(true);
      if ((created as any).defaultPassword) {
        toast.success(
          `Card created — default password: ${(created as any).defaultPassword}`,
        );
      } else {
        toast.success("Card created successfully");
      }
      router.push("/corporate_admin/cards");
    } catch {
      toast.error("Failed to create card");
    }
  };

  return (
    <div className="space-y-6 p-2 sm:p-0">
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div>
              <h1 className="text-3xl font-semibold text-slate-950">
                Issue New Card
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="space-y-3">
                <Tabs
                  value={cardType}
                  onValueChange={handleCardTypeChange}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-2"
                >
                  <TabsList>
                    <TabsTrigger
                      value="per diem"
                      className="rounded-xl px-4 py-3"
                    >
                      Per diem
                    </TabsTrigger>
                    <TabsTrigger
                      value="corporate expense"
                      className="rounded-xl px-4 py-3"
                    >
                      Corporate expense
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <p className="text-sm text-slate-500">
                  {cardType === "per diem"
                    ? "Issue a card for a single employee to manage their own payments."
                    : "Create a corporate expense card with a team leader to manage payments for their team."}
                </p>
              </div>

              {cardType === "corporate expense" ? (
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">
                    Select the team leader who will manage this corporate
                    expense card.
                  </p>
                </div>
              ) : null}

              <div className="space-y-2">
                <Label>
                  {cardType === "per diem"
                    ? "Employee / Cardholder"
                    : "Team Leader"}
                </Label>
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
                          <span className="text-sm text-slate-500">
                            {selectedEmployees.length === 0
                              ? "Select "
                              : "Change "}{" "}
                            {cardType === "per diem"
                              ? "an employee"
                              : "the team leader"}
                          </span>
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
                                    <span className="ml-auto text-xs text-slate-400">
                                      {employee.role}
                                    </span>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            ) : (
                              <CommandEmpty>
                                No matching employees.
                              </CommandEmpty>
                            )}
                          </CommandList>
                        </Command>
                        <div className="mt-2 flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              if (employeeQuery.trim()) {
                                addEmployee(employeeQuery.trim());
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

              {cardType === "corporate expense" &&
              selectedEmployees.length > 0 ? (
                <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={distributeToEmployees}
                      onChange={(e) =>
                        setDistributeToEmployees(e.target.checked)
                      }
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    Team leader can distribute this card
                  </label>
                  <p className="text-sm text-slate-500">
                    When enabled, the team leader can grant other employees
                    access to this card and its balance information.
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
                        purpose === item
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
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
                  <Select
                    value={validityType}
                    onValueChange={(value) =>
                      setValidityType(value as "single" | "range")
                    }
                  >
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
                  Single use cards are valid for exactly one approved
                  transaction.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">
                    Review
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Confirm the card assignment and validity before creating the
                    card.
                  </p>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">
                      {cardType === "per diem"
                        ? "Assigned employee"
                        : "Team leader"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedEmployees.length > 0 ? (
                        selectedEmployees.map((employee) => (
                          <span
                            key={employee.id}
                            className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                          >
                            {employee.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">
                          {cardType === "per diem"
                            ? "No employee"
                            : "No team leader"}{" "}
                          selected yet.
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">Purpose</p>
                    <p className="mt-2 text-sm text-slate-900">
                      {purpose || "Not set yet"}
                    </p>
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
                    <p className="mt-2 text-sm text-slate-900">
                      {amount ? `RWF ${amount}` : "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-700">
              Card request submitted. You can still adjust the values or
              navigate back to cards management.
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/corporate_admin/cards"
              className="inline-flex justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
            <Button
              type="submit"
              className="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              Create Card
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
