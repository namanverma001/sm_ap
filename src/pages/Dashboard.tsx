import { useState } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Outlet } from "react-router-dom";

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-cms-background stars-bg">
      <AdminNavbar
        onMenuToggle={toggleSidebar}
        isMenuOpen={sidebarOpen}
        isLoggedIn={true}
        onLogout={onLogout}
      />
      
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />
      
      <main className="pt-16">
        <div className="min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};