import { Button } from "@/components/ui/button";
import { MapIcon, BuildingIcon, SunIcon, AwardIcon } from "lucide-react";

export default function ScrollNavbar() {
  return (
    <nav className="sticky top-0 mt-[-41px] w-full bg-card/95 backdrop-blur-sm border-b border-border transition-all duration-300 ease-out z-50">
      <div className="max-w-full mx-auto px-0 md:px-6 py-1">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="hidden _flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <span className="font-bold text-sm text-muted-foreground">N</span>
            </div>
            <span className="hidden font-semibold text-foreground">Navbar</span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center ">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center sm:space-x-2"
            >
              <MapIcon className="w-4 h-4" />
              <span className="hidden_ sm:inline">Map</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center sm:space-x-2"
            >
              <BuildingIcon className="w-4 h-4" />
              <span className="hidden_ sm:inline">Compare </span>
              <span className="hidden sm:inline">Cities</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center sm:space-x-2"
            >
              <AwardIcon className="w-4 h-4" />
              <span className="hidden_ sm:inline">Rankings</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex_ hidden items-center sm:space-x-2"
            >
              <SunIcon className="w-4 h-4" />
              <span className="hidden_ sm:inline">Comfort Zones</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
