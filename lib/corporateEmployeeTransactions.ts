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
  statusVariant: "success" | "warning" | "neutral"
  icon: "receipt" | "arrow" | "alert"
  userId: string
  serviceProviderId: string
  paymentMethod: string
  reference: string
  details: string
  clientName: string
  clientOrg: string
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

export const USERS: CorporateEmployeeUser[] = [
  {
    id: "USER-001",
    name: "John Doe",
    email: "john.doe@bkgroup.com",
    phone: "+250 788 123 456",
    role: "Corporate Traveler",
    department: "Business Development",
  },
  {
    id: "USER-002",
    name: "Alice Smith",
    email: "alice.smith@mtn.rw",
    phone: "+250 788 654 321",
    role: "Account Manager",
    department: "Sales",
  },
  {
    id: "USER-003",
    name: "Corporate Team",
    email: "team@rwandair.com",
    phone: "+250 788 800 900",
    role: "Events Coordinator",
    department: "Operations",
  },
  {
    id: "USER-004",
    name: "Sarah Jones",
    email: "sarah.jones@bralirwa.com",
    phone: "+250 788 778 899",
    role: "Guest Relations",
    department: "Hospitality",
  },
]

export const SERVICE_PROVIDERS: ServiceProvider[] = [
  {
    id: "PROV-001",
    name: "Kigali Marriott Hotel",
    category: "Hotel",
    description: "A premium hotel with conference facilities, dining, and wellness services in Kigali.",
    rating: 4.7,
    location: {
      latitude: -1.9444,
      longitude: 30.0619,
      address: "KN 5 Rd, Kigali, Rwanda",
    },
    contact: {
      phone: "+250 788 100 101",
      email: "reservations@marriottkigali.rw",
    },
  },
  {
    id: "PROV-002",
    name: "Radisson Blu Hotel",
    category: "Hotel",
    description: "A business-class hotel offering modern meeting rooms and restaurant services.",
    rating: 4.5,
    location: {
      latitude: -1.9522,
      longitude: 30.0606,
      address: "KG 7 Ave, Kigali, Rwanda",
    },
    contact: {
      phone: "+250 788 200 202",
      email: "info@radissonblukigali.rw",
    },
  },
  {
    id: "PROV-003",
    name: "Serena Hotel Kigali",
    category: "Hotel",
    description: "Luxury accommodations with event spaces, spa, and restaurant services.",
    rating: 4.8,
    location: {
      latitude: -1.9491,
      longitude: 30.0701,
      address: "KN 4 Ave, Kigali, Rwanda",
    },
    contact: {
      phone: "+250 788 300 303",
      email: "contact@serenakigali.rw",
    },
  },
]

export const TRANSACTIONS: CorporateEmployeeTransaction[] = [
  {
    id: "TXN-9482",
    title: "Room charge",
    datetime: "Today, 2:45 PM",
    amount: 185000,
    status: "Settled",
    statusVariant: "success",
    icon: "receipt",
    userId: "USER-001",
    serviceProviderId: "PROV-001",
    paymentMethod: "Corporate card",
    reference: "RC-20240514-9482",
    details: "Hotel room charge for a one-night stay, including minibar and room service.",
    clientName: "John Doe",
    clientOrg: "BK Group",
  },
  {
    id: "TXN-9481",
    title: "Food & Beverage",
    datetime: "Today, 1:15 PM",
    amount: 42500,
    status: "Settled",
    statusVariant: "success",
    icon: "receipt",
    userId: "USER-002",
    serviceProviderId: "PROV-002",
    paymentMethod: "Corporate card",
    reference: "FNB-20240514-9481",
    details: "Lunch and refreshments for a client meeting in the hotel restaurant.",
    clientName: "Alice Smith",
    clientOrg: "MTN Rwanda",
  },
  {
    id: "TXN-9480",
    title: "Boardroom booking",
    datetime: "Yesterday, 4:30 PM",
    amount: 280000,
    status: "Pending",
    statusVariant: "neutral",
    icon: "arrow",
    userId: "USER-003",
    serviceProviderId: "PROV-001",
    paymentMethod: "Corporate card",
    reference: "BR-20240513-9480",
    details: "Boardroom booking with AV and catering services for a 3-hour event.",
    clientName: "Corporate Team",
    clientOrg: "RwandAir",
  },
  {
    id: "TXN-9479",
    title: "Spa services",
    datetime: "Yesterday, 11:20 AM",
    amount: 85000,
    status: "Disputed",
    statusVariant: "warning",
    icon: "alert",
    userId: "USER-004",
    serviceProviderId: "PROV-003",
    paymentMethod: "Corporate card",
    reference: "SPA-20240513-9479",
    details: "Spa and wellness package billed to the corporate card for wellness reimbursement.",
    clientName: "Sarah Jones",
    clientOrg: "Bralirwa",
  },
]

export const NOTIFICATIONS: CorporateEmployeeNotification[] = [
  {
    id: "NOTIF-001",
    title: "Payment approved",
    subtitle: "Room charge for John Doe",
    datetime: "Today, 2:46 PM",
    type: "Payment",
    message: "Your room charge transaction has been approved and settled. The corporate card has been debited successfully.",
    actionLabel: "View transaction",
    actionUrl: "/corporate_employee/payments/TXN-9482",
    transactionId: "TXN-9482",
  },
  {
    id: "NOTIF-002",
    title: "Pending approval",
    subtitle: "Boardroom booking",
    datetime: "Yesterday, 4:35 PM",
    type: "Approval",
    message: "Your boardroom booking request is pending approval by the finance team. You will receive an update shortly.",
    actionLabel: "Review details",
    actionUrl: "/corporate_employee/notifications/NOTIF-002",
  },
  {
    id: "NOTIF-003",
    title: "Dispute opened",
    subtitle: "Spa services",
    datetime: "Yesterday, 11:25 AM",
    type: "Dispute",
    message: "A dispute request was submitted for the spa services transaction. Review the transaction and contact support if needed.",
    actionLabel: "See dispute",
    actionUrl: "/corporate_employee/notifications/NOTIF-003",
    transactionId: "TXN-9479",
  },
]

export function getUserById(id: string) {
  return USERS.find((user) => user.id === id)
}

export function getServiceProviderById(id: string) {
  return SERVICE_PROVIDERS.find((provider) => provider.id === id)
}

export function getTransactionById(id: string) {
  return TRANSACTIONS.find((transaction) => transaction.id === id)
}

export function getTransactionDetails(id: string) {
  const transaction = getTransactionById(id)
  if (!transaction) return undefined

  return {
    ...transaction,
    user: getUserById(transaction.userId),
    serviceProvider: getServiceProviderById(transaction.serviceProviderId),
  }
}

export function getNotificationById(id: string) {
  return NOTIFICATIONS.find((notification) => notification.id === id)
}

export function getAllTransactions() {
  return TRANSACTIONS
}

export function addTransaction(transaction: CorporateEmployeeTransaction) {
  TRANSACTIONS.unshift(transaction)
  return TRANSACTIONS
}

export function getAllNotifications() {
  return NOTIFICATIONS
}
