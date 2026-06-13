import { api } from "./api-client"

export type CorporateEmployeeUser = {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
}

export type ServiceProviderLocation = {
  latitude: number
  longitude: number
  address: string
}

export type ServiceProviderContact = {
  phone: string
  email: string
}

export type ServiceProvider = {
  id: string
  name: string
  category: string
  description: string
  location: ServiceProviderLocation
  contact: ServiceProviderContact
  rating: number
}

export type CorporateEmployeeTransaction = {
  id: string
  title: string
  datetime: string
  amount: number
  status: string
  hotelName?: string
  card?: any
  statusVariant: "success" | "warning" | "neutral"
  icon: "receipt" | "arrow" | "alert"
  userId: string
  serviceProviderId: string
  paymentMethod: string
  reference: string
  details: string
  employeeName: string
  organization: string
}

export type CorporateEmployeeNotification = {
  id: string
  title: string
  subtitle: string
  datetime: string
  type: string
  message: string
  actionLabel?: string
  actionUrl?: string
  transactionId?: string
}

interface ApiTransaction {
  id: string
  amount: number
  title?: string
  details?: string
  status: string
  description?: string
  reference?: string
  paymentMethod?: string
  createdAt: string
  userId?: string
  serviceProviderId?: string
  cardId?: string
  user?: { id: string; firstName: string; lastName: string; email: string }
  serviceProvider?: {
    id: string
    name: string
    category?: string
    description?: string
    phone?: string
    email?: string
    latitude?: number
    longitude?: number
    address?: string
    rating?: number
  }
  clientName?: string
  clientOrg?: string
  card?: { id: string; last4?: string; type?: string }
  // compact API shape (from backend)
  employeeName?: string
  hotelName?: string
}

interface ApiNotification {
  id: string
  title: string
  message?: string
  type?: string
  createdAt: string
  readAt?: string | null
  transactionId?: string
}

function mapTransaction(t: ApiTransaction): CorporateEmployeeTransaction {
  const status = t.status.charAt(0).toUpperCase() + t.status.slice(1).toLowerCase()
  const statusVariant: "success" | "warning" | "neutral" =
    t.status === "SETTLED" ? "success" :
    t.status === "CONFIRMED" ? "success" :
    t.status === "DISPUTED" ? "warning" : "neutral"
  const icon: "receipt" | "arrow" | "alert" =
    t.status === "SETTLED" ? "receipt" :
    t.status === "CONFIRMED" ? "receipt" :
    t.status === "PENDING" ? "arrow" : "alert"
  // Use compact API shape if available, otherwise fall back to user relation
  const employeeName = t.employeeName || (t.user ? `${t.user.firstName} ${t.user.lastName}` : "Unknown")
  const organization = t.clientOrg || ""

  return {
    id: t.id,
    title: t.title || t.description || "Transaction",
    datetime: t.createdAt ? new Date(t.createdAt).toLocaleString() : "",
    amount: t.amount,
    status,
    statusVariant,
    icon,
    userId: t.userId || "",
    serviceProviderId: t.serviceProviderId || "",
    paymentMethod: t.paymentMethod || "Corporate card",
    reference: t.reference || `REF-${t.id.slice(0, 8)}`,
    details: t.details || t.description || "",
    employeeName,
    organization,
  }
}

function mapNotification(n: ApiNotification): CorporateEmployeeNotification {
  return {
    id: n.id,
    title: n.title,
    subtitle: n.message?.slice(0, 80) || "",
    datetime: n.createdAt ? new Date(n.createdAt).toLocaleString() : "",
    type: n.type || "Info",
    message: n.message || "",
    transactionId: n.transactionId,
  }
}

export async function getAllTransactions(): Promise<CorporateEmployeeTransaction[]> {
  const data = await api.get<ApiTransaction[]>("/payments")
  return data.map(mapTransaction)
}

export async function getProviderTransactions(status?: string): Promise<CorporateEmployeeTransaction[]> {
  const query = status ? `?status=${encodeURIComponent(status)}` : ""
  const data = await api.get<ApiTransaction[]>(`/payments/provider${query}`)
  return data.map(mapTransaction)
}

export async function getTransactionById(id: string): Promise<CorporateEmployeeTransaction | null> {
  try {
    const data = await api.get<ApiTransaction>(`/payments/${id}`)
    return mapTransaction(data)
  } catch {
    return null
  }
}

export async function getTransactionDetails(id: string) {
  try {
    const data = await api.get<ApiTransaction>(`/payments/${id}`)
    return {
      ...mapTransaction(data),
      user: data.user ? { id: data.user.id, name: `${data.user.firstName} ${data.user.lastName}`, email: data.user.email, phone: "", role: "", department: "" } : undefined,
      serviceProvider: data.serviceProvider ? {
        id: data.serviceProvider.id,
        name: data.serviceProvider.name,
        category: data.serviceProvider.category || "",
        description: data.serviceProvider.description || "",
        rating: data.serviceProvider.rating || 0,
        location: {
          latitude: data.serviceProvider.latitude || 0,
          longitude: data.serviceProvider.longitude || 0,
          address: data.serviceProvider.address || "",
        },
        contact: {
          phone: data.serviceProvider.phone || "",
          email: data.serviceProvider.email || "",
        },
      } : undefined,
    }
  } catch {
    return undefined
  }
}

export async function addTransaction(_transaction: CorporateEmployeeTransaction): Promise<CorporateEmployeeTransaction[]> {
  return getAllTransactions()
}

export async function getAllNotifications(): Promise<CorporateEmployeeNotification[]> {
  const data = await api.get<ApiNotification[]>("/notifications")
  return data.map(mapNotification)
}

export async function getNotificationById(id: string): Promise<CorporateEmployeeNotification | null> {
  try {
    const data = await api.get<ApiNotification>(`/notifications/${id}`)
    return mapNotification(data)
  } catch {
    return null
  }
}

export async function redeemBatch(transactionIds: string[]): Promise<any> {
  return api.post("/payments/redeem-batch", { transactionIds })
}

