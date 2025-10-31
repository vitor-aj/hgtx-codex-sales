import { useState } from "react";
import { mockLeads, Lead, Temperature } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, MessageSquare, Calendar, TrendingUp, CheckCircle, Flame, Snowflake, ThermometerSun } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Temperatura() {
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const leadsByTemp = {
    hot: leads.filter((l) => l.temperature === "hot"),
    warm: leads.filter((l) => l.temperature === "warm"),
    cold: leads.filter((l) => l.temperature === "cold"),
  };

  const getTempColor = (temp: string) => {
    if (temp === "hot") return "border-temp-hot/50";
    if (temp === "warm") return "border-temp-warm/50";
    return "border-temp-cold/50";
  };

  const getTempBadge = (temp: string) => {
    if (temp === "hot") return "bg-temp-hot/20 text-temp-hot border-temp-hot/30";
    if (temp === "warm") return "bg-temp-warm/20 text-temp-warm border-temp-warm/30";
    return "bg-temp-cold/20 text-temp-cold border-temp-cold/30";
  };

  const getTempGradient = (temp: string) => {
    if (temp === "hot") return "from-temp-hot/10 to-transparent";
    if (temp === "warm") return "from-temp-warm/10 to-transparent";
    return "from-temp-cold/10 to-transparent";
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Check if dropped on a temperature column
    const overColumn = over.id as string;
    if (["hot", "warm", "cold"].includes(overColumn)) {
      const draggedLead = leads.find((l) => l.id === active.id);
      if (draggedLead && draggedLead.temperature !== overColumn) {
        setLeads(
          leads.map((lead) =>
            lead.id === active.id ? { ...lead, temperature: overColumn as Temperature } : lead
          )
        );
      }
    }
  };

  const SortableLeadCard = ({ lead }: { lead: Lead }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: lead.id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <LeadCard lead={lead} />
      </div>
    );
  };

  const LeadCard = ({ lead }: { lead: Lead }) => (
    <Card
      className={`group relative overflow-hidden border-l-4 ${getTempColor(
        lead.temperature
      )} cursor-grab active:cursor-grabbing bg-card/60 backdrop-blur-sm transition-all hover:border-l-[6px] hover:shadow-lg hover:scale-[1.02]`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${getTempGradient(lead.temperature)} pointer-events-none`} />
      
      <CardContent className="relative p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-1">{lead.name}</h4>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              {lead.channel === "whatsapp" ? (
                <MessageSquare className="h-3.5 w-3.5 text-status-success" />
              ) : (
                <Phone className="h-3.5 w-3.5 text-primary" />
              )}
              {lead.contact}
            </p>
          </div>
          <Badge variant="outline" className={getTempBadge(lead.temperature)}>
            {lead.temperature === "hot" ? "Quente" : lead.temperature === "warm" ? "Morno" : "Frio"}
          </Badge>
        </div>

        {/* Metrics */}
        <div className="grid gap-3">
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
            <span className="text-sm font-medium">ICP Fit</span>
            <div className="flex items-center gap-3">
              <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                  style={{ width: `${lead.icpFitScore}%` }}
                />
              </div>
              <span className="font-bold text-sm min-w-[3ch] text-right">{lead.icpFitScore}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
            <span className="text-sm font-medium">Valor Potencial</span>
            <span className="font-bold text-sm">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                lead.potentialValue
              )}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
            <span className="text-sm font-medium">Etapa</span>
            <Badge variant="outline" className="bg-background/80">
              {lead.funnelStage}
            </Badge>
          </div>
        </div>

        {/* Intent Signals */}
        <div className="glass-effect rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-primary">
            <TrendingUp className="h-3.5 w-3.5" />
            Sinais de Intenção
          </div>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {lead.temperature === "hot" && (
              <>
                <li className="flex items-start gap-1.5">
                  <span className="text-temp-hot mt-0.5">•</span>
                  <span>Interação recente (menos de 24h)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-temp-hot mt-0.5">•</span>
                  <span>Alta aderência ao ICP</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-temp-hot mt-0.5">•</span>
                  <span>Solicitou proposta</span>
                </li>
              </>
            )}
            {lead.temperature === "warm" && (
              <>
                <li className="flex items-start gap-1.5">
                  <span className="text-temp-warm mt-0.5">•</span>
                  <span>Boa aderência ao ICP</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-temp-warm mt-0.5">•</span>
                  <span>Demonstrou interesse</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-temp-warm mt-0.5">•</span>
                  <span>Aguardando follow-up</span>
                </li>
              </>
            )}
            {lead.temperature === "cold" && (
              <>
                <li className="flex items-start gap-1.5">
                  <span className="text-temp-cold mt-0.5">•</span>
                  <span>Aderência moderada ao ICP</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-temp-cold mt-0.5">•</span>
                  <span>Sem urgência aparente</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-temp-cold mt-0.5">•</span>
                  <span>Necessita nurturing</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Next Step */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckCircle className="h-3.5 w-3.5 text-primary" />
            Próximo Passo
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{lead.nextStep}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1 font-semibold">
            Executar
          </Button>
          <Button size="sm" variant="outline" className="flex-1 font-semibold">
            Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const KanbanColumn = ({ temperature, title, icon: Icon }: { temperature: Temperature; title: string; icon: any }) => {
    const { setNodeRef, isOver } = useSortable({
      id: temperature,
    });

    const columnLeads = leadsByTemp[temperature];

    return (
      <div
        ref={setNodeRef}
        className={`space-y-4 rounded-xl border-2 border-dashed p-4 transition-all min-h-[600px] ${
          isOver
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border/50 bg-background/30"
        }`}
      >
        {/* Column Header */}
        <div className="flex items-center justify-between sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-border/50">
          <h3 className="flex items-center gap-3 text-lg font-bold">
            <Icon className={`h-5 w-5 ${temperature === "hot" ? "text-temp-hot" : temperature === "warm" ? "text-temp-warm" : "text-temp-cold"}`} />
            {title}
          </h3>
          <Badge variant="outline" className={`${getTempBadge(temperature)} font-bold px-3 py-1`}>
            {columnLeads.length}
          </Badge>
        </div>

        {/* Cards */}
        <SortableContext items={columnLeads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {columnLeads.map((lead) => (
              <SortableLeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </SortableContext>

        {columnLeads.length === 0 && (
          <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
            <div className="text-center space-y-2">
              <Icon className="h-8 w-8 mx-auto opacity-30" />
              <p>Nenhum lead {title.toLowerCase()}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Classificação de Temperatura</h1>
          <p className="text-muted-foreground mt-1">
            Arraste leads entre colunas para priorizar por probabilidade de conversão
          </p>
        </div>
        <Tabs value={view} onValueChange={(v) => setView(v as "kanban" | "list")}>
          <TabsList>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="list">Lista</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {view === "kanban" ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={["hot", "warm", "cold"]}>
            <div className="grid gap-6 md:grid-cols-3">
              <KanbanColumn temperature="hot" title="Quente" icon={Flame} />
              <KanbanColumn temperature="warm" title="Morno" icon={ThermometerSun} />
              <KanbanColumn temperature="cold" title="Frio" icon={Snowflake} />
            </div>
          </SortableContext>

          <DragOverlay>
            {activeLead ? (
              <div className="rotate-3 scale-105">
                <LeadCard lead={activeLead} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="space-y-3">
              {leads
                .sort((a, b) => {
                  const tempOrder = { hot: 0, warm: 1, cold: 2 };
                  return tempOrder[a.temperature] - tempOrder[b.temperature];
                })
                .map((lead) => (
                  <div
                    key={lead.id}
                    className={`flex items-center justify-between rounded-lg border-l-4 p-4 transition-all hover:shadow-md ${getTempColor(
                      lead.temperature
                    )} bg-card/50 backdrop-blur-sm`}
                  >
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className={getTempBadge(lead.temperature)}>
                        {lead.temperature === "hot" ? "🔥 Quente" : lead.temperature === "warm" ? "🌡️ Morno" : "❄️ Frio"}
                      </Badge>
                      <div>
                        <h4 className="font-semibold">{lead.name}</h4>
                        <p className="text-sm text-muted-foreground">{lead.funnelStage}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">ICP Fit</div>
                        <div className="font-bold">{lead.icpFitScore}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Valor</div>
                        <div className="font-bold">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            minimumFractionDigits: 0,
                          }).format(lead.potentialValue)}
                        </div>
                      </div>
                      <Button size="sm" className="font-semibold">Ver Detalhes</Button>
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
