import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeftIcon, BanIcon, CreditCardIcon, Edit2Icon, RefreshCcwIcon, ArrowUpRightIcon, ArrowDownRightIcon } from "lucide-react"
import Link from "next/link"

export default function CardDetailsPage({ params }: { params: { id: string } }) {
  // Mock data for the specific card based on ID
  const cardData = {
    id: params.id,
    type: "Virtual",
    cardholder: "Marketing Dept",
    last4: "8765",
    status: "Active",
    limit: 2000000,
    spent: 1250000,
    currency: "RWF",
  }

  const available = cardData.limit - cardData.spent;
  const progressPercent = (cardData.spent / cardData.limit) * 100;

  // Mock transactions
  const transactions = [
    { id: 1, merchant: "Marriot Hotel Kigali", date: "Today, 10:30 AM", amount: "150,000", type: "debit" },
    { id: 2, merchant: "Fatima Hotel", date: "Yesterday, 2:15 PM", amount: "300,000", type: "debit" },
    { id: 3, merchant: "Amikus", date: "3 days ago", amount: "25,000", type: "debit" },
  ]

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
      {/* Back navigation & Page Header */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Card Details</h1>
          <p className="text-sm text-slate-500">Manage limits and settings for {cardData.cardholder}&apos;s card</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_350px]">
        <div className="flex flex-col gap-6">
          {/* Main Card Overview */}
          <Card className="overflow-hidden border-slate-200 shadow-sm p-0">
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <Badge variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30 mb-4 backdrop-blur-sm">
                    {cardData.status} • {cardData.type}
                  </Badge>
                  <h2 className="text-2xl font-semibold">{cardData.cardholder}</h2>
                  <div className="mt-2 flex items-center gap-2 font-mono text-emerald-100">
                    <span>****</span>
                    <span>****</span>
                    <span>****</span>
                    <span className="text-white">{cardData.last4}</span>
                  </div>
                </div>
                <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/20">
                  <CreditCardIcon className="h-6 w-6 text-white" />
                </div>
              </div>

              <div className="mt-8 relative z-10">
                <div className="flex justify-between text-sm mb-2 text-emerald-50">
                  <span>Spend limit: {cardData.currency} {cardData.limit.toLocaleString()}</span>
                  <span>{Math.round(progressPercent)}% used</span>
                </div>
                <Progress 
                  value={progressPercent} 
                  className="h-2.5 bg-white/20 [&>[data-slot=progress-indicator]]:bg-white" 
                />
                <div className="flex justify-between text-sm mt-3 font-medium">
                  <div className="flex flex-col">
                    <span className="text-emerald-200 text-xs uppercase tracking-wider">Spent</span>
                    <span className="text-lg">{cardData.currency} {cardData.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-emerald-200 text-xs uppercase tracking-wider">Available</span>
                    <span className="text-lg">{cardData.currency} {available.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Transactions */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-slate-900">Recent Transactions</CardTitle>
                <Button variant="outline" size="sm" className="text-xs">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${tx.type === 'debit' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {tx.type === 'debit' ? <ArrowUpRightIcon className="h-4 w-4" /> : <ArrowDownRightIcon className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-slate-900">{tx.merchant}</p>
                        <p className="text-xs text-slate-500">{tx.date}</p>
                      </div>
                    </div>
                    <div className={`font-semibold text-sm ${tx.type === 'debit' ? 'text-slate-900' : 'text-emerald-600'}`}>
                      {tx.type === 'debit' ? '-' : '+'}{cardData.currency} {tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Sidebar */}
        <div className="flex flex-col gap-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-900">Card Controls</CardTitle>
              <CardDescription>Manage this card&apos;s settings</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button variant="outline" className="w-full justify-start gap-3 h-11 bg-white hover:bg-slate-50 transition-colors text-slate-700">
                <Edit2Icon className="h-4 w-4 text-slate-500" />
                Adjust Spend Limits
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-11 bg-white hover:bg-slate-50 transition-colors text-orange-700 hover:text-orange-800 border-orange-200 hover:border-orange-300">
                <BanIcon className="h-4 w-4 text-orange-500" />
                Suspend Card
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-11 bg-white hover:bg-slate-50 transition-colors text-slate-700">
                <RefreshCcwIcon className="h-4 w-4 text-slate-500" />
                Replace Card
              </Button>
              <div className="pt-4 mt-2 border-t border-slate-100">
                <Button variant="outline" className="w-full justify-start gap-3 h-11 bg-red-50 hover:bg-red-100 transition-colors text-red-700 border-red-200 hover:border-red-300">
                  <BanIcon className="h-4 w-4 text-red-600" />
                  Cancel Card
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm bg-slate-50">
            <CardContent className="p-6">
              <h3 className="font-medium text-slate-900 text-sm mb-2">Need help?</h3>
              <p className="text-xs text-slate-500 mb-4">Contact support to resolve issues with this card or dispute a transaction.</p>
              <Button variant="default" className="w-full text-xs">Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
