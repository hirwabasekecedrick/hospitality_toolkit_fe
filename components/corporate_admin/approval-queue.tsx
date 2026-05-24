"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckIcon, XIcon, ClockIcon, ArrowRightIcon, FileTextIcon, BuildingIcon } from "lucide-react"

// Mock Data
type ApprovalItem = {
  id: string
  requester: string
  type: string
  amount: number
  purpose: string
  hotel: string
  dateRequested: string
  status: "pending" | "approved" | "rejected"
}

const INITIAL_QUEUE: ApprovalItem[] = [
  { id: "REQ-001", requester: "Jane Doe", type: "Budget Increase", amount: 150000, purpose: "Client Dinner", hotel: "Kigali Serena Hotel", dateRequested: "2 hours ago", status: "pending" },
  { id: "REQ-002", requester: "Marketing Team", type: "Virtual Card", amount: 5000000, purpose: "Q3 Campaign Launch", hotel: "Marriott Kigali", dateRequested: "5 hours ago", status: "pending" },
  { id: "REQ-003", requester: "John Smith", type: "Transaction > RWF 500k", amount: 850000, purpose: "Conference Room Booking", hotel: "Radisson Blu", dateRequested: "1 day ago", status: "pending" },
]

export function ApprovalQueue() {
  const [queue, setQueue] = useState(INITIAL_QUEUE)

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status: action } : item))
  }

  const pendingCount = queue.filter(item => item.status === "pending").length

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {queue.map(item => (
          <div key={item.id} className={`rounded-xl border ${item.status === 'pending' ? 'border-slate-200 bg-white shadow-sm' : 'border-slate-100 bg-slate-50 opacity-60'} p-5 transition-all`}>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              
              {/* Request Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                 
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <ClockIcon className="h-3 w-3" /> {item.dateRequested}
                  </span>
                  {item.status !== 'pending' && (
                    <Badge className={item.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}>
                      {item.status === 'approved' ? 'Approved' : 'Rejected'}
                    </Badge>
                  )}
                </div>
                
                <div>
                  <p className="font-semibold text-slate-900 text-lg">RWF {item.amount.toLocaleString()}</p>
                  <p className="text-sm font-medium text-slate-700 mt-1">Requested by: <span className="text-slate-900">{item.requester}</span></p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <FileTextIcon className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <p className="max-w-[200px]">{item.purpose}</p>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <BuildingIcon className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <p className="max-w-[200px]">{item.hotel}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {item.status === 'pending' && (
                <div className="flex sm:flex-col gap-2 shrink-0 md:w-32">
                  <Button 
                    onClick={() => handleAction(item.id, "approved")}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <CheckIcon className="mr-2 h-4 w-4" /> Approve
                  </Button>
                  <Button 
                    onClick={() => handleAction(item.id, "rejected")}
                    variant="outline" 
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-slate-200"
                  >
                    <XIcon className="mr-2 h-4 w-4" /> Reject
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        {pendingCount === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
            <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
              <CheckIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-slate-900 font-medium">All caught up!</h3>
            <p className="text-slate-500 text-sm mt-1">There are no pending approvals in your queue.</p>
          </div>
        )}
      </div>
    </div>
  )
}
