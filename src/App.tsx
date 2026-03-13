import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import MarketDetail from "./pages/MarketDetail";
import Ranking from "./pages/Ranking";
import Missions from "./pages/Missions";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/mercado/:id" element={<MarketDetail />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/missoes" element={<Missions />} />
            <Route path="/carteira" element={<Portfolio />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/como-funciona" element={<HowItWorks />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
