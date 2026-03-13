import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import MarketDetail from "./pages/MarketDetail";
import Ranking from "./pages/Ranking";
import Missions from "./pages/Missions";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PendingApproval from "./pages/PendingApproval";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoutes = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // No longer require approval — all confirmed users get access

  return (
    <AppLayout />
  );
};

const AuthRoutes = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (user && profile?.status === 'approved') {
    return <Navigate to="/" replace />;
  }

  return null; // render the route's element
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public: Index visible to all */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Index />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/mercado/:id" element={<MarketDetail />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/missoes" element={<Missions />} />
              <Route path="/carteira" element={<Portfolio />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/como-funciona" element={<HowItWorks />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
