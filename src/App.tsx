
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import Overview from "./pages/dashboard/Overview";
import AnalyzeAI from "./pages/dashboard/AnalyzeAI";
import AirdropUpdate from "./pages/dashboard/AirdropUpdate";
import WalletTracker from "./pages/dashboard/WalletTracker";
import TokenAnalyzer from "./pages/dashboard/TokenAnalyzer";
import DexScanner from "./pages/dashboard/DexScanner";
import SavedProjects from "./pages/dashboard/SavedProjects";
import Settings from "./pages/dashboard/Settings";
import Referrals from "./pages/dashboard/Referrals";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LazyMotion features={domAnimation}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Navigate to="/dashboard/overview" />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="overview" element={<Overview />} />
              <Route path="analyze-ai" element={<AnalyzeAI />} />
              <Route path="airdrop-update" element={<AirdropUpdate />} />
              <Route path="wallet-tracker" element={<WalletTracker />} />
              <Route path="token-analyzer" element={<TokenAnalyzer />} />
              <Route path="dex-scanner" element={<DexScanner />} />
              <Route path="saved-projects" element={<SavedProjects />} />
              <Route path="settings" element={<Settings />} />
              <Route path="referrals" element={<Referrals />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LazyMotion>
  </QueryClientProvider>
);

export default App;
