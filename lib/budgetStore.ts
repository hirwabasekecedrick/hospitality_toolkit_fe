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

let budgets: Budget[] = [
  {
    id: "budget-1",
    name: "Marketing Campaign",
    allocationType: "project",
    purpose: "Q3 promotion materials",
    allocated: 2500000,
    spent: 1900000,
    ceiling: 2500000,
    status: "Active",
    createdAt: "2024-04-12",
    usage: [
      { id: "usage-1", description: "Digital ads", amount: 900000, date: "2024-05-02" },
      { id: "usage-2", description: "Event booth", amount: 600000, date: "2024-05-18" },
      { id: "usage-3", description: "Design services", amount: 400000, date: "2024-06-01" },
    ],
  },
  {
    id: "budget-2",
    name: "IT Budget",
    allocationType: "department",
    purpose: "Infrastructure and software licensing",
    allocated: 3000000,
    spent: 2200000,
    ceiling: 3000000,
    status: "Active",
    createdAt: "2024-01-22",
    usage: [
      { id: "usage-4", description: "Cloud hosting", amount: 1200000, date: "2024-04-15" },
      { id: "usage-5", description: "SaaS licenses", amount: 600000, date: "2024-05-05" },
      { id: "usage-6", description: "Security audit", amount: 400000, date: "2024-05-20" },
    ],
  },
  {
    id: "budget-3",
    name: "Travel Allowance",
    allocationType: "card",
    purpose: "Employee travel and per diem",
    allocated: 1800000,
    spent: 1500000,
    ceiling: 1800000,
    status: "Active",
    createdAt: "2024-03-10",
    usage: [
      { id: "usage-7", description: "Hotel stays", amount: 700000, date: "2024-06-03" },
      { id: "usage-8", description: "Airfares", amount: 500000, date: "2024-06-12" },
      { id: "usage-9", description: "Ground transport", amount: 300000, date: "2024-06-18" },
    ],
  },
]

const listeners: Array<() => void> = []

export function getBudgets() {
  return budgets.slice()
}

export function getBudgetById(id: string) {
  return budgets.find((budget) => budget.id === id)
}

export function addBudget(budget: Budget) {
  budgets = [budget, ...budgets]
  listeners.forEach((listener) => listener())
}

export function subscribeBudgets(listener: () => void) {
  listeners.push(listener)
  return () => {
    const index = listeners.indexOf(listener)
    if (index !== -1) listeners.splice(index, 1)
  }
}
