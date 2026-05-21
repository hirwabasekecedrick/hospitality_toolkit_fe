"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DownloadIcon, BarChart3Icon, FileSpreadsheetIcon, PieChartIcon } from "lucide-react"
import * as XLSX from "xlsx"

const MOCK_SPEND_DATA = [
  { category: "Room Charges", amount: 4500000, percentage: 55 },
  { category: "Food & Beverage", amount: 2000000, percentage: 24 },
  { category: "Meeting Rooms", amount: 1200000, percentage: 15 },
  { category: "Other Services", amount: 500000, percentage: 6 },
]

const MOCK_HOTEL_DATA = [
  { hotel: "Kigali Marriott Hotel", spend: 3200000, transactions: 14 },
  { hotel: "Radisson Blu", spend: 2800000, transactions: 9 },
  { hotel: "Kigali Serena Hotel", spend: 1500000, transactions: 6 },
  { hotel: "Ubumwe Grande", spend: 700000, transactions: 3 },
]

export function ReportsDashboard() {
  const [dateRange, setDateRange] = useState("mtd")

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new()
    
    // Category Spend Sheet
    const wsCategory = XLSX.utils.json_to_sheet(MOCK_SPEND_DATA.map(item => ({
      Category: item.category,
      "Amount (RWF)": item.amount,
      "Percentage (%)": item.percentage
    })))
    XLSX.utils.book_append_sheet(wb, wsCategory, "Spend by Category")
    
    // Hotel Spend Sheet
    const wsHotel = XLSX.utils.json_to_sheet(MOCK_HOTEL_DATA.map(item => ({
      "Hotel Property": item.hotel,
      "Total Spend (RWF)": item.spend,
      "Transaction Count": item.transactions
    })))
    XLSX.utils.book_append_sheet(wb, wsHotel, "Spend by Hotel")

    XLSX.writeFile(wb, `Corporate_Spend_Report_${dateRange}.xlsx`)
  }

  const maxCategorySpend = Math.max(...MOCK_SPEND_DATA.map(d => d.amount))
  const maxHotelSpend = Math.max(...MOCK_HOTEL_DATA.map(d => d.spend))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mtd">Month to Date</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="q1">Q1 2026</SelectItem>
              <SelectItem value="q2">Q2 2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={handleExportExcel} className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto">
            <FileSpreadsheetIcon className="mr-2 h-4 w-4" /> Export Excel
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <DownloadIcon className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Spend by Category Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <PieChartIcon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Spend by Category</h3>
          </div>
          <div className="space-y-6">
            {MOCK_SPEND_DATA.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="font-medium text-slate-700">{item.category}</span>
                  <div className="text-right">
                    <span className="font-semibold text-slate-900">RWF {item.amount.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 ml-2">({item.percentage}%)</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${(item.amount / maxCategorySpend) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spend by Hotel Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <BarChart3Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Top Hotel Destinations</h3>
          </div>
          <div className="space-y-6">
            {MOCK_HOTEL_DATA.map((item) => (
              <div key={item.hotel} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="font-medium text-slate-700">{item.hotel}</span>
                  <div className="text-right">
                    <span className="font-semibold text-slate-900">RWF {item.spend.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 ml-2">{item.transactions} txns</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-600 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${(item.spend / maxHotelSpend) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
