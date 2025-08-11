import { useState } from "react";
import { Menu, X, LogIn, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminNavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const AdminNavbar = ({ 
  onMenuToggle, 
  isMenuOpen, 
  isLoggedIn = false,
  onLogin,
  onLogout 
}: AdminNavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cms-surface/95 backdrop-blur-sm border-b border-cms-border">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Left side - Logo and Menu */}
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="text-cms-text-primary hover:bg-cms-hover"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          )}
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cms-primary rounded-lg flex items-center justify-center">
              <LogIn className="w-5 h-5 text-cms-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-cms-text-primary">
              Content Management System
            </span>
          </div>
        </div>

        {/* Right side - User menu */}
        {isLoggedIn && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 text-cms-text-primary hover:bg-cms-hover"
              >
                <div className="w-8 h-8 bg-cms-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-cms-primary-foreground" />
                </div>
                <span className="hidden sm:block">Admin User</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-cms-surface border-cms-border">
              <DropdownMenuItem className="text-cms-text-primary hover:bg-cms-hover">
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-cms-text-primary hover:bg-cms-hover">
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-cms-border" />
              <DropdownMenuItem 
                onClick={onLogout}
                className="text-cms-error hover:bg-cms-hover"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};