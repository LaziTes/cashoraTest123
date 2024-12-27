import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Upload, Download, SendHorizontal, MessageSquare, UserRound, LogOut } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarProvider,
  SidebarFooter
} from "@/components/ui/sidebar";
import Dashboard from "@/components/portal/Dashboard";
import Deposit from "@/components/portal/Deposit";
import Withdraw from "@/components/portal/Withdraw";
import Send from "@/components/portal/Send";
import Support from "@/components/portal/Support";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const UserPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", title: "Dashboard", icon: LayoutDashboard },
    { id: "deposit", title: "Deposit", icon: Upload },
    { id: "withdraw", title: "Withdraw", icon: Download },
    { id: "send", title: "Send Money", icon: SendHorizontal },
    { id: "support", title: "Support", icon: MessageSquare },
  ];

  const handleLogout = () => {
    // Add logout logic here
    navigate("/signin");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r bg-white">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <Button variant="ghost" className="w-full flex items-center gap-2 justify-start" onClick={() => setActiveTab("profile")}>
                <UserRound className="h-5 w-5" />
                <span>John Doe</span>
              </Button>
            </div>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center gap-2 ${activeTab === item.id ? "bg-accent" : ""}`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="mt-auto border-t p-4">
              <Button 
                variant="ghost" 
                className="w-full flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </SidebarFooter>
          </div>
        </Sidebar>

        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "deposit" && <Deposit />}
          {activeTab === "withdraw" && <Withdraw />}
          {activeTab === "send" && <Send />}
          {activeTab === "support" && <Support />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default UserPortal;