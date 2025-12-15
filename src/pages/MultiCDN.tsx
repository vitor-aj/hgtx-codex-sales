import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Lock, Play, Server, Cloud, Video, Youtube, CheckCircle2, Zap } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isPro: boolean;
  isConnected: boolean;
  iconBg: string;
  accentColor: string;
}

const integrations: Integration[] = [
  {
    id: "vimeo",
    name: "Vimeo",
    description: "Hospede e distribua vídeos com qualidade profissional.",
    icon: <Play className="h-5 w-5" />,
    isPro: true,
    isConnected: true,
    iconBg: "bg-gradient-to-br from-[#1ab7ea] to-[#0d8cb8]",
    accentColor: "border-[#1ab7ea]/30",
  },
  {
    id: "on-premise",
    name: "On-Premise",
    description: "Crie sua infraestrutura local e mantenha controle total.",
    icon: <Server className="h-5 w-5" />,
    isPro: false,
    isConnected: true,
    iconBg: "bg-gradient-to-br from-amber-500 to-amber-600",
    accentColor: "border-amber-500/30",
  },
  {
    id: "aws-cloudfront",
    name: "AWS CloudFront",
    description: "CDN global da Amazon para entrega rápida de conteúdo.",
    icon: <Cloud className="h-5 w-5" />,
    isPro: true,
    isConnected: false,
    iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
    accentColor: "border-orange-500/20",
  },
  {
    id: "panda-video",
    name: "Panda Video",
    description: "Plataforma de vídeo com análise avançada e segurança.",
    icon: <Video className="h-5 w-5" />,
    isPro: false,
    isConnected: false,
    iconBg: "bg-gradient-to-br from-green-500 to-green-600",
    accentColor: "border-green-500/20",
  },
  {
    id: "smartplayer",
    name: "SmartPlayer",
    description: "Player inteligente com monetização e personalização.",
    icon: <Zap className="h-5 w-5" />,
    isPro: false,
    isConnected: false,
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
    accentColor: "border-purple-500/20",
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Distribua seus vídeos na maior plataforma de streaming.",
    icon: <Youtube className="h-5 w-5" />,
    isPro: false,
    isConnected: false,
    iconBg: "bg-gradient-to-br from-red-500 to-red-600",
    accentColor: "border-red-500/20",
  },
];

export default function MultiCDN() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIntegrations = integrations.filter((integration) =>
    integration.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
            <Cloud className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              MultiCDN
            </h1>
            <p className="text-sm text-muted-foreground">
              Configurações de Integração
            </p>
          </div>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Gerencie suas conexões de CDN e streaming. Algumas integrações podem exigir planos específicos.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Pesquisar Integrações..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredIntegrations.map((integration, index) => (
          <Card 
            key={integration.id} 
            className={`
              relative overflow-hidden transition-all duration-300 
              hover:shadow-xl hover:-translate-y-1 hover:border-primary/30
              bg-gradient-to-br from-card to-card/80
              border-2 ${integration.isConnected ? integration.accentColor : 'border-border/50'}
              animate-fade-in
            `}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Connected glow effect */}
            {integration.isConnected && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            )}
            
            <CardHeader className="pb-3 relative">
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${integration.iconBg} shadow-lg text-white`}>
                  {integration.icon}
                </div>
                <Badge 
                  className={`
                    font-semibold text-xs px-2.5 py-0.5 
                    ${integration.isPro 
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 shadow-sm" 
                      : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-sm"
                    }
                  `}
                >
                  {integration.isPro ? "PRO" : "Free"}
                </Badge>
              </div>
              <CardTitle className="text-lg mt-4 font-semibold">{integration.name}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {integration.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0 relative">
              {integration.isConnected ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-green-600 dark:text-green-400 font-medium">Conectado</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:bg-primary/10 hover:border-primary/50 transition-colors"
                    >
                      Configurar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-colors"
                    >
                      Desconectar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Desbloqueie com PRO Plan</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    Upgrade to Pro
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredIntegrations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
          <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Nenhuma integração encontrada</p>
          <p className="text-sm text-muted-foreground/70">Tente buscar por outro termo</p>
        </div>
      )}
    </div>
  );
}
