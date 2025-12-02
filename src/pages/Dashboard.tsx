import { KPICard } from "@/components/KPICard";
import { mockKPIs } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Zap, Clock } from "lucide-react";
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

const funnelByTempData = [
  { month: "Set", cold: 145, warm: 98, hot: 52 },
  { month: "Out", cold: 132, warm: 115, hot: 68 },
  { month: "Nov", cold: 128, warm: 128, hot: 84 },
  { month: "Dez", cold: 118, warm: 142, hot: 96 },
  { month: "Jan", cold: 105, warm: 156, hot: 112 },
];

const performanceByRepData = [
  { name: "Carlos", tempoAtendimento: 6.5, conversoes: 24 },
  { name: "Ana", tempoAtendimento: 8.2, conversoes: 18 },
  { name: "Pedro", tempoAtendimento: 7.1, conversoes: 21 },
  { name: "Maria", tempoAtendimento: 5.8, conversoes: 28 },
  { name: "João", tempoAtendimento: 9.3, conversoes: 15 },
  { name: "Lucia", tempoAtendimento: 7.8, conversoes: 19 },
];

export default function Dashboard() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard Executivo</h1>
        <p className="text-sm md:text-base text-muted-foreground">Visão consolidada dos principais indicadores</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
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
              <Clock className="h-5 w-5 text-primary" />
              Performance por Representante
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 md:px-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={performanceByRepData} barGap={4}>
                <defs>
                  <linearGradient id="tempoGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={1} />
                    <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="conversoesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                  formatter={(value, name) => {
                    if (name === "Tempo (min)") return [`${value} min`, name];
                    return [value, name];
                  }}
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: 16 }}
                  iconType="circle"
                />
                <Bar 
                  dataKey="conversoes" 
                  fill="url(#conversoesGradient)" 
                  name="Conversões" 
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
                <Bar 
                  dataKey="tempoAtendimento" 
                  fill="url(#tempoGradient)" 
                  name="Tempo (min)" 
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
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
