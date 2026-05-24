"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, MapPinIcon, StarIcon, ExternalLinkIcon } from "lucide-react"

const MOCK_HOTELS = [
  { id: "1", name: "Kigali Marriott Hotel", location: "KN 3 Ave, Kigali", rating: 5, status: "Integrated", negotiatedRate: "15% off Best Available" },
  { id: "2", name: "Radisson Blu Hotel", location: "KG 2 Roundabout, Kigali", rating: 5, status: "Integrated", negotiatedRate: "Corporate Rate A" },
  { id: "3", name: "Kigali Serena Hotel", location: "KN 3 Ave, Kigali", rating: 5, status: "Integrated", negotiatedRate: "20% off Room Only" },
  { id: "4", name: "Ubumwe Grande Hotel", location: "KN 67 St, Kigali", rating: 4, status: "Pending", negotiatedRate: "Negotiation Ongoing" },
  { id: "5", name: "Mantis Epic Hotel", location: "Nyagatare", rating: 4, status: "Integrated", negotiatedRate: "Standard Corporate" },
]

const UNIQUE_LOCATIONS = Array.from(new Set(MOCK_HOTELS.map(hotel => hotel.location)))
const UNIQUE_STATUSES = Array.from(new Set(MOCK_HOTELS.map(hotel => hotel.status)))

export function HotelsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("rating_desc")

  const filteredHotels = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return MOCK_HOTELS.filter((hotel) => {
      const matchesSearch =
        normalizedSearch === "" ||
        hotel.name.toLowerCase().includes(normalizedSearch) ||
        hotel.location.toLowerCase().includes(normalizedSearch) ||
        hotel.status.toLowerCase().includes(normalizedSearch) ||
        hotel.negotiatedRate.toLowerCase().includes(normalizedSearch)

      const matchesLocation = locationFilter === "all" || hotel.location === locationFilter
      const matchesStatus = statusFilter === "all" || hotel.status === statusFilter

      return matchesSearch && matchesLocation && matchesStatus
    }).sort((a, b) => {
      if (sortOrder === "rating_asc") {
        return a.rating - b.rating || a.name.localeCompare(b.name)
      }
      if (sortOrder === "rating_desc") {
        return b.rating - a.rating || a.name.localeCompare(b.name)
      }
      return a.name.localeCompare(b.name)
    })
  }, [searchTerm, locationFilter, statusFilter, sortOrder])

  return (
    <div className="space-y-4">
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1.7fr_1.3fr] lg:grid-cols-[1.8fr_2.2fr]">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by hotel name, location, status or rate"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {UNIQUE_LOCATIONS.map((location) => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {UNIQUE_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating_desc">Rating: High to Low</SelectItem>
              <SelectItem value="rating_asc">Rating: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group w-full">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{hotel.name}</h3>
                    <div className="flex items-center text-slate-500 mt-2 text-sm">
                      <MapPinIcon className="h-4 w-4 mr-1" /> {hotel.location}
                    </div>
                  </div>
                  <Badge className={hotel.status === 'Integrated' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}>
                    {hotel.status}
                  </Badge>
                </div>

                <div className="flex items-center text-amber-500 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`h-4 w-4 ${i < hotel.rating ? 'fill-current' : 'text-slate-200'}`} />
                  ))}
                </div>
              </div>

              <div className="min-w-[220px] rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-900 mb-1">Corporate Agreement</p>
                <p className="text-sm text-slate-500">{hotel.negotiatedRate}</p>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => alert("Loading hotel details...")}>
                View Details <ExternalLinkIcon className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        ))}
        {filteredHotels.length === 0 && (
          <div className="py-12 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
            <MapPinIcon className="h-8 w-8 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No partner hotels found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
