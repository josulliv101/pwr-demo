import { Button } from "@/components/ui/button";
import { Home, Search, User, Settings } from "lucide-react";

export default function ScrollNavbar() {
  return (
    <nav className="sticky top-0 mt-[-41px] w-full bg-card/95 backdrop-blur-sm border-b border-border transition-all duration-300 ease-out z-50">
      <div className="max-w-full mx-auto px-6 py-1">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <span className="font-bold text-sm text-muted-foreground">N</span>
            </div>
            <span className="font-semibold text-foreground">Navbar</span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
