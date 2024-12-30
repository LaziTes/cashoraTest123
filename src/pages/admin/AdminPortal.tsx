import { Routes, Route, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";
import UsersManagement from "@/components/admin/UsersManagement";
import WithdrawalRequests from "@/components/admin/WithdrawalRequests";
import DepositRequests from "@/components/admin/DepositRequests";
import SendRequests from "@/components/admin/SendRequests";
import Transactions from "@/components/admin/Transactions";
import Banks from "@/components/admin/Banks";
import EmailManagement from "@/components/admin/EmailManagement";
import Settings from "@/components/admin/Settings";
import { useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import AdminProfile from "@/components/admin/profile/AdminProfile";

const AdminPortal = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (window.location.pathname === "/admin/portal") {
      navigate("/admin/portal/dashboard");
    }
  }, [navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#0A0D1B]">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-navy border-none">
              <div className="h-full overflow-y-auto">
                <AdminSidebar />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="hidden md:block">
            <AdminSidebar />
          </div>
        )}
        <main className="flex-1 p-6 overflow-auto md:ml-64">
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/withdrawals" element={<WithdrawalRequests />} />
            <Route path="/deposits" element={<DepositRequests />} />
            <Route path="/sends" element={<SendRequests />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/banks" element={<Banks />} />
            <Route path="/email" element={<EmailManagement />} />
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminPortal;