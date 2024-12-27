import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserPortal from "./pages/UserPortal";
import AdminSignIn from "./pages/admin/AdminSignIn";
import AdminPortal from "./pages/admin/AdminPortal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/portal" element={<UserPortal />} />
          <Route path="/admin" element={<AdminSignIn />} />
          <Route path="/admin/portal/*" element={<AdminPortal />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;