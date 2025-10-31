import { useState } from "react";
import { mockLeads, Lead } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, MessageSquare, Calendar, TrendingUp, CheckCircle } from "lucide-react";

export default function Temperatura() {
  const [view, setView] = useState<"kanban" | "list">("kanban");

  const leadsByTemp = {
    hot: mockLeads.filter((l) => l.temperature === "hot"),
    warm: mockLeads.filter((l) => l.temperature === "warm"),
    cold: mockLeads.filter((l) => l.temperature === "cold"),
  };

  const getTempColor = (temp: string) => {
    if (temp === "hot") return "border-temp-hot bg-temp-hot/5";
    if (temp === "warm") return "border-temp-warm bg-temp-warm/5";
    return "border-temp-cold bg-temp-cold/5";
  };

  const getTempBadge = (temp: string) => {
    if (temp === "hot") return "bg-temp-hot/10 text-temp-hot border-temp-hot/20";
    if (temp === "warm") return "bg-temp-warm/10 text-temp-warm border-temp-warm/20";
    return "bg-temp-cold/10 text-temp-cold border-temp-cold/20";
  };

  const LeadCard = ({ lead }: { lead: Lead }) => (
    <Card className={`border-l-4 ${getTempColor(lead.temperature)}`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold">{lead.name}</h4>
              <p className="text-sm text-muted-foreground">{lead.contact}</p>
            </div>
            <div className="flex items-center gap-2">
              {lead.channel === "whatsapp" ? (
                <MessageSquare className="h-4 w-4 text-status-success" />
              ) : (
                <Phone className="h-4 w-4 text-primary" />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">ICP Fit</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${lead.icpFitScore}%` }}
                  />
                </div>
                <span className="font-semibold">{lead.icpFitScore}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Valor Potencial</span>
              <span className="font-semibold">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                  lead.potentialValue
                )}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Etapa</span>
              <Badge variant="outline">{lead.funnelStage}</Badge>
            </div>
          </div>

          <div className="rounded-lg bg-accent/50 p-3">
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-primary">
              <TrendingUp className="h-3 w-3" />
              Sinais de Intenção
            </div>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {lead.temperature === "hot" && (
                <>
                  <li>• Interação recente (menos de 24h)</li>
                  <li>• Alta aderência ao ICP</li>
                  <li>• Solicitou proposta</li>
                </>
              )}
              {lead.temperature === "warm" && (
                <>
                  <li>• Boa aderência ao ICP</li>
                  <li>• Demonstrou interesse</li>
                  <li>• Aguardando follow-up</li>
                </>
              )}
              {lead.temperature === "cold" && (
                <>
                  <li>• Aderência moderada ao ICP</li>
                  <li>• Sem urgência aparente</li>
                  <li>• Necessita nurturing</li>
                </>
              )}
            </ul>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <CheckCircle className="h-3 w-3 text-primary" />
              Próximo Passo
            </div>
            <p className="text-sm">{lead.nextStep}</p>
          </div>

          <div className="flex gap-2">
            <Button size="sm" className="flex-1">
              Executar
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Ver Detalhes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Classificação de Temperatura</h1>
          <p className="text-muted-foreground">Leads priorizados por probabilidade de conversão</p>
        </div>
        <Tabs value={view} onValueChange={(v) => setView(v as "kanban" | "list")}>
          <TabsList>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="list">Lista</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {view === "kanban" ? (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <div className="h-3 w-3 rounded-full bg-temp-hot" />
                Quente
              </h3>
              <Badge variant="outline" className={getTempBadge("hot")}>
                {leadsByTemp.hot.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {leadsByTemp.hot.map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <div className="h-3 w-3 rounded-full bg-temp-warm" />
                Morno
              </h3>
              <Badge variant="outline" className={getTempBadge("warm")}>
                {leadsByTemp.warm.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {leadsByTemp.warm.map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <div className="h-3 w-3 rounded-full bg-temp-cold" />
                Frio
              </h3>
              <Badge variant="outline" className={getTempBadge("cold")}>
                {leadsByTemp.cold.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {leadsByTemp.cold.map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-3">
              {mockLeads
                .sort((a, b) => {
                  const tempOrder = { hot: 0, warm: 1, cold: 2 };
                  return tempOrder[a.temperature] - tempOrder[b.temperature];
                })
                .map((lead) => (
                  <div
                    key={lead.id}
                    className={`flex items-center justify-between rounded-lg border-l-4 p-4 ${getTempColor(
                      lead.temperature
                    )}`}
                  >
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className={getTempBadge(lead.temperature)}>
                        {lead.temperature === "hot" ? "Quente" : lead.temperature === "warm" ? "Morno" : "Frio"}
                      </Badge>
                      <div>
                        <h4 className="font-semibold">{lead.name}</h4>
                        <p className="text-sm text-muted-foreground">{lead.funnelStage}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">ICP Fit</div>
                        <div className="font-semibold">{lead.icpFitScore}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Valor</div>
                        <div className="font-semibold">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            minimumFractionDigits: 0,
                          }).format(lead.potentialValue)}
                        </div>
                      </div>
                      <Button size="sm">Ver Detalhes</Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
