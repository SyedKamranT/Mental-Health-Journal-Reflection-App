import { Link, useLocation } from "react-router";
import {
  Home,
  PenLine,
  History,
  Sparkles,
  MessageCircle,
  Settings,
  Layers,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "../ui/sidebar";

const mainNavigation = [
  {
    title: "Dashboard",
    href: "/app",
    icon: Home,
  },
  {
    title: "New Entry",
    href: "/app/journal/new",
    icon: PenLine,
  },
  {
    title: "History",
    href: "/app/history",
    icon: History,
  },
  {
    title: "Insights",
    href: "/app/insights",
    icon: Sparkles,
  },
  {
    title: "Prompts",
    href: "/app/prompts",
    icon: MessageCircle,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-6 py-5">
        <Link to="/app" className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-gradient-to-br from-[#B6CAEB] to-[#8AA2C8] flex items-center justify-center">
            <Layers className="size-4 text-black" />
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">Reflection</h2>
            <p className="text-xs text-sidebar-foreground/60">Your mental space</p>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === "/app/settings"}>
              <Link to="/app/settings">
                <Settings className="size-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
