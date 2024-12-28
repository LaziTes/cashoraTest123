import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  History,
  Building2,
  Mail,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/portal/dashboard" },
  { icon: Building2, label: "Banks", path: "/admin/portal/banks" },
  { icon: Users, label: "Users", path: "/admin/portal/users" },
  { icon: ArrowDownToLine, label: "Deposit Requests", path: "/admin/portal/deposits" },
  { icon: Send, label: "Send Requests", path: "/admin/portal/sends" },
  { icon: ArrowUpFromLine, label: "Withdrawal Requests", path: "/admin/portal/withdrawals" },
  { icon: History, label: "Transaction", path: "/admin/portal/transactions" },
  { icon: Mail, label: "Email", path: "/admin/portal/email" },
];

const AdminSidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    window.location.href = "/admin";
  };

  return (
    <Sidebar className="border-r border-navy-light bg-navy">
      <SidebarHeader className="p-4 border-b border-navy-light">
        <Link to="/admin/portal/dashboard" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-brand-orange">Cashora</span>
          <span className="text-xs bg-navy-light text-foreground px-2 py-1 rounded">
            Admin
          </span>
        </Link>
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for..."
            className="pl-10 bg-navy-light border-navy-light"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <Link to={item.path}>
                <SidebarMenuButton
                  className={cn(
                    "w-full",
                    location.pathname === item.path
                      ? "bg-navy-light text-brand-orange"
                      : "text-muted-foreground hover:bg-navy-light hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-navy-light p-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-10 w-10 rounded-full bg-navy-light" />
          <div>
            <p className="font-medium">John Carter</p>
            <p className="text-sm text-muted-foreground">Account settings</p>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/admin/portal/settings">
              <SidebarMenuButton className="w-full text-muted-foreground hover:bg-navy-light hover:text-foreground">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="w-full text-red-500 hover:text-red-400 hover:bg-navy-light"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;