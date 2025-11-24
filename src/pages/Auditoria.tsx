import { useState } from "react";
import { mockConversations, Conversation } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Phone, MessageSquare, Calendar, User, TrendingUp, AlertCircle, Target, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Auditoria() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setIsDialogOpen(true);
  };

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

      <Card>
        <CardHeader>
          <CardTitle>Lista de Conversas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Representante</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Temperatura</TableHead>
                <TableHead>Aderência</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockConversations.map((conv) => (
                <TableRow key={conv.id}>
                  <TableCell className="font-medium">{conv.leadName}</TableCell>
                  <TableCell>{conv.representative}</TableCell>
                  <TableCell>{new Date(conv.date).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {conv.channel === "whatsapp" ? (
                        <>
                          <MessageSquare className="h-4 w-4 text-status-success" />
                          <span className="text-sm">WhatsApp</span>
                        </>
                      ) : (
                        <>
                          <Phone className="h-4 w-4 text-primary" />
                          <span className="text-sm">Voz</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTempBadgeColor(conv.temperature)}>
                      {conv.temperature === "hot" ? "Quente" : conv.temperature === "warm" ? "Morno" : "Frio"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={getAdherenceColor(conv.adherenceScore)}>
                      {conv.adherenceScore}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(conv)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedConversation && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedConversation.leadName}</DialogTitle>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
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
              </DialogHeader>

              <div className="mt-6 space-y-4">
                {/* Resumo Executivo */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      Resumo Executivo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{selectedConversation.summary}</p>
                  </CardContent>
                </Card>

                {/* Grid com Probabilidade, Temperatura e Aderência */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Probabilidade de Conversão
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">
                        {selectedConversation.conversionProbability}%
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Temperatura</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline" className={getTempBadgeColor(selectedConversation.temperature)}>
                        {selectedConversation.temperature === "hot" ? "Quente" : selectedConversation.temperature === "warm" ? "Morno" : "Frio"}
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Aderência</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-3xl font-bold ${getAdherenceColor(selectedConversation.adherenceScore)}`}>
                        {selectedConversation.adherenceScore}%
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Dores e Desejos */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <AlertCircle className="h-4 w-4 text-status-danger" />
                        Dores Identificadas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedConversation.painPoints.map((pain, idx) => (
                          <div key={idx} className="flex flex-col gap-2">
                            <Badge variant="outline" className="text-status-danger border-status-danger text-xs w-fit">
                              {pain.category}
                            </Badge>
                            <p className="text-sm">{pain.text}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Target className="h-4 w-4 text-status-success" />
                        Desejos Mapeados
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedConversation.desires.map((desire, idx) => (
                          <Badge key={idx} variant="outline" className="text-status-success border-status-success text-xs">
                            {desire}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
