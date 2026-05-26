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
}

let cards: Card[] = [
  { id: "1", type: "Virtual", issueType: "Per diem", distributed: false, cardholder: "John Doe", cardholderId: "emp-6", employees: [{id: "emp-6", name: "John Mwizerwa"}], last4: "4321", status: "Active", limit: "RWF 500,000", amount:500000, lastUsed: "Today", purpose: "Office Supplies", validityType: "range", validFrom: "2024-01-01", validUntil: "2024-12-31" },
  { id: "2", type: "Virtual", issueType: "Corporate expense", distributed: true, cardholder: "Marketing Dept", cardholderId: undefined, employees: [], last4: "8765", status: "Active", limit: "RWF 2,000,000", amount:2000000, lastUsed: "Yesterday", purpose: "Marketing", validityType: "single" },
  { id: "3", type: "Virtual", issueType: "Per diem", distributed: false, cardholder: "Jane Smith", cardholderId: "emp-3", employees: [{id: "emp-3", name: "Grace Uwase"}], last4: "1122", status: "Suspended", limit: "RWF 1,000,000", amount:1000000, lastUsed: "3 days ago", purpose: "Travel", validityType: "range", validFrom: "2024-06-01", validUntil: "2024-06-30" },
  { id: "4", type: "Virtual", issueType: "Corporate expense", distributed: false, cardholder: "IT Infrastructure", cardholderId: undefined, employees: [], last4: "9988", status: "Active", limit: "RWF 5,000,000", amount:5000000, lastUsed: "Last week", purpose: "Software", validityType: "range", validFrom: "2024-03-01", validUntil: "2024-09-01" },
  { id: "5", type: "Virtual", issueType: "Per diem", distributed: false, cardholder: "Michael Johnson", cardholderId: "emp-5", employees: [{id:"emp-5", name:"Ruth Bizimana"}], last4: "5544", status: "Cancelled", limit: "RWF 0", amount:0, lastUsed: "1 month ago", purpose: "Events", validityType: "single" },
]

const listeners: Array<() => void> = []

export function getCards() {
  return cards.slice()
}

export function addCard(card: Card) {
  cards = [card, ...cards]
  listeners.forEach((l) => l())
}

export function subscribe(fn: () => void) {
  listeners.push(fn)
  return () => {
    const idx = listeners.indexOf(fn)
    if (idx !== -1) listeners.splice(idx, 1)
  }
}
