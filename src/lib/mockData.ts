export type Temperature = "cold" | "warm" | "hot";
export type ConversationChannel = "whatsapp" | "voice";
export type AdherenceLevel = "high" | "medium" | "low";

export interface Lead {
  id: string;
  name: string;
  contact: string;
  channel: ConversationChannel;
  campaign: string;
  temperature: Temperature;
  icpFitScore: number;
  potentialValue: number;
  funnelStage: string;
  nextStep: string;
  owner: string;
  lastInteraction: string;
}

export interface Objection {
  type: string;
  timestamp: string;
  text: string;
  resolved: boolean;
}

export interface PainPoint {
  category: string;
  text: string;
  impact: "high" | "medium" | "low";
}

export interface Conversation {
  id: string;
  leadId: string;
  leadName: string;
  channel: ConversationChannel;
  date: string;
  representative: string;
  adherenceScore: number;
  temperature: Temperature;
  objections: Objection[];
  painPoints: PainPoint[];
  desires: string[];
  status: string;
  transcript: TranscriptSegment[];
  summary: string;
  nextSteps: string[];
  conversionProbability: number;
}

export interface TranscriptSegment {
  speaker: "rep" | "lead";
  text: string;
  timestamp: string;
  tags: ("adherence" | "objection" | "cta" | "trigger" | "pain" | "desire")[];
}

export interface KPI {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "stable";
}

export const mockLeads: Lead[] = [
  {
    id: "L001",
    name: "Maria Silva",
    contact: "+55 11 98765-4321",
    channel: "whatsapp",
    campaign: "Inbound Q4",
    temperature: "hot",
    icpFitScore: 92,
    potentialValue: 45000,
    funnelStage: "Proposta",
    nextStep: "Agendar call de fechamento",
    owner: "Carlos Santos",
    lastInteraction: "2024-01-15T14:30:00",
  },
  {
    id: "L002",
    name: "João Oliveira",
    contact: "+55 21 99876-5432",
    channel: "voice",
    campaign: "Outbound Enterprise",
    temperature: "warm",
    icpFitScore: 78,
    potentialValue: 120000,
    funnelStage: "Descoberta",
    nextStep: "Enviar case study",
    owner: "Ana Costa",
    lastInteraction: "2024-01-14T10:15:00",
  },
  {
    id: "L003",
    name: "Patricia Mendes",
    contact: "+55 11 97654-3210",
    channel: "whatsapp",
    campaign: "Inbound Q4",
    temperature: "cold",
    icpFitScore: 45,
    potentialValue: 15000,
    funnelStage: "Qualificação",
    nextStep: "Follow-up em 7 dias",
    owner: "Carlos Santos",
    lastInteraction: "2024-01-13T16:45:00",
  },
  {
    id: "L004",
    name: "Ricardo Almeida",
    contact: "+55 11 96543-2109",
    channel: "whatsapp",
    campaign: "Webinar Jan",
    temperature: "hot",
    icpFitScore: 88,
    potentialValue: 67000,
    funnelStage: "Negociação",
    nextStep: "Enviar proposta customizada",
    owner: "Ana Costa",
    lastInteraction: "2024-01-15T11:20:00",
  },
  {
    id: "L005",
    name: "Fernanda Costa",
    contact: "+55 21 95432-1098",
    channel: "voice",
    campaign: "Outbound SMB",
    temperature: "warm",
    icpFitScore: 72,
    potentialValue: 28000,
    funnelStage: "Apresentação",
    nextStep: "Agendar demo",
    owner: "Carlos Santos",
    lastInteraction: "2024-01-15T09:30:00",
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "C001",
    leadId: "L001",
    leadName: "Maria Silva",
    channel: "whatsapp",
    date: "2024-01-15T14:30:00",
    representative: "Carlos Santos",
    adherenceScore: 87,
    temperature: "hot",
    objections: [
      {
        type: "Preço",
        timestamp: "14:35",
        text: "O investimento parece alto para o momento",
        resolved: true,
      },
    ],
    painPoints: [
      {
        category: "Produtividade",
        text: "Perdemos muito tempo com processos manuais",
        impact: "high",
      },
      {
        category: "Previsibilidade",
        text: "Não conseguimos prever receita com precisão",
        impact: "high",
      },
    ],
    desires: ["Aumentar eficiência", "Reduzir custos operacionais", "Melhorar previsibilidade"],
    status: "Proposta",
    transcript: [
      {
        speaker: "rep",
        text: "Olá Maria! Tudo bem? Aqui é o Carlos da SalesAI. Como vai?",
        timestamp: "14:30",
        tags: ["adherence"],
      },
      {
        speaker: "lead",
        text: "Oi Carlos, tudo bem sim! Estava esperando seu contato.",
        timestamp: "14:31",
        tags: [],
      },
      {
        speaker: "rep",
        text: "Que ótimo! Então, pelo que conversamos antes, entendi que vocês estão com dificuldade em prever a receita do time comercial. É isso mesmo?",
        timestamp: "14:31",
        tags: ["adherence", "pain"],
      },
      {
        speaker: "lead",
        text: "Exatamente. Perdemos muito tempo com processos manuais e no final do mês é sempre uma surpresa se batemos a meta ou não.",
        timestamp: "14:32",
        tags: ["pain"],
      },
      {
        speaker: "rep",
        text: "Entendo perfeitamente. E se eu te mostrar como nossos clientes conseguiram aumentar a previsibilidade em 25% nos primeiros 3 meses?",
        timestamp: "14:33",
        tags: ["adherence", "trigger", "cta"],
      },
      {
        speaker: "lead",
        text: "Seria ótimo! Mas imagino que o investimento seja alto...",
        timestamp: "14:35",
        tags: ["objection"],
      },
      {
        speaker: "rep",
        text: "Vamos olhar por outro ângulo: quanto vocês perdem hoje em oportunidades que esfriam por falta de follow-up no momento certo?",
        timestamp: "14:36",
        tags: ["adherence", "trigger"],
      },
      {
        speaker: "lead",
        text: "Bom ponto. Realmente perdemos bastante coisa assim.",
        timestamp: "14:37",
        tags: ["desire"],
      },
      {
        speaker: "rep",
        text: "Que tal agendarmos uma call amanhã para eu te mostrar exatamente como funciona na prática?",
        timestamp: "14:38",
        tags: ["adherence", "cta"],
      },
      {
        speaker: "lead",
        text: "Perfeito! Amanhã às 15h funciona pra mim.",
        timestamp: "14:39",
        tags: [],
      },
    ],
    summary:
      "Conversa altamente produtiva com lead qualificado. Maria demonstrou dor clara relacionada a previsibilidade de receita e processos manuais. Objeção de preço foi superada ao reposicionar valor. Lead aceitou próximo passo.",
    nextSteps: [
      "Preparar demo personalizada focada em previsibilidade",
      "Enviar case study do segmento de serviços",
      "Confirmar call 1h antes",
    ],
    conversionProbability: 78,
  },
  {
    id: "C002",
    leadId: "L002",
    leadName: "João Oliveira",
    channel: "voice",
    date: "2024-01-14T10:15:00",
    representative: "Ana Costa",
    adherenceScore: 65,
    temperature: "warm",
    objections: [
      {
        type: "Timing",
        timestamp: "10:25",
        text: "Talvez seja melhor avaliar isso no próximo trimestre",
        resolved: false,
      },
      {
        type: "Autoridade",
        timestamp: "10:28",
        text: "Preciso alinhar com o CFO antes",
        resolved: false,
      },
    ],
    painPoints: [
      {
        category: "Escala",
        text: "Crescemos 200% e o processo comercial não acompanhou",
        impact: "high",
      },
    ],
    desires: ["Escalar vendas", "Profissionalizar processo"],
    status: "Descoberta",
    transcript: [
      {
        speaker: "rep",
        text: "Bom dia João, aqui é a Ana da SalesAI.",
        timestamp: "10:15",
        tags: ["adherence"],
      },
      {
        speaker: "lead",
        text: "Oi Ana, pode falar.",
        timestamp: "10:16",
        tags: [],
      },
      {
        speaker: "rep",
        text: "Vi aqui que vocês cresceram bastante no último ano. Como está o desafio de escalar o comercial?",
        timestamp: "10:16",
        tags: ["pain"],
      },
      {
        speaker: "lead",
        text: "É o nosso maior problema. Crescemos 200% mas o processo de vendas continua o mesmo.",
        timestamp: "10:18",
        tags: ["pain"],
      },
      {
        speaker: "rep",
        text: "Talvez seja melhor avaliar isso no próximo trimestre mesmo.",
        timestamp: "10:25",
        tags: ["objection"],
      },
      {
        speaker: "lead",
        text: "Sim, e preciso alinhar com o CFO antes de qualquer decisão.",
        timestamp: "10:28",
        tags: ["objection"],
      },
    ],
    summary:
      "Lead demonstrou dor clara mas apresentou objeções de timing e autoridade. Necessário trabalhar urgência e envolver outros stakeholders.",
    nextSteps: ["Enviar case study", "Propor reunião com CFO", "Follow-up em 3 dias"],
    conversionProbability: 45,
  },
  {
    id: "C003",
    leadId: "L004",
    leadName: "Ricardo Almeida",
    channel: "whatsapp",
    date: "2024-01-15T11:20:00",
    representative: "Ana Costa",
    adherenceScore: 92,
    temperature: "hot",
    objections: [],
    painPoints: [
      {
        category: "Gestão",
        text: "Não consigo acompanhar performance do time em tempo real",
        impact: "high",
      },
      {
        category: "Coaching",
        text: "Demoro semanas para identificar gaps dos vendedores",
        impact: "medium",
      },
    ],
    desires: ["Dashboard em tempo real", "Coaching orientado por dados"],
    status: "Negociação",
    transcript: [
      {
        speaker: "rep",
        text: "Oi Ricardo! Preparei aquela proposta que conversamos.",
        timestamp: "11:20",
        tags: ["adherence", "cta"],
      },
      {
        speaker: "lead",
        text: "Excelente! Estou ansioso para ver.",
        timestamp: "11:21",
        tags: ["desire"],
      },
    ],
    summary:
      "Conversa excelente com alta aderência ao script. Lead muito engajado e pronto para fechar. Dores bem mapeadas e alinhadas com solução.",
    nextSteps: ["Enviar proposta customizada", "Agendar kick-off", "Preparar contrato"],
    conversionProbability: 92,
  },
  {
    id: "C004",
    leadId: "L005",
    leadName: "Fernanda Costa",
    channel: "voice",
    date: "2024-01-15T09:30:00",
    representative: "Carlos Santos",
    adherenceScore: 74,
    temperature: "warm",
    objections: [
      {
        type: "Preço",
        timestamp: "09:45",
        text: "Preciso comparar com outras soluções",
        resolved: false,
      },
    ],
    painPoints: [
      {
        category: "Integração",
        text: "Temos muitas ferramentas desconectadas",
        impact: "high",
      },
    ],
    desires: ["Centralizar dados", "Automatizar relatórios"],
    status: "Apresentação",
    transcript: [],
    summary: "Lead interessado mas precisa de mais tempo para avaliar. Demonstrou interesse em centralização de dados.",
    nextSteps: ["Enviar comparativo", "Agendar demo técnica"],
    conversionProbability: 55,
  },
  {
    id: "C005",
    leadId: "L003",
    leadName: "Patricia Mendes",
    channel: "whatsapp",
    date: "2024-01-13T16:45:00",
    representative: "Carlos Santos",
    adherenceScore: 58,
    temperature: "cold",
    objections: [
      {
        type: "Timing",
        timestamp: "16:55",
        text: "Estamos em reestruturação interna",
        resolved: false,
      },
    ],
    painPoints: [],
    desires: ["Melhorar gestão comercial"],
    status: "Qualificação",
    transcript: [],
    summary: "Lead em momento de reestruturação. Retomar contato em 30 dias.",
    nextSteps: ["Follow-up em 30 dias", "Enviar conteúdo educativo"],
    conversionProbability: 20,
  },
  {
    id: "C006",
    leadId: "L006",
    leadName: "Lucas Pereira",
    channel: "whatsapp",
    date: "2024-01-14T15:00:00",
    representative: "Ana Costa",
    adherenceScore: 88,
    temperature: "hot",
    objections: [],
    painPoints: [
      {
        category: "Visibilidade",
        text: "Não sei o que meu time está fazendo",
        impact: "high",
      },
    ],
    desires: ["Ter controle total", "Métricas claras"],
    status: "Proposta",
    transcript: [],
    summary: "Lead altamente qualificado, pronto para receber proposta comercial.",
    nextSteps: ["Enviar proposta", "Agendar call de fechamento"],
    conversionProbability: 85,
  },
  {
    id: "C007",
    leadId: "L007",
    leadName: "Camila Rodrigues",
    channel: "voice",
    date: "2024-01-12T11:00:00",
    representative: "Carlos Santos",
    adherenceScore: 71,
    temperature: "warm",
    objections: [
      {
        type: "Autoridade",
        timestamp: "11:20",
        text: "Preciso validar com meu diretor",
        resolved: false,
      },
    ],
    painPoints: [
      {
        category: "Processo",
        text: "Nosso funil é muito longo",
        impact: "medium",
      },
    ],
    desires: ["Acelerar ciclo de vendas"],
    status: "Descoberta",
    transcript: [],
    summary: "Lead com dor clara mas precisa de aprovação interna.",
    nextSteps: ["Preparar material para diretor", "Follow-up em 5 dias"],
    conversionProbability: 40,
  },
  {
    id: "C008",
    leadId: "L008",
    leadName: "Bruno Martins",
    channel: "whatsapp",
    date: "2024-01-11T14:30:00",
    representative: "Ana Costa",
    adherenceScore: 95,
    temperature: "hot",
    objections: [],
    painPoints: [
      {
        category: "Escala",
        text: "Vamos triplicar o time e preciso de processo",
        impact: "high",
      },
    ],
    desires: ["Escalar rapidamente", "Onboarding eficiente"],
    status: "Negociação",
    transcript: [],
    summary: "Lead em expansão acelerada. Alta urgência e fit perfeito com solução.",
    nextSteps: ["Finalizar contrato", "Agendar kickoff"],
    conversionProbability: 95,
  },
  {
    id: "C009",
    leadId: "L009",
    leadName: "Amanda Souza",
    channel: "voice",
    date: "2024-01-10T10:00:00",
    representative: "Carlos Santos",
    adherenceScore: 62,
    temperature: "cold",
    objections: [
      {
        type: "Fit",
        timestamp: "10:15",
        text: "Não sei se faz sentido para nosso tamanho",
        resolved: false,
      },
    ],
    painPoints: [],
    desires: ["Entender se vale a pena"],
    status: "Qualificação",
    transcript: [],
    summary: "Lead com dúvidas sobre fit. Necessário qualificar melhor.",
    nextSteps: ["Enviar cases de empresas similares", "Reagendar conversa"],
    conversionProbability: 25,
  },
  {
    id: "C010",
    leadId: "L010",
    leadName: "Thiago Lima",
    channel: "whatsapp",
    date: "2024-01-09T16:00:00",
    representative: "Ana Costa",
    adherenceScore: 83,
    temperature: "warm",
    objections: [
      {
        type: "Competição",
        timestamp: "16:20",
        text: "Já usamos outra ferramenta",
        resolved: true,
      },
    ],
    painPoints: [
      {
        category: "Funcionalidade",
        text: "Nossa ferramenta atual não tem IA",
        impact: "high",
      },
    ],
    desires: ["Migrar para solução com IA", "Ter insights automáticos"],
    status: "Apresentação",
    transcript: [],
    summary: "Lead insatisfeito com ferramenta atual. Oportunidade de migração.",
    nextSteps: ["Mostrar diferencial de IA", "Propor POC"],
    conversionProbability: 65,
  },
];

export const mockKPIs: KPI[] = [
  { label: "Taxa de Conversão", value: "23.5%", change: 12.3, trend: "up" },
  { label: "Tempo Médio de Resposta", value: "8min", change: -35.2, trend: "up" },
  { label: "Aderência a Script", value: "78%", change: 8.7, trend: "up" },
  { label: "Temperatura Média", value: "Morno", change: 5.1, trend: "up" },
];

export const mockObjections = [
  { type: "Preço", count: 45, resolved: 32, resolvedRate: 71 },
  { type: "Timing", count: 38, resolved: 19, resolvedRate: 50 },
  { type: "Autoridade", count: 28, resolved: 14, resolvedRate: 50 },
  { type: "Competição", count: 22, resolved: 18, resolvedRate: 82 },
  { type: "Fit", count: 15, resolved: 8, resolvedRate: 53 },
];

export const mockPainClusters = [
  {
    name: "Previsibilidade de Receita",
    count: 78,
    conversionImpact: 85,
    mentions: ["Não consigo prever receita", "Surpresas no fim do mês", "Falta visibilidade"],
  },
  {
    name: "Produtividade do Time",
    count: 65,
    conversionImpact: 72,
    mentions: ["Processos manuais", "Perda de tempo", "Retrabalho constante"],
  },
  {
    name: "Coaching Efetivo",
    count: 52,
    conversionImpact: 68,
    mentions: ["Demoro para identificar gaps", "Falta evidências", "Coaching genérico"],
  },
  {
    name: "Follow-up Inteligente",
    count: 48,
    conversionImpact: 79,
    mentions: ["Leads esfriam", "Esqueço de retornar", "Falta priorização"],
  },
];
