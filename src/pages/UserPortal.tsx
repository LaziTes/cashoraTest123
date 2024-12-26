import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Upload, Download, SendHorizontal, MessageSquare } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarProvider 
} from "@/components/ui/sidebar";
import Dashboard from "@/components/portal/Dashboard";
import Deposit from "@/components/portal/Deposit";
import Withdraw from "@/components/portal/Withdraw";
import Send from "@/components/portal/Send";
import Support from "@/components/portal/Support";
import { useState } from "react";

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveTab(item.id)}
                      className={activeTab === item.id ? "bg-accent" : ""}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-6">
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