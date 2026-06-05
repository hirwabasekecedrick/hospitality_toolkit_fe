import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type ExpenseCardProps = {
  status?: string;
  cardholder?: string;
  last4?: string;
  validFrom?: string;
  validUntil?: string;
  limit?: number;
  spent?: number;
  available?: number;
};

export function CardTemplate({
  status,
  cardholder,
  last4,
  validFrom,
  validUntil,
  limit,
  spent,
  available,
}: ExpenseCardProps) {
  const progressPercent = limit && spent ? (spent / limit) * 100 : 0;

  const formatDate = (date?: string) => {
    if (!date) return null;

    return `${new Date(date).getDate().toString().padStart(2, "0")}/${new Date(
      date,
    ).toLocaleString("en-GB", {
      month: "short",
    })}`;
  };

  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm p-0">
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            {status && (
              <Badge
                variant="outline"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 mb-3"
              >
                {status}
              </Badge>
            )}

            {cardholder && (
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                {cardholder}
              </h2>
            )}

            {last4 && (
              <div className="mt-2 flex items-center gap-2 font-mono text-xs sm:text-sm text-emerald-100">
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <span className="text-white">{last4}</span>
              </div>
            )}
          </div>

          {(validFrom || validUntil) && (
            <div className="flex h-10 w-auto sm:h-12 p-4 items-center justify-center rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 flex-shrink-0">
              {formatDate(validFrom)} - {formatDate(validUntil)}
            </div>
          )}
        </div>

        {(limit !== undefined ||
          spent !== undefined ||
          available !== undefined) && (
          <div className="mt-6 sm:mt-8 relative z-10">
            <div className="flex justify-between text-xs sm:text-sm mb-2 text-emerald-50">
              {limit !== undefined && (
                <span>Limit: {limit.toLocaleString()}</span>
              )}

              {spent !== undefined && limit !== undefined && (
                <span>{Math.round(progressPercent)}% used</span>
              )}
            </div>

            <Progress
              value={progressPercent}
              className="h-2 sm:h-2.5 bg-white/20 [&>[data-slot=progress-indicator]]:bg-white"
            />

            <div className="flex justify-between text-xs sm:text-sm mt-3 font-medium">
              {spent !== undefined && (
                <div className="flex flex-col">
                  <span className="text-emerald-200 text-xs uppercase tracking-wider">
                    Spent
                  </span>
                  <span className="text-base sm:text-lg">
                    RWF {spent.toLocaleString()}
                  </span>
                </div>
              )}

              {available !== undefined && (
                <div className="flex flex-col text-right">
                  <span className="text-emerald-200 text-xs uppercase tracking-wider">
                    Available
                  </span>
                  <span className="text-base sm:text-lg">
                    RWF {available.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
