import { useState } from "react";
import { mockConversations, Conversation } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Phone,
  MessageSquare,
  Calendar,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Lightbulb,
  Target,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Flame,
} from "lucide-react";

interface PlaybookStep {
  name: string;
  status: "completed" | "partial" | "missing";
  description: string;
}

interface AdherenceAnalysis {
  conversationId: string;
  playbookSteps: PlaybookStep[];
  strengths: string[];
  weaknesses: string[];
  coachingRecommendations: string[];
  playbookComparison: {
    expected: string;
    actual: string;
    gap: string;
  }[];
}

const mockAdherenceData: Record<string, AdherenceAnalysis> = {
  C001: {
    conversationId: "C001",
    playbookSteps: [
      {
        name: "Abertura",
        status: "completed",
        description: "Apresentação personalizada e quebra-gelo efetiva",
      },
      {
        name: "Descoberta",
        status: "completed",
        description: "Identificou dores principais e confirmou entendimento",
      },
      {
        name: "Apresentação",
        status: "partial",
        description: "Mencionou benefícios mas não aprofundou em funcionalidades",
      },
      {
        name: "Proposta",
        status: "completed",
        description: "Uso efetivo de gatilhos mentais e reposicionamento de valor",
      },
      {
        name: "Tratamento de Objeções",
        status: "completed",
        description: "Superou objeção de preço com reframe eficaz",
      },
      {
        name: "Fechamento",
        status: "completed",
        description: "CTA claro e próximo passo confirmado",
      },
    ],
    strengths: [
      "Excelente uso de perguntas abertas para descobrir dores",
      "Reframe efetivo da objeção de preço",
      "Gatilhos mentais bem aplicados (escassez, prova social)",
      "CTA claro e com data confirmada",
    ],
    weaknesses: [
      "Não aprofundou em como a solução funciona tecnicamente",
      "Poderia ter explorado mais stakeholders envolvidos",
      "Faltou mencionar diferenciais competitivos",
    ],
    coachingRecommendations: [
      "Continue usando perguntas abertas - está funcionando muito bem",
      "Ao tratar objeções de preço, sempre lembre de ancorar no ROI específico do cliente",
      "Na próxima call, reserve 5 minutos para demo visual da plataforma",
      "Pergunte sobre processo de decisão e outros envolvidos logo na descoberta",
    ],
    playbookComparison: [
      {
        expected: "Apresentar 3 cases similares ao segmento do lead",
        actual: "Mencionou resultado genérico (25% de melhoria)",
        gap: "Personalizar com cases do mesmo segmento aumenta credibilidade",
      },
      {
        expected: "Mapear todos os stakeholders na etapa de descoberta",
        actual: "Focou apenas no lead principal",
        gap: "Identificar CFO e diretoria desde o início agiliza ciclo de venda",
      },
    ],
  },
  C002: {
    conversationId: "C002",
    playbookSteps: [
      {
        name: "Abertura",
        status: "completed",
        description: "Apresentação direta e profissional",
      },
      {
        name: "Descoberta",
        status: "partial",
        description: "Identificou dor principal mas não aprofundou consequências",
      },
      {
        name: "Apresentação",
        status: "missing",
        description: "Não apresentou solução ou benefícios",
      },
      {
        name: "Proposta",
        status: "missing",
        description: "Não fez proposta de valor clara",
      },
      {
        name: "Tratamento de Objeções",
        status: "missing",
        description: "Concordou com objeções ao invés de trabalhar urgência",
      },
      {
        name: "Fechamento",
        status: "partial",
        description: "Próximos passos vagos e sem data definida",
      },
    ],
    strengths: [
      "Pesquisou sobre o crescimento da empresa antes da call",
      "Abordagem profissional e respeitosa",
    ],
    weaknesses: [
      "Não criou urgência quando lead mencionou 'próximo trimestre'",
      "Concordou passivamente com necessidade de falar com CFO",
      "Não fez perguntas de aprofundamento sobre as dores",
      "Não apresentou nenhuma solução ou benefício",
      "Faltou tentativa de agendar call com decisores",
    ],
    coachingRecommendations: [
      "CRÍTICO: Quando lead diz 'próximo trimestre', pergunte: 'O que acontece se esperarmos? Quanto isso pode custar?'",
      "Ao ouvir sobre CFO, proponha incluí-lo na próxima conversa ao invés de aceitar passivamente",
      "Use a técnica SPIN: Situação → Problema → Implicação → Necessidade",
      "Sempre feche com data e hora específicas, nunca com 'follow-up em X dias'",
      "Estude os módulos sobre criação de urgência e envolvimento de stakeholders",
    ],
    playbookComparison: [
      {
        expected: "Ao ouvir objeção de timing, explorar custo da inação",
        actual: "Concordou com adiar para próximo trimestre",
        gap: "Perda de momentum e risco de lead esfriar completamente",
      },
      {
        expected: "Propor reunião conjunta com todos os decisores",
        actual: "Aceitou follow-up genérico em 3 dias",
        gap: "Sem envolver CFO, ciclo de venda se estende indefinidamente",
      },
      {
        expected: "Apresentar pelo menos 2 benefícios mensuráveis da solução",
        actual: "Encerrou sem apresentar solução",
        gap: "Lead não tem informação suficiente para defender projeto internamente",
      },
    ],
  },
  C003: {
    conversationId: "C003",
    playbookSteps: [
      {
        name: "Abertura",
        status: "completed",
        description: "Referência à conversa anterior - contextualização perfeita",
      },
      {
        name: "Descoberta",
        status: "completed",
        description: "Confirmou dores previamente identificadas com precisão",
      },
      {
        name: "Apresentação",
        status: "completed",
        description: "Apresentação estruturada em 3 cenários alinhados às dores",
      },
      {
        name: "Proposta",
        status: "completed",
        description: "Conectou features específicos às dores do lead",
      },
      {
        name: "Tratamento de Objeções",
        status: "completed",
        description: "Nenhuma objeção - lead completamente alinhado",
      },
      {
        name: "Fechamento",
        status: "completed",
        description: "Lead pediu para avançar - próximos passos claros",
      },
    ],
    strengths: [
      "Preparação impecável - lembrou detalhes da conversa anterior",
      "Proposta estruturada em múltiplos cenários mostra profissionalismo",
      "Conectou funcionalidades específicas às dores exatas do lead",
      "Usou linguagem do cliente ('coaching rápido', 'evidências')",
      "Lead assumiu papel ativo pedindo para avançar",
    ],
    weaknesses: [],
    coachingRecommendations: [
      "Excelente exemplo de aderência total ao playbook!",
      "Use esta conversa como referência para treinar o time",
      "Mantenha o padrão de preparação e contextualização",
      "Continue documentando dores com precisão para usar em propostas",
    ],
    playbookComparison: [
      {
        expected: "Referenciar conversas anteriores na abertura",
        actual: "Executado perfeitamente com contexto da proposta",
        gap: "Nenhum - exemplo ideal",
      },
      {
        expected: "Conectar features às dores específicas do lead",
        actual: "Módulo de Auditoria linkado diretamente à dor de coaching",
        gap: "Nenhum - exemplo ideal",
      },
    ],
  },
};

export default function Aderencia() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations[0]
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.representative.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentAnalysis = selectedConversation
    ? mockAdherenceData[selectedConversation.id]
    : null;

  const getStepIcon = (status: PlaybookStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-status-success" />;
      case "partial":
        return <AlertCircle className="h-5 w-5 text-status-warning" />;
      case "missing":
        return <XCircle className="h-5 w-5 text-status-danger" />;
    }
  };

  const getStepColor = (status: PlaybookStep["status"]) => {
    switch (status) {
      case "completed":
        return "border-status-success/20 bg-status-success/5";
      case "partial":
        return "border-status-warning/20 bg-status-warning/5";
      case "missing":
        return "border-status-danger/20 bg-status-danger/5";
    }
  };

  const getAdherenceColor = (score: number) => {
    if (score >= 80) return "text-status-success";
    if (score >= 60) return "text-status-warning";
    return "text-status-danger";
  };

  const getAdherenceGradient = (score: number) => {
    if (score >= 80) return "from-status-success/20 to-status-success/5";
    if (score >= 60) return "from-status-warning/20 to-status-warning/5";
    return "from-status-danger/20 to-status-danger/5";
  };

  const getTempBadgeColor = (temp: string) => {
    if (temp === "hot") return "bg-temp-hot/10 text-temp-hot border-temp-hot/20";
    if (temp === "warm") return "bg-temp-warm/10 text-temp-warm border-temp-warm/20";
    return "bg-temp-cold/10 text-temp-cold border-temp-cold/20";
  };

  const getTempIcon = (temp: string) => {
    if (temp === "hot") return <Flame className="h-4 w-4" />;
    if (temp === "warm") return <TrendingUp className="h-4 w-4" />;
    return <Target className="h-4 w-4" />;
  };

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      adherence: "bg-adherence-high/10 text-adherence-high border-adherence-high/20",
      objection: "bg-status-danger/10 text-status-danger border-status-danger/20",
      cta: "bg-primary/10 text-primary border-primary/20",
      trigger: "bg-status-warning/10 text-status-warning border-status-warning/20",
      pain: "bg-status-danger/10 text-status-danger border-status-danger/20",
      desire: "bg-status-success/10 text-status-success border-status-success/20",
    };
    return colors[tag] || "bg-muted";
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Análise de Aderência a Script</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Comparação detalhada com playbook comercial
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por lead ou representante..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          Filtros Avançados
        </Button>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {/* Lista de conversas */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Conversas Auditadas</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] lg:h-[calc(100vh-300px)]">
              <div className="space-y-2 p-3 md:p-4">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`cursor-pointer rounded-lg border p-3 md:p-4 transition-all hover:bg-muted/50 ${
                      selectedConversation?.id === conv.id
                        ? "border-muted-foreground/30 bg-muted"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {conv.channel === "whatsapp" ? (
                          <MessageSquare className="h-4 w-4 text-status-success" />
                        ) : (
                          <Phone className="h-4 w-4 text-primary" />
                        )}
                        <span className="font-semibold text-sm">{conv.leadName}</span>
                      </div>
                      <div
                        className={`text-lg font-bold ${getAdherenceColor(conv.adherenceScore)}`}
                      >
                        {conv.adherenceScore}%
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      {conv.representative}
                    </div>
                    <div className="mt-2">
                      <Progress value={conv.adherenceScore} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Análise detalhada */}
        {selectedConversation && currentAnalysis && (
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Header com score */}
            <Card
              className={`bg-gradient-to-br ${getAdherenceGradient(selectedConversation.adherenceScore)}`}
            >
              <CardHeader className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg md:text-xl">
                      {selectedConversation.leadName}
                    </CardTitle>
                    <div className="mt-2 flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {selectedConversation.representative}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(selectedConversation.date).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="flex items-center gap-1">
                        {selectedConversation.channel === "whatsapp" ? (
                          <MessageSquare className="h-4 w-4" />
                        ) : (
                          <Phone className="h-4 w-4" />
                        )}
                        {selectedConversation.channel === "whatsapp" ? "WhatsApp" : "Voz"}
                      </div>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">
                      Aderência ao Script
                    </div>
                    <div
                      className={`text-4xl md:text-5xl font-bold ${getAdherenceColor(selectedConversation.adherenceScore)}`}
                    >
                      {selectedConversation.adherenceScore}%
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Etapas do Playbook */}
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Etapas do Playbook
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="space-y-3">
                  {currentAnalysis.playbookSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg border p-3 md:p-4 ${getStepColor(step.status)}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">{getStepIcon(step.status)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-semibold text-sm md:text-base">
                              {step.name}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-xs"
                            >
                              {step.status === "completed"
                                ? "Cumprida"
                                : step.status === "partial"
                                ? "Parcial"
                                : "Não cumprida"}
                            </Badge>
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cards de análise em grid */}
            <div className="grid gap-3 md:gap-4 md:grid-cols-2">
              {/* Temperatura */}
              <Card>
                <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                    {getTempIcon(selectedConversation.temperature)}
                    Temperatura do Lead
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <Badge
                    variant="outline"
                    className={`${getTempBadgeColor(selectedConversation.temperature)} text-sm`}
                  >
                    {selectedConversation.temperature === "hot"
                      ? "🔥 Quente"
                      : selectedConversation.temperature === "warm"
                      ? "🌡️ Morno"
                      : "❄️ Frio"}
                  </Badge>
                  <p className="mt-2 text-xs md:text-sm text-muted-foreground">
                    Probabilidade de conversão:{" "}
                    <span className="font-semibold text-foreground">
                      {selectedConversation.conversionProbability}%
                    </span>
                  </p>
                </CardContent>
              </Card>

              {/* Objeções */}
              <Card>
                <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                    <AlertTriangle className="h-4 w-4 text-status-warning" />
                    Objeções Identificadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  {selectedConversation.objections.length > 0 ? (
                    <div className="space-y-2">
                      {selectedConversation.objections.map((obj, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              obj.resolved
                                ? "border-status-success text-status-success"
                                : "border-status-danger text-status-danger"
                            }`}
                          >
                            {obj.type}
                          </Badge>
                          <span className="text-xs md:text-sm flex-1">{obj.text}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Nenhuma objeção identificada
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Dores */}
              <Card>
                <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                    <AlertCircle className="h-4 w-4 text-status-danger" />
                    Dores Mapeadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="space-y-2">
                    {selectedConversation.painPoints.map((pain, idx) => (
                      <div key={idx}>
                        <Badge
                          variant="outline"
                          className="text-status-danger border-status-danger text-xs mb-1"
                        >
                          {pain.category}
                        </Badge>
                        <p className="text-xs md:text-sm">{pain.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Desejos */}
              <Card>
                <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                    <Target className="h-4 w-4 text-status-success" />
                    Desejos Identificados
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {selectedConversation.desires.map((desire, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-status-success border-status-success text-xs"
                      >
                        {desire}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pontos Fortes */}
            {currentAnalysis.strengths.length > 0 && (
              <Card>
                <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                    <ThumbsUp className="h-4 w-4 text-status-success" />
                    Pontos Fortes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="space-y-2">
                    {currentAnalysis.strengths.map((strength, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-status-success flex-shrink-0 mt-0.5" />
                        <p className="text-xs md:text-sm flex-1">{strength}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pontos Fracos */}
            {currentAnalysis.weaknesses.length > 0 && (
              <Card>
                <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                    <ThumbsDown className="h-4 w-4 text-status-danger" />
                    Pontos Fracos / Gaps
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="space-y-2">
                    {currentAnalysis.weaknesses.map((weakness, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-status-danger flex-shrink-0 mt-0.5" />
                        <p className="text-xs md:text-sm flex-1">{weakness}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recomendações de Coaching */}
            <Card>
              <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                  <Lightbulb className="h-4 w-4 text-status-warning" />
                  Recomendações de Coaching
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="space-y-3">
                  {currentAnalysis.coachingRecommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row md:items-start gap-2 md:gap-3"
                    >
                      <div className="flex items-start gap-2 flex-1">
                        <div className="mt-0.5 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary flex-shrink-0">
                          {idx + 1}
                        </div>
                        <p className="flex-1 text-xs md:text-sm">{rec}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comparação com Playbook */}
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Comparação com Playbook Comercial
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="space-y-4">
                  {currentAnalysis.playbookComparison.map((comp, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-muted bg-muted/30 p-3 md:p-4"
                    >
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs font-semibold text-muted-foreground mb-1">
                            ✓ ESPERADO PELO PLAYBOOK:
                          </div>
                          <p className="text-xs md:text-sm">{comp.expected}</p>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-muted-foreground mb-1">
                            ⚡ O QUE FOI FEITO:
                          </div>
                          <p className="text-xs md:text-sm">{comp.actual}</p>
                        </div>
                        <div className="border-t border-muted pt-2">
                          <div className="text-xs font-semibold text-primary mb-1">
                            💡 IMPACTO DO GAP:
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground">{comp.gap}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transcrição Semântica */}
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base md:text-lg">Transcrição Anotada</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <ScrollArea className="h-[400px] md:h-[500px] pr-2 md:pr-4">
                  <div className="space-y-3 md:space-y-4">
                    {selectedConversation.transcript.map((segment, idx) => (
                      <div
                        key={idx}
                        className={`rounded-lg p-3 md:p-4 ${
                          segment.speaker === "rep"
                            ? "bg-primary/5 border-l-4 border-primary"
                            : "bg-muted"
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs md:text-sm font-semibold">
                            {segment.speaker === "rep" ? "Representante" : "Lead"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {segment.timestamp}
                          </span>
                        </div>
                        <p className="mb-2 text-xs md:text-sm leading-relaxed">{segment.text}</p>
                        {segment.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {segment.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className={`${getTagColor(tag)} text-xs`}
                              >
                                {tag === "adherence" && "✓ Aderência"}
                                {tag === "objection" && "⚠ Objeção"}
                                {tag === "cta" && "📞 CTA"}
                                {tag === "trigger" && "⚡ Gatilho"}
                                {tag === "pain" && "💢 Dor"}
                                {tag === "desire" && "✨ Desejo"}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
