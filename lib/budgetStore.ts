import { api } from "./api-client"

export type BudgetUsage = {
  id: string
  description: string
  amount: number
  date: string
}

export type Budget = {
  id: string
  name: string
  allocationType: string
  purpose: string
  allocated: number
  spent: number
  ceiling: number
  status: "Active" | "Closed"
  createdAt: string
  usage: BudgetUsage[]
}

interface ApiBudgetUsage {
  id: string
  description: string
  amount: number
  createdAt: string
}

interface ApiBudget {
  id: string
  name: string
  allocationType: string
  purpose?: string
  allocated: number
  spent: number
  ceiling: number
  status: "ACTIVE" | "CLOSED"
  createdAt: string
  budgetUsages?: ApiBudgetUsage[]
  cards?: unknown[]
}

function mapBudget(apiBudget: ApiBudget): Budget {
  return {
    id: apiBudget.id,
    name: apiBudget.name,
    allocationType: apiBudget.allocationType,
    purpose: apiBudget.purpose || "",
    allocated: apiBudget.allocated,
    spent: apiBudget.spent,
    ceiling: apiBudget.ceiling,
    status: apiBudget.status === "ACTIVE" ? "Active" : "Closed",
    createdAt: apiBudget.createdAt?.slice(0, 10) || new Date().toISOString().slice(0, 10),
    usage: (apiBudget.budgetUsages || []).map((u) => ({
      id: u.id,
      description: u.description,
      amount: u.amount,
      date: u.createdAt?.slice(0, 10) || "",
    })),
  }
}

export async function getBudgets(): Promise<Budget[]> {
  const data = await api.get<ApiBudget[]>("/budgets")
  return data.map(mapBudget)
}

export async function getBudgetById(id: string): Promise<Budget | null> {
  try {
    const data = await api.get<ApiBudget>(`/budgets/${id}`)
    return mapBudget(data)
  } catch {
    return null
  }
}

export async function addBudget(budgetData: {
  name: string
  allocationType: string
  purpose?: string
  allocated: number
  ceiling?: number
}): Promise<Budget> {
  const data = await api.post<ApiBudget>("/budgets", budgetData)
  return mapBudget(data)
}
