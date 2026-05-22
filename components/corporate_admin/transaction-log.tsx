"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DownloadIcon, SearchIcon, FileTextIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import * as XLSX from "xlsx"

const MOCK_TRANSACTIONS = [
  { id: "TX-99821", date: "2026-05-21", hotel: "Kigali Serena Hotel", employee: "Jane Doe", amount: 150000, status: "Settled", category: "Room", receipt: { room: 120000, food: 30000, taxes: 27000 } },
  { id: "TX-99822", date: "2026-05-20", hotel: "Ubumwe Grande", employee: "John Smith", amount: 45000, status: "Pending", category: "F&B", receipt: { room: 0, food: 45000, taxes: 8100 } },
  { id: "TX-99823", date: "2026-05-18", hotel: "Mantis Epic Hotel", employee: "Marketing Dept", amount: 850000, status: "Settled", category: "Meetings", receipt: { room: 500000, food: 350000, taxes: 153000 } },
  { id: "TX-99824", date: "2026-05-15", hotel: "Marriott Kigali", employee: "Jane Doe", amount: 320000, status: "Disputed", category: "Room", receipt: { room: 280000, food: 40000, taxes: 57600 } },
  { id: "TX-99825", date: "2026-05-10", hotel: "Onomo Hotel", employee: "Michael Johnson", amount: 12000, status: "Settled", category: "Other", receipt: { room: 0, food: 0, taxes: 2160 } },
]

export function TransactionLog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredTransactions = MOCK_TRANSACTIONS.filter(tx => {
    const matchesSearch = tx.hotel.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || tx.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  })

  const exportToExcel = () => {
    const dataToExport = filteredTransactions.map(tx => ({
      "Transaction ID": tx.id,
      "Date": tx.date,
      "Hotel": tx.hotel,
      "Employee": tx.employee,
      "Category": tx.category,
      "Status": tx.status,
      "Amount (RWF)": tx.amount,
      "VAT (RWF)": tx.receipt.taxes
    }))
    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions")
    XLSX.writeFile(workbook, "Corporate_Transactions.xlsx")
  }

  return (
    <div className="space-y-4">
      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by hotel, employee, or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="settled">Settled</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="disputed">Disputed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={exportToExcel} variant="outline" className="bg-white border-slate-300 text-slate-700">
          <DownloadIcon className="mr-2 h-4 w-4" /> Export CSV/Excel
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 w-10"></th>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Hotel Property</th>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTransactions.map((tx) => (
                <React.Fragment key={tx.id}>
                  <tr className={`hover:bg-slate-50 transition-colors cursor-pointer ${expandedRows[tx.id] ? 'bg-slate-50' : ''}`} onClick={() => toggleRow(tx.id)}>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                      {expandedRows[tx.id] ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-slate-600">
                      {tx.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                      {tx.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">
                      {tx.hotel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                      {tx.employee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-900">
                      RWF {tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        className={
                          tx.status === "Settled" ? "bg-emerald-100 text-emerald-800 border-none" : 
                          tx.status === "Pending" ? "bg-orange-100 text-orange-800 border-none" : 
                          "bg-red-100 text-red-800 border-none"
                        }
                      >
                        {tx.status}
                      </Badge>
                    </td>
                  </tr>
                  {/* Expanded Receipt Detail */}
                  {expandedRows[tx.id] && (
                    <tr className="bg-slate-50 border-t-0">
                      <td colSpan={7} className="px-14 py-6">
                        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm flex flex-col md:flex-row gap-8">
                          <div className="flex-1 space-y-4">
                            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                              <FileTextIcon className="h-4 w-4 text-blue-600" />
                              Digital Receipt
                            </h4>
                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                              <span className="text-slate-500">Category:</span>
                              <span className="font-medium">{tx.category}</span>
                              <span className="text-slate-500">Room Charges:</span>
                              <span className="font-medium text-slate-700">RWF {tx.receipt.room.toLocaleString()}</span>
                              <span className="text-slate-500">Food & Beverage:</span>
                              <span className="font-medium text-slate-700">RWF {tx.receipt.food.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex-1 space-y-4 md:border-l md:border-slate-100 md:pl-8">
                            <h4 className="font-semibold text-slate-900">Tax Breakdown (EBM Compliant)</h4>
                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                              <span className="text-slate-500">Subtotal:</span>
                              <span className="font-medium text-slate-700">RWF {(tx.amount - tx.receipt.taxes).toLocaleString()}</span>
                              <span className="text-slate-500">VAT (18%):</span>
                              <span className="font-medium text-slate-700">RWF {tx.receipt.taxes.toLocaleString()}</span>
                            </div>
                            <div className="pt-2 border-t border-slate-100 flex justify-between font-semibold text-slate-900">
                              <span>Total Paid:</span>
                              <span>RWF {tx.amount.toLocaleString()}</span>
                            </div>
                            <div className="pt-2 flex justify-end gap-2">
                              <Button size="sm" variant="outline" className="text-xs h-8 bg-emerald-700 text-white hover:bg-emerald-200">Download PDF</Button>
                              {/* <Button size="sm" variant="secondary" className="text-xs h-8 text-red-600 bg-red-50 hover:bg-red-100 border-none">Flag Dispute</Button> */}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <SearchIcon className="mx-auto h-8 w-8 text-slate-300 mb-3" />
                    <p>No transactions found matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
