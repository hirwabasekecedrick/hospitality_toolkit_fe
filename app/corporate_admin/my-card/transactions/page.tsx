"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  getAllTransactions,
  type CorporateEmployeeTransaction,
} from "@/lib/corporateEmployeeTransactions";
import { useRouter } from "next/navigation";

function formatAmount(amount: number) {
  return `RWF ${amount.toLocaleString()}`;
}

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<
    CorporateEmployeeTransaction[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getAllTransactions()
      .then((data) => {
        if (!mounted) return;
        // filter to only transactions by this user
        const mine = data.filter((t) => t.userId === (user?.id || ""));
        setTransactions(mine);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, [user]);

  const rows = useMemo(() => transactions, [transactions]);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Transactions</h1>
      </div>

      <div className="rounded-md border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold">Details</th>
                <th className="px-6 py-3 font-semibold">Amount</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="cursor-pointer hover:bg-slate-50/50"
                  onClick={() =>
                    router.push(`/corporate_employee/payments/${r.id}`)
                  }
                >
                  <td className="px-6 py-4">
                    <div className="font-medium">{r.title}</div>
                    <div className="text-xs text-slate-500">{r.datetime}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {formatAmount(r.amount)}
                  </td>
                  <td className="px-6 py-4">{r.status}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No transactions found.
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
