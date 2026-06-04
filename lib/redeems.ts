import { api } from "./api-client"

export type RedeemStatus = "Pending" | "Completed" | "Processing" | "Failed"

export type RedeemTransaction = {
  id: string
  amount: number
  guest: string
  date: string
  status: string
  property: string
  reference: string
}

export type RedeemSummary = {
  id: string
  title: string
  amount: number
  schedule: string
  status: RedeemStatus
  createdAt: string
  nextRun: string
  transactionCount: number
  description: string
}

export type RedeemDetail = RedeemSummary & {
  requestedBy: string
  paymentMethod: string
  externalReference: string
  transactions: RedeemTransaction[]
}

interface ApiRedeem {
  id: string
  title: string
  schedule: string
  description?: string
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"
  paymentMethod?: string
  externalReference?: string
  createdAt: string
  updatedAt: string
  requestedBy?: string
  userId?: string
  redeemTransactions?: {
    id: string
    amount: number
    status: string
    createdAt: string
    transaction?: {
      id: string
      amount: number
      description?: string
      createdAt: string
      user?: { firstName: string; lastName: string }
      serviceProvider?: { name: string }
    }
  }[]
}

function mapRedeemStatus(status: string): RedeemStatus {
  const m: Record<string, RedeemStatus> = {
    PENDING: "Pending",
    PROCESSING: "Processing",
    COMPLETED: "Completed",
    FAILED: "Failed",
  }
  return m[status] || "Pending"
}

function mapRedeemDetail(r: ApiRedeem): RedeemDetail {
  const transactions: RedeemTransaction[] = (r.redeemTransactions || []).map((rt) => ({
    id: rt.id,
    amount: rt.amount,
    guest: rt.transaction?.user ? `${rt.transaction.user.firstName} ${rt.transaction.user.lastName}` : "Unknown",
    date: rt.createdAt ? new Date(rt.createdAt).toLocaleDateString() : "",
    status: rt.status,
    property: rt.transaction?.serviceProvider?.name || "Unknown",
    reference: rt.transaction?.id || "",
  }))
  const amount = transactions.reduce((s, t) => s + t.amount, 0)
  return {
    id: r.id,
    title: r.title,
    amount,
    schedule: r.schedule,
    status: mapRedeemStatus(r.status),
    createdAt: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "",
    nextRun: r.updatedAt ? new Date(r.updatedAt).toLocaleString() : "",
    transactionCount: transactions.length,
    description: r.description || "",
    requestedBy: r.requestedBy || "Hotel Finance Team",
    paymentMethod: r.paymentMethod || "Bank transfer",
    externalReference: r.externalReference || "",
    transactions,
  }
}

export async function getRedeemList(): Promise<RedeemSummary[]> {
  const data = await api.get<ApiRedeem[]>("/redeems")
  return data.map((r) => {
    const detail = mapRedeemDetail(r)
    return {
      id: detail.id,
      title: detail.title,
      amount: detail.amount,
      schedule: detail.schedule,
      status: detail.status,
      createdAt: detail.createdAt,
      nextRun: detail.nextRun,
      transactionCount: detail.transactionCount,
      description: detail.description,
    }
  })
}

export async function getRedeemById(id: string): Promise<RedeemDetail | undefined> {
  try {
    const data = await api.get<ApiRedeem>(`/redeems/${id}`)
    return mapRedeemDetail(data)
  } catch {
    return undefined
  }
}

export async function createRedeem(data: {
  title: string
  schedule: string
  description?: string
  paymentMethod?: string
}) {
  return api.post("/redeems", data)
}
