import { KPICard } from "@/components/KPICard";
import { mockKPIs } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Zap } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const conversionTrendData = [
  { month: "Set", conversao: 18, meta: 20 },
  { month: "Out", conversao: 21, meta: 22 },
  { month: "Nov", conversao: 23, meta: 23 },
  { month: "Dez", conversao: 26, meta: 24 },
  { month: "Jan", conversao: 28, meta: 25 },
];

const teamPerformanceData = [
  { rep: "Carlos S.", adherence: 87, conversion: 28 },
  { rep: "Ana C.", adherence: 82, conversion: 25 },
  { rep: "Pedro M.", adherence: 76, conversion: 22 },
  { rep: "Julia R.", adherence: 91, conversion: 32 },
  { rep: "Lucas P.", adherence: 69, conversion: 18 },
];

const funnelByTempData = [
  { month: "Set", cold: 145, warm: 98, hot: 52 },
  { month: "Out", cold: 132, warm: 115, hot: 68 },
  { month: "Nov", cold: 128, warm: 128, hot: 84 },
  { month: "Dez", cold: 118, warm: 142, hot: 96 },
  { month: "Jan", cold: 105, warm: 156, hot: 112 },
];

export default function Dashboard() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard Executivo</h1>
        <p className="text-sm md:text-base text-muted-foreground">Visão consolidada dos principais indicadores</p>
      </div>

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
        {mockKPIs.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Evolução da Taxa de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 md:px-6">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={conversionTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="conversao"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Conversão %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Performance por Representante
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 md:px-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={teamPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="rep" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Legend />
                <Bar dataKey="adherence" fill="hsl(var(--chart-1))" name="Aderência %" />
                <Bar dataKey="conversion" fill="hsl(var(--chart-2))" name="Conversão %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Funil por Temperatura
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 md:px-6">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={funnelByTempData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Legend />
              <Bar dataKey="hot" fill="hsl(var(--temp-hot))" name="Quente" radius={[4, 4, 0, 0]} />
              <Bar dataKey="warm" fill="hsl(var(--temp-warm))" name="Morno" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cold" fill="hsl(var(--temp-cold))" name="Frio" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
