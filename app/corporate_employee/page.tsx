"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CalendarDaysIcon,
  CreditCardIcon,
  EyeIcon,
  EyeOffIcon,
  FlagIcon,
  TicketIcon,
  Loader2Icon,
  KeyIcon,
  XIcon,
  CheckCircle2Icon,
} from "lucide-react";
import { toast } from "sonner";
import {
  getAllTransactions,
  type CorporateEmployeeTransaction,
} from "@/lib/corporateEmployeeTransactions";
import { getMyCards, changeCardPassword } from "@/lib/cardsStore";

const stats = [
  { label: "Confirmed", value: "0", icon: TicketIcon },
  { label: "Pending", value: "0", icon: FlagIcon },
  { label: "Trips", value: "0", icon: CalendarDaysIcon },
];

function StatCard({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: any;
}) {
  return (
    <div className="rounded-3xl border border-emerald-200/70 bg-white/10 p-2 text-white shadow-lg shadow-emerald-950/20 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-100/80">
          {label}
        </p>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-emerald-100">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-6 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function ChangePasswordModal({
  cardId,
  open,
  onClose,
}: {
  cardId: string;
  open: boolean;
  onClose: () => void;
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }
    setSubmitting(true);
    try {
      await changeCardPassword(cardId, oldPassword, newPassword);
      toast.success("Card password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onClose();
    } catch {
      toast.error("Failed to change password. Check your current password.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Change Card Password
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={4}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={4}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting && <Loader2Icon className="h-4 w-4 animate-spin" />}
            {submitting ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Page() {
  const [showAmount, setShowAmount] = useState(false);
  const [card, setCard] = useState<{
    id: string;
    issueType: "Per diem" | "Corporate expense";
    amount: number;
    spent: number;
    last4: string;
    cardholder: string;
    status: string;
  } | null>(null);
  const [cardLoading, setCardLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState<
    CorporateEmployeeTransaction[]
  >([]);
  const [txnLoading, setTxnLoading] = useState(true);

  const loadCard = async () => {
    try {
      setCardLoading(true);
      const cards = await getMyCards();
      if (cards.length > 0) {
        const c = cards[0];
        setCard({
          id: c.id,
          issueType: c.issueType,
          amount: c.amount || 0,
          spent: c.spent || 0,
          last4: c.last4 || "****",
          cardholder: c.cardholder,
          status: c.status,
        });
      } else {
        setCard(null);
      }
    } catch {
    } finally {
      setCardLoading(false);
    }
  };

  useEffect(() => {
    loadCard();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadCard();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllTransactions();
        setRecentTransactions(data.slice(0, 3));
      } catch {
      } finally {
        setTxnLoading(false);
      }
    };
    load();
  }, []);

  const router = useRouter();
  const formattedAmount = (amount: number) => `RWF ${amount.toLocaleString()}`;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <ChangePasswordModal
        cardId={card?.id || ""}
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />

      <div className="flex-2 space-y-1">
        <section
          id="card"
          className="overflow-hidden rounded-[2rem] bg-emerald-950 mb-6 text-white shadow-xl shadow-emerald-950/40"
        >
          {cardLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2Icon className="h-8 w-8 animate-spin text-emerald-400" />
            </div>
          ) : card ? (
            <div className="gap-6">
              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-[0_25px_100px_-60px_rgba(5,150,105,0.45)] backdrop-blur-xl">
                <div className="">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                      {card.id}
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                      {card.issueType}
                    </p>
                  </div>
                  <p className="mt-3 text-base tracking-[0.12em] text-emerald-100">
                    {card.cardholder}
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-end justify-center sm:justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                        Card number
                      </p>
                      <p className="mt-2 text-xl font-semibold tracking-[0.24em] text-white">
                        **** **** **** {card.last4}
                      </p>
                    </div>
                    <div className="px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/90">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80 mb-2">
                            Remaining balance
                          </p>
                          <p className="mt-2 text-3xl font-semibold text-white">
                            {showAmount
                              ? formattedAmount(card.amount - card.spent)
                              : "RWF ••••••"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowAmount((current) => !current)}
                          className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-emerald-100 transition hover:bg-white/15"
                        >
                          {showAmount ? (
                            <EyeOffIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-emerald-100 transition hover:bg-white/20"
                  >
                    <KeyIcon className="h-3.5 w-3.5" />
                    Change PIN
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-white/25 bg-white/5 p-6 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
                No active card
              </p>
              <h2 className="mt-4 text-3xl font-semibold">
                No active card available
              </h2>
              <p className="mt-3 text-sm text-emerald-100/80">
                Your card has been cancelled or is not yet active. Request a new
                card from your finance team.
              </p>
            </div>
          )}
        </section>

        <section className="grid gap-4 xl:grid-cols-1">
          <div className="w-full">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Active Tours
                  </h3>
                  <a className="text-sm text-emerald-700">View All</a>
                </div>
                <div className="mt-6 flex items-center justify-center p-8">
                  <div className="text-center text-slate-400">
                    <div className="mb-3">
                      <svg
                        className="mx-auto h-8 w-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M3 7l6-4 6 4 6-4v13a1 1 0 01-1 1H4a1 1 0 01-1-1V7z"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <p className="text-sm">No tours found</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Pending Bookings
                  </h3>
                  <a className="text-sm text-emerald-700">View All</a>
                </div>
                <div className="mt-6 flex items-center justify-center p-8">
                  <div className="text-center text-slate-400">
                    <div className="mb-3">
                      <svg
                        className="mx-auto h-8 w-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <p className="text-sm">No pending bookings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex-1 space-y-6">
        <div className="space-y-4 h-full rounded-[1.5rem] bg-slate-50 shadow-sm border border-slate-200 xl:self-start xl:sticky xl:top-24">
          <div className="rounded-3xl p-5 text-slate-950">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Recent
                </p>
              </div>
              <Link
                href="/corporate_employee/payments"
                className="rounded-full bg-emerald-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                More
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {txnLoading ? (
                <div className="flex justify-center p-4">
                  <Loader2Icon className="h-5 w-5 animate-spin text-slate-400" />
                </div>
              ) : (
                recentTransactions.map((txn) => (
                  <button
                    key={txn.id}
                    type="button"
                    onClick={() =>
                      router.push(`/corporate_employee/payments/${txn.id}`)
                    }
                    className="w-full rounded-3xl bg-white p-4 text-left shadow-sm border border-slate-200 transition hover:border-emerald-200 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">
                          {txn.title}
                        </p>
                        <p className="text-xs text-slate-500">{txn.datetime}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">
                          {formattedAmount(txn.amount)}
                        </p>
                        <p className="text-xs text-slate-500">{txn.status}</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
