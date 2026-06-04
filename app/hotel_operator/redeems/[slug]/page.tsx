import * as React from "react"
import { getRedeemById, type RedeemDetail, type RedeemTransaction } from "@/lib/redeems"

type Props = { params: Promise<{ slug: string }> }

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-800",
  Completed: "bg-emerald-100 text-emerald-800",
  Processing: "bg-sky-100 text-sky-800",
  Failed: "bg-rose-100 text-rose-800",
  Unknown: "bg-slate-100 text-slate-800",
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const data: RedeemDetail | undefined = await getRedeemById(slug)

  if (!data) {
    return (
      <div className="space-y-6 px-0">
        <div className="rounded-3xl bg-white p-6">
          <h1 className="text-2xl font-semibold text-slate-950">Redeem not found</h1>
          <p className="mt-1 text-sm text-slate-500">The redeem with ID {slug} does not exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 px-0">
      <div className="rounded-3xl bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950">{data.title}</h1>
            <p className="mt-1 text-sm text-slate-500">Redeem ID: {data.id}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-600">Amount</div>
            <div className="mt-1 text-2xl font-semibold text-slate-950">RWF {data.amount.toLocaleString()}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-600">Schedule</div>
            <div className="mt-1 text-lg font-semibold text-slate-950">{data.schedule}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-600">Next run</div>
            <div className="mt-1 text-lg font-semibold text-slate-950">{data.nextRun}</div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-600">Payment method</div>
            <div className="mt-1 text-slate-950">{data.paymentMethod}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-600">Reference</div>
            <div className="mt-1 text-slate-950">{data.externalReference}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-600">Created</div>
            <div className="mt-1 text-slate-950">{data.createdAt}</div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Transactions redeemed</h2>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto rounded-3xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100 text-left text-slate-600">
                <tr>
                  <th className="px-4 py-3">Transaction</th>
                  <th className="px-4 py-3">Guest</th>
                  <th className="px-4 py-3">Property</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Reference</th>
                </tr>
              </thead>
              <tbody>
                {data.transactions.map((t: RedeemTransaction) => (
                  <tr key={t.id} className="border-t border-slate-200 even:bg-slate-50">
                    <td className="px-4 py-4 font-medium text-slate-900">{t.id}</td>
                    <td className="px-4 py-4 text-slate-700">{t.guest}</td>
                    <td className="px-4 py-4 text-slate-700">{t.property}</td>
                    <td className="px-4 py-4 text-slate-700">RWF {t.amount.toLocaleString()}</td>
                    <td className="px-4 py-4 text-slate-700">{t.date}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-700">{t.reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
