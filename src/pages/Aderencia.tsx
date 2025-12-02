import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, FileText, Calendar, Trash2, Eye, Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Script {
  id: string;
  title: string;
  prompt: string;
  createdAt: Date;
}

export default function Aderencia() {
  const [scripts, setScripts] = useState<Script[]>([
    {
      id: "1",
      title: "Script de Vendas - Produto Premium",
      prompt: "Você é um especialista em vendas consultivas. Seu objetivo é conduzir uma conversa de vendas seguindo estas etapas:\n\n1. Abertura e Rapport\n2. Descoberta de necessidades\n3. Apresentação da solução\n4. Tratamento de objeções\n5. Fechamento\n\nSempre personalize a abordagem de acordo com o perfil do cliente.",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "Script de Qualificação de Leads",
      prompt: "Sua função é qualificar leads através de perguntas estratégicas. Avalie:\n\n- Budget disponível\n- Autoridade para decisão\n- Necessidade real\n- Timeline de implementação\n\nClassifique o lead como: Hot, Warm ou Cold.",
      createdAt: new Date("2024-01-20"),
    },
    {
      id: "3",
      title: "Script de Follow-up Pós-Demo",
      prompt: "Após uma demonstração do produto, utilize este script para:\n\n1. Agradecer pela participação\n2. Reforçar os principais benefícios apresentados\n3. Esclarecer dúvidas pendentes\n4. Apresentar próximos passos\n5. Definir data para decisão\n\nMantenha o tom consultivo e demonstre urgência sem pressão.",
      createdAt: new Date("2024-01-22"),
    },
    {
      id: "4",
      title: "Script de Tratamento de Objeções de Preço",
      prompt: "Quando o lead apresentar objeções relacionadas a preço:\n\n1. Valide a preocupação do cliente\n2. Reposicione o investimento em termos de ROI\n3. Compare com o custo de não resolver o problema\n4. Apresente casos de sucesso com resultados financeiros\n5. Ofereça opções de parcelamento se aplicável\n\nNunca dê desconto sem receber algo em troca.",
      createdAt: new Date("2024-01-25"),
    },
    {
      id: "5",
      title: "Script de Reativação de Leads Frios",
      prompt: "Para leads que esfriaram ou não responderam:\n\n1. Referencie a última conversa/interesse\n2. Compartilhe uma novidade relevante\n3. Ofereça um conteúdo de valor\n4. Faça uma pergunta aberta\n5. Proponha uma conversa rápida de 10 minutos\n\nSeja persistente mas não invasivo. Máximo 3 tentativas.",
      createdAt: new Date("2024-01-28"),
    },
    {
      id: "6",
      title: "Script de Onboarding de Novos Clientes",
      prompt: "Ao iniciar o relacionamento com novo cliente:\n\n1. Boas-vindas personalizadas\n2. Apresentação do time de suporte\n3. Alinhamento de expectativas e prazos\n4. Definição de métricas de sucesso\n5. Agendamento de check-ins regulares\n\nObjetivo: garantir que o cliente tenha sucesso desde o primeiro dia.",
      createdAt: new Date("2024-01-30"),
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingScript, setEditingScript] = useState<Script | null>(null);
  const [viewingScript, setViewingScript] = useState<Script | null>(null);
  const [newScript, setNewScript] = useState({
    title: "",
    prompt: "",
  });

  const handleCreateScript = () => {
    if (!newScript.title.trim() || !newScript.prompt.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o título e o prompt do script.",
        variant: "destructive",
      });
      return;
    }

    if (editingScript) {
      // Editar script existente
      setScripts(
        scripts.map((s) =>
          s.id === editingScript.id
            ? { ...s, title: newScript.title, prompt: newScript.prompt }
            : s
        )
      );
      toast({
        title: "Script atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
    } else {
      // Criar novo script
      const script: Script = {
        id: Date.now().toString(),
        title: newScript.title,
        prompt: newScript.prompt,
        createdAt: new Date(),
      };
      setScripts([script, ...scripts]);
      toast({
        title: "Script criado!",
        description: "Seu script de aderência foi criado com sucesso.",
      });
    }

    setNewScript({ title: "", prompt: "" });
    setEditingScript(null);
    setIsDialogOpen(false);
  };

  const handleEditScript = (script: Script) => {
    setEditingScript(script);
    setNewScript({
      title: script.title,
      prompt: script.prompt,
    });
    setIsDialogOpen(true);
  };

  const handleViewScript = (script: Script) => {
    setViewingScript(script);
    setIsViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewScript({ title: "", prompt: "" });
    setEditingScript(null);
  };

  const handleDeleteScript = (id: string) => {
    setScripts(scripts.filter((s) => s.id !== id));
    toast({
      title: "Script excluído",
      description: "O script foi removido com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Script de Aderência</h1>
          <p className="text-muted-foreground">
            Gerencie seus scripts de vendas e aderência
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Script
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>
                {editingScript ? "Editar Script" : "Cadastrar Novo Script"}
              </DialogTitle>
              <DialogDescription>
                {editingScript
                  ? "Atualize as informações do script"
                  : "Crie um novo script de aderência definindo o título e o prompt"}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Script</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Script de Vendas - Produto Premium"
                    value={newScript.title}
                    onChange={(e) =>
                      setNewScript({ ...newScript, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt do Script</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Descreva detalhadamente o script que deve ser seguido durante a conversa..."
                    className="min-h-[300px] resize-none"
                    value={newScript.prompt}
                    onChange={(e) =>
                      setNewScript({ ...newScript, prompt: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Defina as etapas, abordagens e objetivos do script
                  </p>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancelar
              </Button>
              <Button onClick={handleCreateScript}>
                {editingScript ? "Salvar Alterações" : "Criar Script"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dialog de Visualização */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{viewingScript?.title}</DialogTitle>
            <DialogDescription>
              Criado em{" "}
              {viewingScript?.createdAt.toLocaleDateString("pt-BR")}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Prompt do Script</Label>
                <div className="rounded-md border bg-muted/30 p-4">
                  <p className="text-sm whitespace-pre-wrap">
                    {viewingScript?.prompt}
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {scripts.map((script) => (
          <Card key={script.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg line-clamp-2">
                    {script.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-xs mt-2">
                    <Calendar className="h-3 w-3" />
                    {script.createdAt.toLocaleDateString("pt-BR")}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <ScrollArea className="h-24 rounded-md border bg-muted/30 p-3">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3">
                  {script.prompt}
                </p>
              </ScrollArea>
              <div className="flex gap-2 mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleViewScript(script)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEditScript(script)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteScript(script.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {scripts.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Nenhum script cadastrado
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Comece criando seu primeiro script de aderência
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Script
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
