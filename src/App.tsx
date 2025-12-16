import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import Dashboard from "./pages/Dashboard";
import Auditoria from "./pages/Auditoria";
import Temperatura from "./pages/Temperatura";
import Aderencia from "./pages/Aderencia";
import Objecoes from "./pages/Objecoes";
import Segmentacao from "./pages/Segmentacao";
import Configuracoes from "./pages/Configuracoes";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex flex-1 flex-col">
              <TopBar />
              <main className="flex-1 p-4 md:p-6 bg-background">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/auditoria" element={<Auditoria />} />
                  <Route path="/temperatura" element={<Temperatura />} />
                  <Route path="/aderencia" element={<Aderencia />} />
                  <Route path="/objecoes" element={<Objecoes />} />
                  <Route path="/segmentacao" element={<Segmentacao />} />
                  <Route path="/configuracoes" element={<Configuracoes />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
