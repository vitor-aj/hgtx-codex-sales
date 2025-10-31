import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KPICardProps {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "stable";
}

export function KPICard({ label, value, change, trend }: KPICardProps) {
  const isPositive = trend === "up";
  const isNegative = trend === "down";

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-bold">{value}</span>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? "text-status-success" : isNegative ? "text-status-danger" : "text-muted-foreground"
          }`}>
            {trend === "up" && <TrendingUp className="h-4 w-4" />}
            {trend === "down" && <TrendingDown className="h-4 w-4" />}
            {trend === "stable" && <Minus className="h-4 w-4" />}
            <span>{Math.abs(change)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
