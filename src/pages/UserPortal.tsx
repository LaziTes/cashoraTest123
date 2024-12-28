import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Upload, 
  Download, 
  SendHorizontal, 
  MessageSquare, 
  UserRound, 
  LogOut,
  Search,
  MoreVertical
} from "lucide-react";
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
import { Input } from "@/components/ui/input";

const UserPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", title: "Dashboard", icon: LayoutDashboard },
    { id: "deposit", title: "Deposit", icon: Upload },
    { id: "withdraw", title: "Withdraw", icon: Download },
    { id: "send", title: "Send Money", icon: SendHorizontal },
    { id: "support", title: "Support", icon: MessageSquare },
  ];

  const handleLogout = () => {
    navigate("/signin");
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#0A0D1B]">
        <Sidebar className="border-r border-[#1A1F2C] bg-[#0A0D1B]">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-[#1A1F2C]">
              <div className="text-2xl font-bold text-brand-orange mb-6">CASHORA</div>
              <Button 
                variant="ghost" 
                className="w-full flex items-center gap-2 justify-start hover:bg-[#1A1F2C] mb-4"
                onClick={() => setActiveTab("profile")}
              >
                <UserRound className="h-5 w-5" />
                <span>John Doe</span>
              </Button>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 bg-[#1A1F2C] border-[#1A1F2C] focus:border-brand-blue"
                />
              </div>
            </div>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  {filteredMenuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center gap-2 hover:bg-[#1A1F2C] ${
                          activeTab === item.id ? "bg-[#1A1F2C] text-brand-orange" : ""
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="mt-auto border-t border-[#1A1F2C] p-4">
              <Button 
                variant="ghost" 
                className="w-full flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-[#1A1F2C]"
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