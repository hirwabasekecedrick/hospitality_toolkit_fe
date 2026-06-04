import { api } from "./api-client"

export type Card = {
  id: string
  type: "Virtual"
  issueType: "Per diem" | "Corporate expense"
  distributed?: boolean
  cardholder: string
  cardholderId?: string
  employees?: { id: string; name: string }[]
  purpose?: string
  validityType: "single" | "range"
  validFrom?: string
  validUntil?: string
  last4?: string
  status: "Active" | "Suspended" | "Cancelled"
  limit?: string
  amount?: number
  lastUsed?: string
  spent?: number
  teamLeader?: { id: string; firstName: string; lastName: string; email: string }
}

interface ApiCard {
  id: string
  type: "PER_DIEM" | "CORPORATE_EXPENSE"
  status: "ACTIVE" | "SUSPENDED" | "CANCELLED"
  limit?: number
  amount?: number
  spent?: number
  last4?: string
  purpose?: string
  validityType: "SINGLE" | "RANGE"
  validFrom?: string
  validUntil?: string
  distributed?: boolean
  createdAt: string
  updatedAt: string
  teamLeader?: { id: string; firstName: string; lastName: string; email: string }
  employees?: { employee: { id: string; firstName: string; lastName: string; email: string } }[]
}

function mapCard(apiCard: ApiCard): Card {
  const issueType = apiCard.type === "PER_DIEM" ? "Per diem" : "Corporate expense"
  const statusMap: Record<string, "Active" | "Suspended" | "Cancelled"> = {
    ACTIVE: "Active",
    SUSPENDED: "Suspended",
    CANCELLED: "Cancelled",
  }
  const validityMap: Record<string, "single" | "range"> = {
    SINGLE: "single",
    RANGE: "range",
  }
  const cardholder = apiCard.teamLeader
    ? `${apiCard.teamLeader.firstName} ${apiCard.teamLeader.lastName}`
    : "Unassigned"
  const lastUsed = apiCard.updatedAt
    ? new Date(apiCard.updatedAt).toLocaleDateString()
    : undefined

  return {
    id: apiCard.id,
    type: "Virtual",
    issueType,
    distributed: apiCard.distributed,
    cardholder,
    cardholderId: apiCard.teamLeader?.id,
    employees: (apiCard.employees || []).map((e) => ({
      id: e.employee.id,
      name: `${e.employee.firstName} ${e.employee.lastName}`,
    })),
    purpose: apiCard.purpose,
    validityType: validityMap[apiCard.validityType] || "single",
    validFrom: apiCard.validFrom,
    validUntil: apiCard.validUntil,
    last4: apiCard.last4,
    status: statusMap[apiCard.status] || "Active",
    limit: apiCard.limit != null ? `RWF ${apiCard.limit.toLocaleString()}` : undefined,
    amount: apiCard.amount,
    lastUsed,
    spent: apiCard.spent,
    teamLeader: apiCard.teamLeader,
  }
}

export async function getCards(): Promise<Card[]> {
  const data = await api.get<ApiCard[]>("/cards")
  return data.map(mapCard)
}

export async function getMyCards(): Promise<Card[]> {
  const data = await api.get<ApiCard[]>("/cards/my")
  return data.map(mapCard)
}

export async function getCardById(id: string): Promise<Card | null> {
  try {
    const data = await api.get<ApiCard>(`/cards/${id}`)
    return mapCard(data)
  } catch {
    return null
  }
}

export async function addCard(cardData: {
  type: "PER_DIEM" | "CORPORATE_EXPENSE"
  cardPassword: string
  limit?: number
  amount?: number
  validityType: "SINGLE" | "RANGE"
  validFrom?: string
  validUntil?: string
  purpose?: string
  distributed?: boolean
  teamLeaderId?: string
  employeeIds?: string[]
  budgetId?: string
}): Promise<Card> {
  const data = await api.post<ApiCard>("/cards", cardData)
  return mapCard(data)
}

export async function updateCard(id: string, cardData: {
  status?: "ACTIVE" | "SUSPENDED" | "CANCELLED"
  limit?: number
  amount?: number
  purpose?: string
  validFrom?: string
  validUntil?: string
}): Promise<Card> {
  const data = await api.put<ApiCard>(`/cards/${id}`, cardData)
  return mapCard(data)
}

export async function deleteCard(id: string): Promise<void> {
  await api.delete(`/cards/${id}`)
}

export async function changeCardPassword(cardId: string, oldPassword: string, newPassword: string): Promise<void> {
  await api.post("/cards/change-password", { cardId, oldPassword, newPassword })
}
