import { useState } from "react";
import { cn } from "@/lib/utils";

interface DualButtonProps {
  label?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  className?: string;
}

export default function DualButton({
  label = "Button",
  onLeftClick,
  onRightClick,
  className,
}: DualButtonProps) {
  const [activeButton, setActiveButton] = useState<"left" | "right">("left");

  const handleLeftClick = () => {
    setActiveButton("left");
    onLeftClick?.();
  };

  const handleRightClick = () => {
    setActiveButton("right");
    onRightClick?.();
  };

  return (
    <div
      className={cn(
        "relative inline-flex rounded-lg border border-input bg-background shadow-sm",
        className
      )}
    >
      {/* Left button */}
      <button
        onClick={handleLeftClick}
        className={cn(
          "relative px-4 py-2 text-sm font-medium transition-colors rounded-l-lg border-r border-input flex-1",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          activeButton === "left"
            ? "bg-gray-200 text-foreground hover:bg-gray-300"
            : "bg-background text-foreground"
        )}
      >
        <span className="opacity-0">{label}</span>
        {activeButton === "left" && (
          <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-gray-600 rounded-full"></div>
        )}
      </button>

      {/* Right button */}
      <button
        onClick={handleRightClick}
        className={cn(
          "relative px-4 py-2 text-sm font-medium transition-colors rounded-r-lg flex-1",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          activeButton === "right"
            ? "bg-gray-200 text-foreground hover:bg-gray-300"
            : "bg-background text-foreground"
        )}
      >
        <span className="opacity-0">{label}</span>
        {activeButton === "right" && (
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gray-600 rounded-full"></div>
        )}
      </button>

      {/* Centered label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-sm font-medium text-current">{label}</span>
      </div>
    </div>
  );
}
