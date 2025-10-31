import { useState } from "react";
import { mockConversations, Conversation } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Phone, MessageSquare, Calendar, User, TrendingUp, AlertCircle, CheckCircle, Target, Lightbulb } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Auditoria() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations[0]
  );

  const getTempBadgeColor = (temp: string) => {
    if (temp === "hot") return "bg-temp-hot/10 text-temp-hot border-temp-hot/20";
    if (temp === "warm") return "bg-temp-warm/10 text-temp-warm border-temp-warm/20";
    return "bg-temp-cold/10 text-temp-cold border-temp-cold/20";
  };

  const getAdherenceColor = (score: number) => {
    if (score >= 80) return "text-adherence-high";
    if (score >= 60) return "text-adherence-medium";
    return "text-adherence-low";
  };

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      adherence: "bg-adherence-high/10 text-adherence-high",
      objection: "bg-status-danger/10 text-status-danger",
      cta: "bg-primary/10 text-primary",
      trigger: "bg-status-warning/10 text-status-warning",
      pain: "bg-status-danger/10 text-status-danger",
      desire: "bg-status-success/10 text-status-success",
    };
    return colors[tag] || "bg-muted";
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Auditoria de Conversas</h1>
        <p className="text-sm md:text-base text-muted-foreground">Análise semântica detalhada por conversa</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar por lead, representante ou palavra-chave..." className="pl-10" />
        </div>
        <Button variant="outline" className="w-full md:w-auto">Filtros Avançados</Button>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {/* Lista de conversas */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Conversas Recentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] lg:h-[calc(100vh-300px)]">
              <div className="space-y-2 p-3 md:p-4">
                {mockConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`cursor-pointer rounded-lg border p-3 md:p-4 transition-colors hover:bg-muted/50 ${
                      selectedConversation?.id === conv.id ? "border-muted-foreground/30 bg-muted" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {conv.channel === "whatsapp" ? (
                          <MessageSquare className="h-4 w-4 text-status-success" />
                        ) : (
                          <Phone className="h-4 w-4 text-primary" />
                        )}
                        <span className="font-semibold">{conv.leadName}</span>
                      </div>
                      <Badge variant="outline" className={getTempBadgeColor(conv.temperature)}>
                        {conv.temperature === "hot" ? "Quente" : conv.temperature === "warm" ? "Morno" : "Frio"}
                      </Badge>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {conv.transcript[0].text}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(conv.date).toLocaleDateString("pt-BR")}</span>
                      <span className={getAdherenceColor(conv.adherenceScore)}>
                        {conv.adherenceScore}% aderência
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Detalhes da conversa */}
        {selectedConversation && (
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Header da conversa */}
            <Card>
              <CardHeader className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg md:text-xl">{selectedConversation.leadName}</CardTitle>
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
                  <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2">
                    <Badge variant="outline" className={getTempBadgeColor(selectedConversation.temperature)}>
                      {selectedConversation.temperature === "hot" ? "Quente" : selectedConversation.temperature === "warm" ? "Morno" : "Frio"}
                    </Badge>
                    <div className="text-right">
                      <div className="text-xs md:text-sm text-muted-foreground">Aderência</div>
                      <div className={`text-xl md:text-2xl font-bold ${getAdherenceColor(selectedConversation.adherenceScore)}`}>
                        {selectedConversation.adherenceScore}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Cartas de IA */}
            <div className="grid gap-3 md:gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 text-status-success" />
                    Resumo Executivo
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <p className="text-xs md:text-sm leading-relaxed">{selectedConversation.summary}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Probabilidade de Conversão
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      {selectedConversation.conversionProbability}%
                    </div>
                    <div className="flex-1 text-xs md:text-sm text-muted-foreground">
                      {selectedConversation.conversionProbability >= 75
                        ? "Alta chance de conversão. Lead muito engajado com dores claras."
                        : selectedConversation.conversionProbability >= 50
                        ? "Moderada chance. Trabalhar objeções e criar urgência."
                        : "Baixa chance. Necessário requalificar ou nutrir lead."}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                    <AlertCircle className="h-4 w-4 text-status-danger" />
                    Dores Identificadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="space-y-2">
                    {selectedConversation.painPoints.map((pain, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row md:items-start gap-2">
                        <Badge variant="outline" className="text-status-danger border-status-danger text-xs w-fit">
                          {pain.category}
                        </Badge>
                        <p className="text-xs md:text-sm">{pain.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                    <Target className="h-4 w-4 text-status-success" />
                    Desejos Mapeados
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {selectedConversation.desires.map((desire, idx) => (
                      <Badge key={idx} variant="outline" className="text-status-success border-status-success text-xs">
                        {desire}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Próximos Passos */}
            <Card>
              <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                  <Lightbulb className="h-4 w-4 text-status-warning" />
                  Próximos Passos Sugeridos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="space-y-3">
                  {selectedConversation.nextSteps.map((step, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-3">
                      <div className="flex items-start gap-2 flex-1">
                        <div className="mt-0.5 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary flex-shrink-0">
                          {idx + 1}
                        </div>
                        <p className="flex-1 text-xs md:text-sm">{step}</p>
                      </div>
                      <Button size="sm" variant="outline" className="w-full md:w-auto text-xs">
                        Executar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transcrição */}
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base md:text-lg">Transcrição Semântica</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <ScrollArea className="h-[400px] md:h-[500px] pr-2 md:pr-4">
                  <div className="space-y-3 md:space-y-4">
                    {selectedConversation.transcript.map((segment, idx) => (
                      <div
                        key={idx}
                        className={`rounded-lg p-3 md:p-4 ${
                          segment.speaker === "rep" ? "bg-primary/5 border-l-4 border-primary" : "bg-muted"
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs md:text-sm font-semibold">
                            {segment.speaker === "rep" ? "Representante" : "Lead"}
                          </span>
                          <span className="text-xs text-muted-foreground">{segment.timestamp}</span>
                        </div>
                        <p className="mb-2 text-xs md:text-sm leading-relaxed">{segment.text}</p>
                        {segment.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {segment.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className={`${getTagColor(tag)} text-xs`}>
                                {tag === "adherence" && "Aderência"}
                                {tag === "objection" && "Objeção"}
                                {tag === "cta" && "CTA"}
                                {tag === "trigger" && "Gatilho"}
                                {tag === "pain" && "Dor"}
                                {tag === "desire" && "Desejo"}
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
