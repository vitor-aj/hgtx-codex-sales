import { KPICard } from "@/components/KPICard";
import { mockKPIs, mockObjections } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, TrendingUp, Users, Zap } from "lucide-react";
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
  { stage: "Qualificação", cold: 45, warm: 28, hot: 12 },
  { stage: "Descoberta", cold: 22, warm: 35, hot: 18 },
  { stage: "Apresentação", cold: 8, warm: 28, hot: 24 },
  { stage: "Proposta", cold: 3, warm: 15, hot: 32 },
  { stage: "Negociação", cold: 1, warm: 8, hot: 28 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Executivo</h1>
        <p className="text-muted-foreground">Visão consolidada dos principais indicadores</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {mockKPIs.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Evolução da Taxa de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
                <Line
                  type="monotone"
                  dataKey="meta"
                  stroke="hsl(var(--status-success))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Meta %"
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
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funnelByTempData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="stage" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Legend />
              <Bar dataKey="cold" stackId="a" fill="hsl(var(--temp-cold))" name="Frio" />
              <Bar dataKey="warm" stackId="a" fill="hsl(var(--temp-warm))" name="Morno" />
              <Bar dataKey="hot" stackId="a" fill="hsl(var(--temp-hot))" name="Quente" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Alertas Inteligentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg border border-status-warning/20 bg-status-warning/5 p-4">
            <AlertCircle className="h-5 w-5 text-status-warning" />
            <div className="flex-1">
              <h4 className="font-semibold">5 leads quentes sem follow-up há 24h</h4>
              <p className="text-sm text-muted-foreground">
                Leads com alta probabilidade de conversão precisam de atenção imediata
              </p>
            </div>
            <Badge variant="outline" className="text-status-warning border-status-warning">
              Urgente
            </Badge>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-status-danger/20 bg-status-danger/5 p-4">
            <AlertCircle className="h-5 w-5 text-status-danger" />
            <div className="flex-1">
              <h4 className="font-semibold">Queda de aderência: Pedro M.</h4>
              <p className="text-sm text-muted-foreground">
                Aderência caiu de 82% para 69% nos últimos 7 dias
              </p>
            </div>
            <Badge variant="outline" className="text-status-danger border-status-danger">
              Crítico
            </Badge>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-status-info/20 bg-status-info/5 p-4">
            <AlertCircle className="h-5 w-5 text-status-info" />
            <div className="flex-1">
              <h4 className="font-semibold">Aumento de objeções de "Timing"</h4>
              <p className="text-sm text-muted-foreground">
                38% das conversas apresentam objeção de timing, +12% vs. semana anterior
              </p>
            </div>
            <Badge variant="outline" className="text-status-info border-status-info">
              Info
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top 5 Objeções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockObjections.map((objection) => (
              <div key={objection.type} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{objection.type}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">{objection.count} menções</span>
                    <span className="font-semibold text-status-success">
                      {objection.resolvedRate}% resolvidas
                    </span>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-status-success transition-all"
                    style={{ width: `${objection.resolvedRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
