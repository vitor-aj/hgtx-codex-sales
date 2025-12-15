import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Lock, Play, Server, Cloud, Video, Youtube } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isPro: boolean;
  isConnected: boolean;
  iconBg: string;
}

const integrations: Integration[] = [
  {
    id: "vimeo",
    name: "Vimeo",
    description: "Hospede e distribua vídeos com qualidade profissional.",
    icon: <Play className="h-5 w-5 text-[#1ab7ea]" />,
    isPro: true,
    isConnected: true,
    iconBg: "bg-[#1ab7ea]/10",
  },
  {
    id: "on-premise",
    name: "On-Premise",
    description: "Crie sua infraestrutura local e mantenha controle total.",
    icon: <Server className="h-5 w-5 text-amber-600" />,
    isPro: false,
    isConnected: true,
    iconBg: "bg-amber-100",
  },
  {
    id: "aws-cloudfront",
    name: "AWS CloudFront",
    description: "CDN global da Amazon para entrega rápida de conteúdo.",
    icon: <Cloud className="h-5 w-5 text-orange-500" />,
    isPro: true,
    isConnected: false,
    iconBg: "bg-orange-100",
  },
  {
    id: "panda-video",
    name: "Panda Video",
    description: "Plataforma de vídeo com análise avançada e segurança.",
    icon: <Video className="h-5 w-5 text-green-600" />,
    isPro: false,
    isConnected: false,
    iconBg: "bg-green-100",
  },
  {
    id: "smartplayer",
    name: "SmartPlayer",
    description: "Player inteligente com monetização e personalização.",
    icon: <Play className="h-5 w-5 text-purple-600" />,
    isPro: false,
    isConnected: false,
    iconBg: "bg-purple-100",
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Distribua seus vídeos na maior plataforma de streaming.",
    icon: <Youtube className="h-5 w-5 text-red-600" />,
    isPro: false,
    isConnected: false,
    iconBg: "bg-red-100",
  },
];

export default function MultiCDN() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIntegrations = integrations.filter((integration) =>
    integration.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          MultiCDN - Configurações de Integração
        </h1>
        <p className="text-muted-foreground mt-1">
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
          className="pl-10"
        />
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntegrations.map((integration) => (
          <Card 
            key={integration.id} 
            className="relative overflow-hidden transition-all hover:shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${integration.iconBg}`}>
                  {integration.icon}
                </div>
                <Badge 
                  variant={integration.isPro ? "default" : "secondary"}
                  className={integration.isPro ? "bg-primary" : "bg-green-500 hover:bg-green-600 text-white"}
                >
                  {integration.isPro ? "PRO" : "Free"}
                </Badge>
              </div>
              <CardTitle className="text-lg mt-3">{integration.name}</CardTitle>
              <CardDescription className="text-sm">
                {integration.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {integration.isConnected ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Status: Conectado
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Configurar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive">
                      Desconectar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    Desbloqueie com PRO Plan
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Upgrade to Pro
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
