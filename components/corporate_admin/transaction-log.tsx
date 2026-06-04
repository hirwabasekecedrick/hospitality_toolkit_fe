"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  SearchIcon,
  FileTextIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import * as XLSX from "xlsx";
import {
  getAllTransactions,
  type CorporateEmployeeTransaction,
} from "@/lib/corporateEmployeeTransactions";

export function TransactionLog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [transactions, setTransactions] = useState<
    CorporateEmployeeTransaction[]
  >([]);
  const [loading, setLoading] = useState(true);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    let mounted = true;
    getAllTransactions()
      .then((res) => {
        if (!mounted) return;
        setTransactions(res);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const filteredTransactions = transactions.filter((t) => {
    const hotel = t.title || "";
    const employee = t.employeeName || "";
    const matchesSearch =
      hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || t.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportToExcel = () => {
    const dataToExport = filteredTransactions.map((tx) => {
      const amount = tx.amount;
      const taxes = Math.round(amount * 0.18);
      const subtotal = amount - taxes;
      return {
        "Transaction ID": tx.id,
        Date: new Date(tx.datetime).toISOString().split("T")[0],
        Hotel: tx.title,
        Employee: tx.employeeName,
        "Amount (RWF)": amount,
        "VAT (RWF)": taxes,
        "Subtotal (RWF)": subtotal,
        Status: tx.status,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "Corporate_Transactions.xlsx");
  };

  return (
    <div className="space-y-4">
      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by hotel or employee..."
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
        <Button
          onClick={exportToExcel}
          variant="outline"
          className="bg-white border-slate-300 text-slate-700"
        >
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
                  <tr
                    className={`hover:bg-slate-50 transition-colors cursor-pointer ${expandedRows[tx.id] ? "bg-slate-50" : ""}`}
                    onClick={() => toggleRow(tx.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                      {expandedRows[tx.id] ? (
                        <ChevronUpIcon className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                      {new Date(tx.datetime).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">
                      {tx.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                      {tx.employeeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-900">
                      RWF {tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        className={
                          tx.status === "Settled"
                            ? "bg-emerald-100 text-emerald-800 border-none"
                            : tx.status === "Pending"
                              ? "bg-orange-100 text-orange-800 border-none"
                              : "bg-red-100 text-red-800 border-none"
                        }
                      >
                        {tx.status}
                      </Badge>
                    </td>
                  </tr>
                  {/* Expanded Receipt Detail */}
                  {expandedRows[tx.id] && (
                    <tr className="bg-slate-50 border-t-0">
                      <td colSpan={6} className="px-14 py-6">
                        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                          <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                            <FileTextIcon className="h-4 w-4 text-blue-600" />
                            Transaction Details
                          </h4>
                          <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
                            <span className="text-slate-500">
                              Transaction ID:
                            </span>
                            <span className="font-medium">{tx.id}</span>
                            <span className="text-slate-500">Reference:</span>
                            <span className="font-medium">{tx.reference}</span>
                            <span className="text-slate-500">Date/Time:</span>
                            <span className="font-medium">{tx.datetime}</span>
                            <span className="text-slate-500">Employee:</span>
                            <span className="font-medium">
                              {tx.employeeName}
                            </span>
                            <span className="text-slate-500">Amount:</span>
                            <span className="font-medium">
                              RWF {tx.amount.toLocaleString()}
                            </span>
                            <span className="text-slate-500">
                              VAT (est. 18%):
                            </span>
                            <span className="font-medium">
                              RWF{" "}
                              {Math.round(tx.amount * 0.18).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500"
                  >
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
  );
}
