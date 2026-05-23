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

export type RawRedeemDetail = Omit<RedeemDetail, "amount" | "transactionCount">

const computeAmount = (transactions: RedeemTransaction[]) =>
  transactions.reduce((sum, item) => sum + item.amount, 0)

const rawRedeemDetails: Record<string, RawRedeemDetail> = {
  "r-001": {
    id: "r-001",
    title: "Weekly payout #1",
    schedule: "Every week",
    status: "Pending",
    createdAt: "2026-05-10",
    nextRun: "2026-05-24 08:00",
    description: "Weekly redeem for the hotel operator's processed reservations and vendor settlements.",
    requestedBy: "Hotel Finance Team",
    paymentMethod: "Bank transfer",
    externalReference: "WEEKLY-001",
    transactions: [
      { id: "t-1001", amount: 250.0, guest: "Alice", date: "2026-05-03", status: "Redeemed", property: "Sunset Suites", reference: "BOOK-5901" },
      { id: "t-1002", amount: 1000.0, guest: "Bob", date: "2026-05-07", status: "Redeemed", property: "Oceanscape Hotel", reference: "BOOK-5918" },
      { id: "t-1003", amount: 120.0, guest: "Evelyn", date: "2026-05-08", status: "Redeemed", property: "City Inn", reference: "BOOK-5932" },
      { id: "t-1004", amount: 380.0, guest: "Frank", date: "2026-05-09", status: "Redeemed", property: "Sunset Suites", reference: "BOOK-5944" },
      { id: "t-1005", amount: 100.0, guest: "Ivy", date: "2026-05-09", status: "Redeemed", property: "Mountain Lodge", reference: "BOOK-5949" },
    ],
  },
  "r-002": {
    id: "r-002",
    title: "Daily payout - May 20",
    schedule: "Every day",
    status: "Completed",
    createdAt: "2026-05-20",
    nextRun: "2026-05-21 07:00",
    description: "Daily collection for yesterday's completed bookings and settled reservations.",
    requestedBy: "Automated daily settle",
    paymentMethod: "Virtual card",
    externalReference: "DAILY-0520",
    transactions: [
      { id: "t-1101", amount: 120.5, guest: "Charlie", date: "2026-05-20", status: "Completed", property: "Oak Residence", reference: "BOOK-6011" },
      { id: "t-1102", amount: 200.0, guest: "Dana", date: "2026-05-20", status: "Completed", property: "Lakeview Resort", reference: "BOOK-6023" },
    ],
  },
  "r-003": {
    id: "r-003",
    title: "Custom interval redeem",
    schedule: "Custom: every 12 hours",
    status: "Processing",
    createdAt: "2026-05-21",
    nextRun: "2026-05-22 18:00",
    description: "Custom half-day redemption to support interim cash flow needs.",
    requestedBy: "Operator cash flow adjustment",
    paymentMethod: "Bank transfer",
    externalReference: "CUSTOM-120H",
    transactions: [
      { id: "t-1201", amount: 300.0, guest: "Gina", date: "2026-05-21", status: "Processing", property: "Skyline Suites", reference: "BOOK-6101" },
      { id: "t-1202", amount: 180.0, guest: "Hannah", date: "2026-05-21", status: "Processing", property: "Riverside Lodge", reference: "BOOK-6106" },
      { id: "t-1203", amount: 100.0, guest: "Isaac", date: "2026-05-21", status: "Processing", property: "Oceanscape Hotel", reference: "BOOK-6110" },
    ],
  },
  "r-004": {
    id: "r-004",
    title: "Monthly batch",
    schedule: "Every month",
    status: "Failed",
    createdAt: "2026-05-01",
    nextRun: "2026-06-01 09:00",
    description: "Monthly settlement that requires manual review after a failed payout attempt.",
    requestedBy: "Monthly settlement batch",
    paymentMethod: "Bank transfer",
    externalReference: "MONTHLY-004",
    transactions: [
      { id: "t-1301", amount: 200.0, guest: "Jake", date: "2026-05-02", status: "Failed", property: "Sunset Suites", reference: "BOOK-6201" },
      { id: "t-1302", amount: 320.0, guest: "Karen", date: "2026-05-03", status: "Failed", property: "City Inn", reference: "BOOK-6208" },
      { id: "t-1303", amount: 500.0, guest: "Leo", date: "2026-05-05", status: "Failed", property: "Oceanscape Hotel", reference: "BOOK-6212" },
      { id: "t-1304", amount: 200.75, guest: "Maya", date: "2026-05-07", status: "Failed", property: "Lakeview Resort", reference: "BOOK-6219" },
    ],
  },
}

export const mockRedeemDetails = Object.fromEntries(
  Object.entries(rawRedeemDetails).map(([id, redeem]) => [
    id,
    {
      ...redeem,
      amount: computeAmount(redeem.transactions),
      transactionCount: redeem.transactions.length,
    },
  ])
) as Record<string, RedeemDetail>

export const mockRedeems: RedeemSummary[] = Object.values(mockRedeemDetails).map((detail) => ({
  id: detail.id,
  title: detail.title,
  amount: detail.amount,
  schedule: detail.schedule,
  status: detail.status,
  createdAt: detail.createdAt,
  nextRun: detail.nextRun,
  transactionCount: detail.transactionCount,
  description: detail.description,
}))

export const getRedeemList = () => mockRedeems
export const getRedeemById = (id: string) => mockRedeemDetails[id]
