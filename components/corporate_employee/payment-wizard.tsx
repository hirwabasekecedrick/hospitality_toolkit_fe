"use client"

import { Html5Qrcode } from "html5-qrcode"
import { useEffect, useId, useRef, useState } from "react"
import { ArrowRightIcon, LockIcon, QrCodeIcon } from "lucide-react"

interface PaymentWizardProps {
  onPaymentConfirmed: (payment: { hotelId: string; amount: number }) => void
}

export function CorporateEmployeePaymentWizard({ onPaymentConfirmed }: PaymentWizardProps) {
  const [step, setStep] = useState<"scan" | "amount" | "confirm">("scan")
  const [hotelId, setHotelId] = useState("")
  const [amount, setAmount] = useState("")
  const [password, setPassword] = useState("")
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "found" | "error">("idle")
  const [scanError, setScanError] = useState("")
  const [scannerActive, setScannerActive] = useState(false)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const scannerRunningRef = useRef(false)
  const scannerId = useId()

  const hasValidAmount = Number(amount) > 0
  const canContinueFromScan = hotelId.trim().length > 0
  const canConfirmPayment = password.trim().length > 0 && hasValidAmount
  const stepIndex = step === "scan" ? 0 : step === "amount" ? 1 : 2

  useEffect(() => {
    return () => {
      if (scannerRef.current && scannerRunningRef.current) {
        try {
          // stop may return a promise or undefined depending on version
          void scannerRef.current.stop()
        } catch {
          // ignore
        }
        scannerRunningRef.current = false
      }
      if (scannerRef.current) {
        try {
          void scannerRef.current.clear()
        } catch {
          // ignore
        }
      }
    }
  }, [])

  useEffect(() => {
    if (step === "scan" && !scannerRunningRef.current && !scannerActive) {
      startScanner().catch(() => null)
    }
  }, [step, scannerActive])

  const startScanner = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setScanError("Camera access is not available in this browser.")
      return
    }

    if (scannerActive || scannerRunningRef.current) {
      return
    }

    setScanError("")
    setScanStatus("scanning")

    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode(scannerId.replace(":", "-"))
    }

    try {
      await scannerRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          setHotelId(decodedText)
          setScanStatus("found")
          if (scannerRunningRef.current) {
            try {
              void scannerRef.current?.stop()
            } catch {
              // ignore
            }
            scannerRunningRef.current = false
          }
          setScannerActive(false)
          setTimeout(() => setStep("amount"), 300)
        },
        (errorMessage) => {
          if (errorMessage) {
            setScanStatus("scanning")
          }
        }
      )
      scannerRunningRef.current = true
      setScannerActive(true)
    } catch (error) {
      setScanStatus("error")
      setScanError(
        error instanceof Error ? error.message : "Unable to start QR scanner."
      )
    }
  }

  const stopScanner = async () => {
    if (scannerRef.current && scannerRunningRef.current) {
      try {
        void scannerRef.current.stop()
      } catch {
        // ignore
      }
      scannerRunningRef.current = false
    }

    if (scannerRef.current) {
      try {
        void scannerRef.current.clear()
      } catch {
        // ignore
      }
    }

    setScannerActive(false)
    setScanStatus("idle")
  }

  const handleConfirm = () => {
    if (!canConfirmPayment) {
      return
    }

    onPaymentConfirmed({ hotelId: hotelId.trim(), amount: Number(amount) })
    setHotelId("")
    setAmount("")
    setPassword("")
    setStep("scan")
    setScanStatus("idle")
    stopScanner()
  }

  return (
    <div className="space-y-6">
            {step === "scan" && (
        <div className="">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900/10">
              <div id={scannerId.replace(":", "-")} className="h-[320px] w-full bg-slate-900/10" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={scannerActive ? stopScanner : startScanner}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                {scannerActive ? "Stop scanning" : "Start scanning"}
              </button>
              <button
                type="button"
                onClick={() => setStep("amount")}
                disabled={!canContinueFromScan}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue to amount
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Hotel QR / ID</label>
                <input
                  value={hotelId}
                  onChange={(event) => setHotelId(event.target.value)}
                  placeholder="Scan or paste hotel QR code"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
                />
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-medium">Current hotel</p>
                <p className="mt-2 text-slate-500">{hotelId || "No hotel ID scanned yet."}</p>
              </div>
            </div>

            {scanStatus === "found" && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                QR code scanned successfully. Press Continue to enter the payment amount.
              </div>
            )}
            {scanError && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                {scanError}
              </div>
            )}
          </div>
        </div>
      )}

      {step === "amount" && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-950/5 p-5 text-slate-700">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Step 2</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">Enter the payment amount</h3>
              <p className="mt-2 text-sm text-slate-500">Enter the exact amount for this hotel before proceeding to password confirmation.</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Hotel ID</label>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                  {hotelId || "No hotel selected."}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Amount (RWF)</label>
                <input
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="200000"
                  type="number"
                  min={0}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setStep("scan")}
                className="rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Back to scan
              </button>
              <button
                type="button"
                onClick={() => setStep("confirm")}
                disabled={!hasValidAmount}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue to password
              </button>
            </div>

            {!hasValidAmount && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Enter a valid amount to continue.
              </div>
            )}
          </div>
        </div>
      )}

      {step === "confirm" && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-950/5 p-5 text-slate-700">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Step 3</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">Confirm with your password</h3>
              <p className="mt-2 text-sm text-slate-500">Finalize this payment by entering your password.</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Hotel ID</label>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                  {hotelId}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Amount (RWF)</label>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                  {hasValidAmount ? `RWF ${Number(amount).toLocaleString()}` : "Enter an amount"}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm text-slate-900 outline-none"
                />
                <LockIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setStep("amount")}
                className="rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Back to amount
              </button>
              <button
                type="button"
                disabled={!canConfirmPayment}
                onClick={handleConfirm}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Complete payment
              </button>
            </div>

            {!canConfirmPayment && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Enter a valid amount and your password to finish the payment.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
