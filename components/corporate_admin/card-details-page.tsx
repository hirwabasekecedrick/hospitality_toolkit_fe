"use client";

import { useMemo, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  BanIcon,
  CreditCardIcon,
  Edit2Icon,
  RefreshCcwIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  SearchIcon,
  Loader2Icon,
} from "lucide-react";
import { getCardById } from "@/lib/cardsStore";
import {
  getAllTransactions,
  type CorporateEmployeeTransaction,
} from "@/lib/corporateEmployeeTransactions";

export function CardDetailsPageClient({ cardId }: { cardId: string }) {
  const [cardData, setCardData] = useState<any>(null);
  const [transactions, setTransactions] = useState<CorporateEmployeeTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"amount_desc" | "amount_asc">(
    "amount_desc",
  );

  // Call useMemo before any early returns to maintain hook order
  const filteredTransactions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return transactions
      .filter((tx) => {
        if (!query) {
          return true;
        }

        return (
          tx.title.toLowerCase().includes(query) ||
          (tx.hotelName || "").toLowerCase().includes(query) ||
          (tx.employeeName || "").toLowerCase().includes(query) ||
          tx.amount.toLocaleString().toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (sortOrder === "amount_asc") {
          return a.amount - b.amount;
        }
        return b.amount - a.amount;
      });
  }, [searchTerm, sortOrder, transactions]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const card = await getCardById(cardId);
        setCardData(card);
        const txs = await getAllTransactions();
        const cardTxs = txs.filter((tx) => tx.card?.id === cardId);
        setTransactions(cardTxs);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [cardId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2Icon className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
        Card not found
      </div>
    );
  }

  const available = (cardData.amount || 0) - (cardData.spent || 0);
  const limit = cardData.limit || cardData.amount || 0;
  const spent = cardData.spent || 0;
  const progressPercent = limit > 0 ? (spent / limit) * 100 : 0;

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-3 sm:p-4 lg:p-8 w-full">
      <div className="flex flex-col gap-2 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
            Card Details
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage limits and settings for this card
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_350px]">
        <div className="flex flex-col gap-4 sm:gap-6">
          <Card className="overflow-hidden border-slate-200 shadow-sm p-0">
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div className="flex-1">
                  <Badge
                    variant="outline"
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30 mb-3 backdrop-blur-sm text-xs sm:text-sm"
                  >
                    {cardData.status || "Active"}
                  </Badge>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold break-words">
                    {cardData.cardholder}
                  </h2>
                  <div className="mt-2 flex items-center gap-2 font-mono text-xs sm:text-sm text-emerald-100">
                    <span>****</span>
                    <span>****</span>
                    <span>****</span>
                    <span className="text-white">{cardData.last4}</span>
                  </div>
                </div>
                <div className="flex h-10 w-14 sm:h-12 sm:w-16 items-center justify-center rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 flex-shrink-0">
                  <CreditCardIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>

              <div className="mt-6 sm:mt-8 relative z-10">
                <div className="flex justify-between text-xs sm:text-sm mb-2 text-emerald-50">
                  <span>Limit: RWF {limit.toLocaleString()}</span>
                  <span>{Math.round(progressPercent)}% used</span>
                </div>
                <Progress
                  value={progressPercent}
                  className="h-2 sm:h-2.5 bg-white/20 [&>[data-slot=progress-indicator]]:bg-white"
                />
                <div className="flex justify-between text-xs sm:text-sm mt-3 font-medium">
                  <div className="flex flex-col">
                    <span className="text-emerald-200 text-xs uppercase tracking-wider">
                      Spent
                    </span>
                    <span className="text-base sm:text-lg">
                      RWF {spent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-emerald-200 text-xs uppercase tracking-wider">
                      Available
                    </span>
                    <span className="text-base sm:text-lg">
                      RWF {available.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <CardTitle className="text-base sm:text-lg font-semibold text-slate-900">
                    Recent Transactions
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Search and sort this card&apos;s transactions.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:gap-3 mb-4">
                <div className="flex flex-col sm:flex-row sm:gap-2 items-stretch sm:items-center gap-2">
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 flex-1 min-w-0">
                    <SearchIcon className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-0 bg-transparent px-0 py-0 focus:ring-0 text-xs sm:text-sm"
                    />
                  </div>
                  <select
                    value={sortOrder}
                    onChange={(e) =>
                      setSortOrder(
                        e.target.value as "amount_desc" | "amount_asc",
                      )
                    }
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-700 outline-none"
                  >
                    <option value="amount_desc">High to low</option>
                    <option value="amount_asc">Low to high</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 sm:pb-4 last:border-0 last:pb-0 gap-2 sm:gap-3"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 flex-shrink-0">
                          <ArrowUpRightIcon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-xs sm:text-sm text-slate-900 truncate">
                            {tx.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {tx.hotelName && tx.employeeName
                              ? `${tx.hotelName} • ${tx.employeeName}`
                              : tx.hotelName || tx.employeeName || tx.reference}
                          </p>
                        </div>
                      </div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-900 flex-shrink-0">
                        RWF {tx.amount.toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-xs sm:text-sm text-slate-500">
                    No transactions found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">
                Card Controls
              </CardTitle>
              <CardDescription className="text-xs">
                Manage card settings
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 h-9 sm:h-11 bg-white hover:bg-slate-50 transition-colors text-slate-700 text-xs sm:text-sm"
              >
                <Edit2Icon className="h-4 w-4 text-slate-500 flex-shrink-0" />
                <span className="truncate">Adjust Limits</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 h-9 sm:h-11 bg-white hover:bg-slate-50 transition-colors text-orange-700 hover:text-orange-800 border-orange-200 hover:border-orange-300 text-xs sm:text-sm"
              >
                <BanIcon className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="truncate">Suspend Card</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 h-9 sm:h-11 bg-white hover:bg-slate-50 transition-colors text-slate-700 text-xs sm:text-sm"
              >
                <RefreshCcwIcon className="h-4 w-4 text-slate-500 flex-shrink-0" />
                <span className="truncate">Replace Card</span>
              </Button>
              <div className="pt-2 sm:pt-3 mt-2 border-t border-slate-100">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 h-9 sm:h-11 bg-red-50 hover:bg-red-100 transition-colors text-red-700 border-red-200 hover:border-red-300 text-xs sm:text-sm"
                >
                  <BanIcon className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <span className="truncate">Cancel Card</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm bg-slate-50">
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-medium text-slate-900 text-xs sm:text-sm mb-2">
                Need help?
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Contact support for card issues.
              </p>
              <Button
                variant="default"
                className="w-full text-xs sm:text-sm h-9 sm:h-10"
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
