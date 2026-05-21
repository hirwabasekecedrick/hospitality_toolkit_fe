"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, Building2Icon, MapPinIcon, StarIcon, ExternalLinkIcon } from "lucide-react"

const MOCK_HOTELS = [
  { id: "1", name: "Kigali Marriott Hotel", location: "KN 3 Ave, Kigali", rating: 5, status: "Integrated", negotiatedRate: "15% off Best Available" },
  { id: "2", name: "Radisson Blu Hotel", location: "KG 2 Roundabout, Kigali", rating: 5, status: "Integrated", negotiatedRate: "Corporate Rate A" },
  { id: "3", name: "Kigali Serena Hotel", location: "KN 3 Ave, Kigali", rating: 5, status: "Integrated", negotiatedRate: "20% off Room Only" },
  { id: "4", name: "Ubumwe Grande Hotel", location: "KN 67 St, Kigali", rating: 4, status: "Pending", negotiatedRate: "Negotiation Ongoing" },
  { id: "5", name: "Mantis Epic Hotel", location: "Nyagatare", rating: 4, status: "Integrated", negotiatedRate: "Standard Corporate" },
]

export function HotelsList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredHotels = MOCK_HOTELS.filter(hotel => 
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by hotel name or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Building2Icon className="h-6 w-6" />
                </div>
                <Badge className={hotel.status === 'Integrated' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}>
                  {hotel.status}
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{hotel.name}</h3>
              <div className="flex items-center text-slate-500 mt-2 text-sm">
                <MapPinIcon className="h-4 w-4 mr-1" /> {hotel.location}
              </div>
              <div className="flex items-center text-amber-500 mt-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={`h-4 w-4 ${i < hotel.rating ? 'fill-current' : 'text-slate-200'}`} />
                ))}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-sm font-medium text-slate-900 mb-1">Corporate Agreement</p>
              <p className="text-sm text-slate-500">{hotel.negotiatedRate}</p>
              <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                View Details <ExternalLinkIcon className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        ))}
        {filteredHotels.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
            <Building2Icon className="h-8 w-8 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No partner hotels found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
