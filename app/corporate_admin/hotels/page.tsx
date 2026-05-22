import { HotelsList } from "@/components/corporate_admin/hotels-list"

export default function Page() {
  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">Partner Hotels</h1>
            <p className="mt-1 text-sm text-slate-500">View and manage integrated hotel properties and negotiated corporate rates.</p>
          </div>
        </div>
      </div>
      <HotelsList />
    </div>
  )
}
