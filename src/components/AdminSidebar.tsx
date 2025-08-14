import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Grid3x3,
  Upload,
  Film,
  Tv,
  Play,
  Eye,
  Folder,
  Settings,
  Tags,
  Clock,
  FileVideo,
  List,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Monitor,
  Crown,
  Heart,
  Network
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  description?: string;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    id: "content",
    label: "CONTENT MANAGEMENT",
    icon: Grid3x3,
    children: [
      { id: "browse", label: "Browse Content", icon: Grid3x3, path: "/browse", description: "View all content" },
      { id: "upload-content", label: "Upload Content", icon: Upload, path: "/upload-content", description: "Add new content (movie, webseries, episode)" },
      { id: "upload-trailer", label: "Upload Trailer", icon: FileVideo, path: "/upload-trailer", description: "Add new trailers" },
      { id: "view-movies", label: "View Movies", icon: Film, path: "/all-movies", description: "Manage movies" },
      { id: "view-series", label: "View Series", icon: Play, path: "/view-series", description: "Manage TV series" },
      { id: "view-collections", label: "View Collections", icon: Folder, path: "/all-collections", description: "Manage collections" },
    ]
  },
  {
    id: "settings",
    label: "SETTINGS",
    icon: Settings,
    children: [
      { id: "categories", label: "Categories", icon: Tags, path: "/categories", description: "Manage content categories" },
      { id: "watch-age", label: "Watch Age", icon: Clock, path: "/watch-age", description: "Age restrictions and ratings" },
      { id: "genres", label: "Genres", icon: List, path: "/genres", description: "Content genres and themes" },
      { id: "content-types", label: "Content Types", icon: FileVideo, path: "/content-types", description: "Types of media content" },
      { id: "api-test", label: "API Test", icon: Monitor, path: "/api-test", description: "Test API connections" }
    ]
  }
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["content", "settings"]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-cms-shadow/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-cms-sidebar-bg border-r border-cms-border
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        overflow-y-auto
      `}>
        <div className="p-4">
          {/* Collapse Button */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-cms-text-primary font-medium text-sm">Admin Panel</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-cms-text-secondary hover:bg-cms-sidebar-hover hover:text-cms-text-primary"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="ml-2 text-xs">Collapse</span>
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {/* Glowbal Network Button */}
            <Button
              variant="outline"
              className="w-full h-12 mb-4 border border-[#364253] rounded-lg bg-transparent text-gray-400 hover:bg-[#1c2632] hover:text-gray-300 transition-colors"
              onClick={() => { }}
            >
              Glowbal Network
            </Button>

            {sidebarItems.map((item) => (
              <div key={item.id}>
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(item.id)}
                  className="w-full flex items-center justify-between p-2 text-xs font-semibold text-cms-text-muted uppercase tracking-wider hover:text-cms-text-secondary transition-colors"
                >
                  <span>{item.label}</span>
                  {expandedGroups.includes(item.id) ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                </button>

                {/* Group Items */}
                {expandedGroups.includes(item.id) && item.children && (
                  <div className="space-y-1 mt-2 mb-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        to={child.path!}
                        onClick={onClose}
                        className={`
                          cms-sidebar-item text-sm
                          ${isActive(child.path!) ? 'active' : ''}
                        `}
                      >
                        <child.icon className="w-4 h-4" />
                        <div className="flex flex-col">
                          <span>{child.label}</span>
                          {child.description && (
                            <span className="text-xs text-cms-text-muted">{child.description}</span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};