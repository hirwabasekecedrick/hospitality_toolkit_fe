import Link from "next/link";
import { ServiceProviderMap } from "@/components/corporate_employee/service-provider-map";
import { getTransactionDetails } from "@/lib/corporateEmployeeTransactions";

type Props = { params: Promise<{ transactionId: string }> };

function formatAmount(amount: number) {
  return `RWF ${amount.toLocaleString()}`;
}

export default async function Page({ params }: Props) {
  const { transactionId } = await params;
  const transaction = getTransactionDetails(transactionId);

  if (!transaction) {
    return (
      <div className="space-y-6 px-0">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-950">
                Transaction not found
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Could not find details for {transactionId}.
              </p>
            </div>
            <Link
              href="/corporate_employee"
              className="text-sm font-semibold text-emerald-700"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const user = transaction.user;
  const provider = transaction.serviceProvider;

  return (
    <div className="space-y-6 px-0">
      <div className="">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950">
              {transaction.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Transaction ID: {transaction.id}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/corporate_employee/payments"
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Back to payments
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          {/* Transaction Info */}
          <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-950">
                Transaction Details
              </h3>

              <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                {transaction.status}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-slate-500">Amount</p>
                <p className="text-2xl font-bold text-slate-950">
                  {formatAmount(transaction.amount)}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Payment Method</p>
                <p className="font-medium text-slate-900">
                  {transaction.paymentMethod}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Date</p>
                <p className="font-medium text-slate-900">
                  {transaction.datetime}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Reference</p>
                <p className="font-medium text-slate-900">
                  {transaction.reference}
                </p>
              </div>
            </div>
          </div>

          {/* Provider Info */}
          <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-950">
              Service Provider
            </h3>

            <div className="mt-6 space-y-3">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-semibold text-slate-950">
                  {provider?.name ?? "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Category</p>
                <p className="text-slate-900">{provider?.category ?? "N/A"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Address</p>
                <p className="text-slate-900">
                  {provider?.location.address ?? "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="text-slate-900">
                  {provider?.contact.phone ?? "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          {/* <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6"> */}
          {/* <h2 className="text-lg font-semibold text-slate-950">
              What happened
            </h2> */}
          {/* <p className="mt-3 text-sm leading-7 text-slate-700">
              {transaction.details}
            </p> */}
          {/* </div> */}

          {provider ? (
            <div className="rounded-3xl w-full border border-slate-200 bg-slate-50 p-0">
              <div className="">
                <ServiceProviderMap
                  latitude={provider.location.latitude}
                  longitude={provider.location.longitude}
                  name={provider.name}
                  address={provider.location.address}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
