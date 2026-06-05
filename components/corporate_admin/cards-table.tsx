"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontalIcon,
  CreditCardIcon,
  BanIcon,
  Edit2Icon,
  RefreshCcwIcon,
  Loader2Icon,
} from "lucide-react";

import { getCards, updateCard, type Card } from "@/lib/cardsStore";

export function CardsTable() {
  const router = useRouter();
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCards = async () => {
    setLoading(true);
    try {
      const data = await getCards();
      setCards(data);
    } catch {
      toast.error("Failed to load cards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleSuspend = async (card: Card) => {
    try {
      await updateCard(card.id, { status: "SUSPENDED" });
      toast.success(`Suspended ${card.cardholder}'s card`);
      loadCards();
    } catch {
      toast.error("Failed to suspend card");
    }
  };

  const handleReactivate = async (card: Card) => {
    try {
      await updateCard(card.id, { status: "ACTIVE" });
      toast.success(`Reactivated ${card.cardholder}'s card`);
      loadCards();
    } catch {
      toast.error("Failed to reactivate card");
    }
  };

  const handleCancel = async (card: Card) => {
    try {
      await updateCard(card.id, { status: "CANCELLED" });
      toast.success(`Cancelled ${card.cardholder}'s card`);
      loadCards();
    } catch {
      toast.error("Failed to cancel card");
    }
  };

  const filteredCards = cards.filter((card) => {
    const issueType = card.issueType?.toLowerCase() ?? "virtual";
    if (filterType !== "all" && issueType !== filterType) return false;
    if (filterStatus !== "all" && card.status.toLowerCase() !== filterStatus)
      return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Issue Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="per diem">Per diem</SelectItem>
            <SelectItem value="corporate expense">Corporate expense</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Card Info</th>
                <th className="px-6 py-4">Issue type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Spend Limit</th>
                <th className="px-6 py-4">Last Used</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    <Loader2Icon className="mx-auto h-5 w-5 animate-spin" />
                  </td>
                </tr>
              ) : (
                filteredCards.map((card) => (
                  <tr
                    key={card.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() =>
                      router.push(`/corporate_admin/cards/${card.id}`)
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          <CreditCardIcon className="size-5" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {card.employees?.[0]?.name}
                          </p>
                          <p className="font-mono text-xs text-slate-500">
                            **** **** **** {card.last4}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant="outline"
                        className={
                          card.issueType === "Per diem"
                            ? "bg-sky-50 text-sky-700 border-sky-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }
                      >
                        {card.issueType}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        className={
                          card.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none"
                            : card.status === "Suspended"
                              ? "bg-orange-100 text-orange-800 hover:bg-orange-200 border-none"
                              : "bg-red-100 text-red-800 hover:bg-red-200 border-none"
                        }
                      >
                        {card.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-700 font-medium">
                      {card.limit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                      {card.lastUsed || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.success(
                                `Update limits clicked for ${card.cardholder}'s card`,
                              );
                            }}
                          >
                            <Edit2Icon className="mr-2 h-4 w-4" /> Update limits
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/corporate_admin/cards/${card.id}`);
                            }}
                          >
                            <RefreshCcwIcon className="mr-2 h-4 w-4" /> View
                            transactions
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {card.status === "Active" ? (
                            <DropdownMenuItem
                              className="cursor-pointer text-orange-600 focus:bg-orange-50 focus:text-orange-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSuspend(card);
                              }}
                            >
                              <BanIcon className="mr-2 h-4 w-4" /> Suspend card
                            </DropdownMenuItem>
                          ) : card.status === "Suspended" ? (
                            <DropdownMenuItem
                              className="cursor-pointer text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReactivate(card);
                              }}
                            >
                              <RefreshCcwIcon className="mr-2 h-4 w-4" />{" "}
                              Reactivate card
                            </DropdownMenuItem>
                          ) : null}
                          {card.status !== "Cancelled" && (
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCancel(card);
                              }}
                            >
                              <BanIcon className="mr-2 h-4 w-4" /> Cancel card
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
              {!loading && filteredCards.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No cards found matching your criteria.
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
