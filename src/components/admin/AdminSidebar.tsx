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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/portal/dashboard" },
  { icon: Users, label: "Users", path: "/admin/portal/users" },
  {
    icon: ArrowDownToLine,
    label: "Withdrawal Requests",
    path: "/admin/portal/withdrawals",
  },
  {
    icon: ArrowUpFromLine,
    label: "Deposit Requests",
    path: "/admin/portal/deposits",
  },
  { icon: Send, label: "Send Requests", path: "/admin/portal/sends" },
  { icon: History, label: "Transactions", path: "/admin/portal/transactions" },
  { icon: Building2, label: "Banks", path: "/admin/portal/banks" },
  { icon: Mail, label: "Email", path: "/admin/portal/email" },
  { icon: Settings, label: "Settings", path: "/admin/portal/settings" },
];

const AdminSidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    // TODO: Implement logout logic
    window.location.href = "/admin";
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/admin/portal/dashboard" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">Cashora</span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
            Admin
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <Link to={item.path}>
                <SidebarMenuButton
                  className={cn(
                    "w-full",
                    location.pathname === item.path &&
                      "bg-primary/10 text-primary"
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="w-full text-destructive hover:text-destructive"
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