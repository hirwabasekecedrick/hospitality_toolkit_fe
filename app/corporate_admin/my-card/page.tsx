"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Loader2Icon, CheckCircle2Icon } from "lucide-react";
import { CorporateEmployeePaymentWizard } from "@/components/corporate_employee/payment-wizard";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentDescription, setPaymentDescription] = useState("");

  const loadCards = async () => {
    try {
      setLoading(true);
      const d = await api.get<any[]>("/cards/my");
      setCards(d || []);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadCards();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const handlePaymentComplete = async (result: {
    hotelName: string;
    amount: number;
  }) => {
    setShowWizard(false);
    const d = await api.get<any[]>("/cards/my");
    setCards(d || []);
    setPaymentDescription(
      `${result.hotelName} • RWF ${result.amount.toLocaleString()}`,
    );
    setPaymentConfirmed(true);
  };

  return (
    <div className="space-y-6">
      {paymentConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-6">
          <div className="w-full max-w-2xl rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">
              Payment confirmed
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">
              Success
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              {paymentDescription ||
                "The hotel operator has been notified and the transaction is now stored in the system."}
            </p>
            <button
              className="mt-8 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
              onClick={() => setPaymentConfirmed(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="">
        {!showWizard ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-950">My card</h1>
            </div>
            <button
              type="button"
              onClick={() => setShowWizard(true)}
              className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Pay now
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowWizard(false)}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                ← Back to cards
              </button>
            </div>
            <CorporateEmployeePaymentWizard
              onComplete={handlePaymentComplete}
              onCancel={() => setShowWizard(false)}
            />
          </>
        )}
      </div>

      {!showWizard && (
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2Icon className="h-6 w-6 animate-spin text-slate-400" />
            </div>
          ) : cards.length === 0 ? (
            <p className="text-sm text-slate-500">
              You do not currently have a card.
            </p>
          ) : (
            <div className="space-y-4">
              {cards.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-4 rounded-md border p-4"
                >
                  <div>
                    <p className="font-medium">
                      {c.type} • **** {c.last4}
                    </p>
                    <p className="text-sm text-slate-500">
                      Status: {c.status} • Limit:{" "}
                      {c.limit ? `RWF ${c.limit.toLocaleString()}` : "—"}
                    </p>
                    <p className="text-sm text-slate-500">
                      Remaining: RWF{" "}
                      {((c.amount || 0) - (c.spent || 0)).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        router.push("/corporate_admin/my-card/transactions")
                      }
                      className="rounded bg-slate-100 px-3 py-2 text-sm"
                    >
                      View transactions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
