"use client"

import { useEffect, useState } from "react"
import { Building2Icon, CreditCardIcon, LockIcon, Loader2Icon, CheckCircle2Icon } from "lucide-react"
import { api } from "@/lib/api-client"
import { getMyCards, type Card } from "@/lib/cardsStore"

interface PaymentWizardProps {
  onComplete: (result: { hotelName: string; amount: number }) => void
  onCancel: () => void
}

type Step = "code" | "amount" | "confirm"

const STEP_LABELS: Record<Step, string> = {
  code: "Hotel code",
  amount: "Amount",
  confirm: "Confirm",
}

export function CorporateEmployeePaymentWizard({ onComplete, onCancel }: PaymentWizardProps) {
  const [step, setStep] = useState<Step>("code")
  const [hotelCode, setHotelCode] = useState("")
  const [hotelName, setHotelName] = useState("")
  const [amount, setAmount] = useState("")
  const [cards, setCards] = useState<Card[]>([])
  const [selectedCardId, setSelectedCardId] = useState("")
  const [cardPassword, setCardPassword] = useState("")
  const [cardsLoading, setCardsLoading] = useState(true)
  const [hotelLookupLoading, setHotelLookupLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const steps: Step[] = ["code", "amount", "confirm"]
  const currentIdx = steps.indexOf(step)
  const activeCards = cards.filter(c => c.status === "Active")
  const hasValidAmount = Number(amount) > 0
  const canConfirm = selectedCardId && cardPassword.trim().length > 0 && hasValidAmount

  useEffect(() => {
    getMyCards()
      .then(setCards)
      .catch(() => {})
      .finally(() => setCardsLoading(false))
  }, [])

  useEffect(() => {
    if (activeCards.length === 1) setSelectedCardId(activeCards[0].id)
  }, [cards.length]) // eslint-disable-line

  const handleLookupHotel = async () => {
    setError("")
    setHotelLookupLoading(true)
    try {
      const result = await api.post<{ hotelName: string; hotelCode: string }>("/payments/initiate", {
        hotelCode: hotelCode.trim(),
      })
      setHotelName(result.hotelName)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hotel not found. Check the code and try again.")
    } finally {
      setHotelLookupLoading(false)
    }
  }

  const handleConfirm = async () => {
    setError("")
    setSubmitting(true)
    try {
      await api.post("/payments/confirm", {
        hotelCode: hotelCode.trim(),
        amount: Number(amount),
        cardPassword: cardPassword.trim(),
        cardId: selectedCardId,
      })
      onComplete({ hotelName, amount: Number(amount) })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const cardRemaining = (card: Card) => (card.amount || 0) - (card.spent || 0)

  return (
    <div className="space-y-6">
      {/* Steps indicator */}
      <div className="flex items-center gap-2 text-sm">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                s === step
                  ? "bg-emerald-700 text-white"
                  : i < currentIdx
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {i < currentIdx ? <CheckCircle2Icon className="h-4 w-4" /> : i + 1}
            </div>
            <span className={s === step ? "font-medium text-slate-900" : "text-slate-400"}>
              {STEP_LABELS[s]}
            </span>
            {i < 2 && <span className="text-slate-300">—</span>}
          </div>
        ))}
      </div>

      {/* Step 1: Hotel code */}
      {step === "code" && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-950/5 p-5">
              <h3 className="text-2xl font-semibold text-slate-950">Enter hotel code</h3>
              <p className="mt-2 text-sm text-slate-500">Look up the hotel by entering its unique code.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Hotel code</label>
              <input
                value={hotelCode}
                onChange={(e) => { setHotelCode(e.target.value.toUpperCase()); setHotelName("") }}
                placeholder="e.g. HIL001"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none uppercase"
                onKeyDown={(e) => { if (e.key === "Enter" && hotelCode.trim()) handleLookupHotel() }}
              />
            </div>

            <button
              type="button"
              onClick={handleLookupHotel}
              disabled={!hotelCode.trim() || hotelLookupLoading}
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {hotelLookupLoading ? <><Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Looking up...</> : "Look up hotel"}
            </button>

            {hotelName && (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <Building2Icon className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-emerald-800">{hotelName}</p>
                  <p className="text-sm text-emerald-600">Code: {hotelCode}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={onCancel} className="rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
                Cancel
              </button>
              <button type="button" onClick={() => setStep("amount")} disabled={!hotelName} className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50">
                Continue to amount
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Amount */}
      {step === "amount" && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-950/5 p-5">
              <h3 className="text-2xl font-semibold text-slate-950">Payment amount</h3>
              <p className="mt-2 text-sm text-slate-500">Enter the amount to pay to <strong>{hotelName}</strong>.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Amount (RWF)</label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="200000"
                type="number"
                min={0}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep("code")} className="rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
                Back
              </button>
              <button type="button" onClick={() => setStep("confirm")} disabled={!hasValidAmount} className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50">
                Continue to confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === "confirm" && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-950/5 p-5">
              <h3 className="text-2xl font-semibold text-slate-950">Confirm payment</h3>
              <p className="mt-2 text-sm text-slate-500">Review the details and enter your card password.</p>
            </div>

            {/* Summary card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Hotel</span>
                <span className="font-medium text-slate-900">{hotelName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Code</span>
                <span className="font-medium text-slate-900">{hotelCode}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <span className="text-sm text-slate-500">Total</span>
                <span className="text-xl font-semibold text-slate-900">RWF {Number(amount).toLocaleString()}</span>
              </div>
            </div>

            {/* Card selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Payment card</label>
              {cardsLoading ? (
                <div className="flex items-center gap-2 text-sm text-slate-500"><Loader2Icon className="h-4 w-4 animate-spin" /> Loading cards...</div>
              ) : activeCards.length === 0 ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">No active cards available.</div>
              ) : activeCards.length === 1 ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center gap-3">
                  <CreditCardIcon className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium text-slate-900">{activeCards[0].issueType} •••• {activeCards[0].last4}</p>
                    <p className="text-xs text-slate-500">Remaining: RWF {cardRemaining(activeCards[0]).toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {activeCards.map((card) => (
                    <label key={card.id} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${selectedCardId === card.id ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-slate-50 hover:bg-slate-100"}`}>
                      <input type="radio" name="card" value={card.id} checked={selectedCardId === card.id} onChange={() => setSelectedCardId(card.id)} className="h-4 w-4 text-emerald-600" />
                      <CreditCardIcon className="h-5 w-5 text-slate-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 truncate">{card.issueType} •••• {card.last4}</p>
                        <p className="text-xs text-slate-500">Remaining: RWF {cardRemaining(card).toLocaleString()}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Card password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Card password</label>
              <div className="relative">
                <input
                  type="password"
                  value={cardPassword}
                  onChange={(e) => setCardPassword(e.target.value)}
                  placeholder="Enter card password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm text-slate-900 outline-none"
                  onKeyDown={(e) => { if (e.key === "Enter" && canConfirm && !submitting) handleConfirm() }}
                />
                <LockIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep("amount")} disabled={submitting} className="rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 disabled:opacity-50">
                Back
              </button>
              <button type="button" onClick={handleConfirm} disabled={!canConfirm || submitting || activeCards.length === 0} className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50">
                {submitting ? <><Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Pay RWF " + Number(amount).toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
