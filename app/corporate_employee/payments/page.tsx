"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDownLeftIcon,
  ReceiptTextIcon,
  AlertCircleIcon,
  Loader2Icon,
} from "lucide-react";
import { CorporateEmployeePaymentWizard } from "@/components/corporate_employee/payment-wizard";
import {
  getAllTransactions,
  type CorporateEmployeeTransaction,
} from "@/lib/corporateEmployeeTransactions";
function formatAmount(amount: number) {
  return `RWF ${amount.toLocaleString()}`;
}

function getStatusStyles(statusVariant: string) {
  switch (statusVariant) {
    case "success":
      return "inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200";
    case "warning":
      return "inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-700 border border-orange-200";
    default:
      return "inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 border border-slate-200";
  }
}

export default function Page() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"amount_desc" | "amount_asc">(
    "amount_desc",
  );
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentDescription, setPaymentDescription] = useState("");
  const [showWizard, setShowWizard] = useState(false);
  const [transactionsData, setTransactionsData] = useState<
    CorporateEmployeeTransaction[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllTransactions();
        setTransactionsData(data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredTransactions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return transactionsData
      .filter((txn) => {
        if (!query) return true;

        return (
          txn.id.toLowerCase().includes(query) ||
          txn.title.toLowerCase().includes(query) ||
          (txn.employeeName || "").toLowerCase().includes(query) ||
          (txn.organization || "").toLowerCase().includes(query) ||
          formatAmount(txn.amount).toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (sortOrder === "amount_asc") {
          return a.amount - b.amount;
        }
        return b.amount - a.amount;
      });
  }, [searchTerm, sortOrder, transactionsData]);

  const recentClients = useMemo(() => {
    const map = new Map<
      string,
      { organization: string; employeeName: string }
    >();
    transactionsData.forEach((txn) => {
      const org = txn.organization || "";
      if (!map.has(org)) {
        map.set(org, {
          organization: org,
          employeeName: txn.employeeName || "",
        });
      }
    });
    return Array.from(map.values()).slice(0, 5);
  }, [transactionsData]);

  const handlePaymentComplete = async (result: {
    hotelName: string;
    amount: number;
  }) => {
    setShowWizard(false);
    const data = await getAllTransactions();
    setTransactionsData(data);
    setPaymentDescription(
      `${result.hotelName} • ${formatAmount(result.amount)}`,
    );
    setPaymentConfirmed(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2Icon className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

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
              <h1 className="text-2xl font-semibold text-slate-950">
                Payments
              </h1>
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
          <CorporateEmployeePaymentWizard
            onComplete={handlePaymentComplete}
            onCancel={() => setShowWizard(false)}
          />
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Transaction details</th>
                <th className="px-6 py-4 font-semibold">Employee</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="cursor-pointer hover:bg-slate-50/50 transition-colors"
                  onClick={() =>
                    router.push(`/corporate_employee/payments/${txn.id}`)
                  }
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${txn.icon === "alert" ? "bg-orange-100 text-orange-700" : txn.icon === "arrow" ? "bg-slate-100 text-slate-700" : "bg-emerald-100 text-emerald-700"}`}
                      >
                        {txn.icon === "receipt" ? (
                          <ReceiptTextIcon className="h-5 w-5" />
                        ) : txn.icon === "arrow" ? (
                          <ArrowDownLeftIcon className="h-5 w-5" />
                        ) : (
                          <AlertCircleIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {txn.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {txn.datetime} • {txn.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">
                      {txn.employeeName}
                    </p>
                    <p className="text-xs text-slate-500">{txn.organization}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {formatAmount(txn.amount)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={getStatusStyles(txn.statusVariant)}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No transactions found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
