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
import { Plus, FileText, Calendar, Trash2 } from "lucide-react";
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
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

    const script: Script = {
      id: Date.now().toString(),
      title: newScript.title,
      prompt: newScript.prompt,
      createdAt: new Date(),
    };

    setScripts([script, ...scripts]);
    setNewScript({ title: "", prompt: "" });
    setIsDialogOpen(false);

    toast({
      title: "Script criado!",
      description: "Seu script de aderência foi criado com sucesso.",
    });
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
              <DialogTitle>Cadastrar Novo Script</DialogTitle>
              <DialogDescription>
                Crie um novo script de aderência definindo o título e o prompt
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
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleCreateScript}>Criar Script</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {scripts.map((script) => (
          <Card key={script.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg line-clamp-2">
                      {script.title}
                    </CardTitle>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={() => handleDeleteScript(script.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <CardDescription className="flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                {script.createdAt.toLocaleDateString("pt-BR")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">
                  Prompt:
                </p>
                <ScrollArea className="h-32 rounded-md border bg-muted/30 p-3">
                  <p className="text-sm whitespace-pre-wrap">{script.prompt}</p>
                </ScrollArea>
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
