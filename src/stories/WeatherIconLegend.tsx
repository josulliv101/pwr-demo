import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { weatherIconMap2 } from "./WeatherIcon";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const weatherDetails = {
  cold: {
    description: "Very cold temperatures, typically below 32°F (0°C)",
    characteristics: "Freezing conditions, potential for ice and snow",
    clothing: "Heavy winter clothing, layers, warm accessories",
  },
  brisk: {
    description: "Cool and refreshing temperatures, around 40-50°F (4-10°C)",
    characteristics: "Crisp air, comfortable for outdoor activities",
    clothing: "Light jacket or sweater recommended",
  },
  cool: {
    description: "Pleasantly cool weather, around 50-65°F (10-18°C)",
    characteristics: "Comfortable temperature, low humidity",
    clothing: "Light layers, long sleeves recommended",
  },
  mild: {
    description: "Comfortable moderate temperatures, around 65-75°F (18-24°C)",
    characteristics: "Perfect weather for most outdoor activities",
    clothing: "Light clothing, t-shirts and shorts suitable",
  },
  warm: {
    description: "Warm and pleasant temperatures, around 75-85°F (24-29°C)",
    characteristics: "Great for outdoor activities, swimming weather",
    clothing: "Light, breathable clothing recommended",
  },
  hot: {
    description: "Hot temperatures, around 85-95°F (29-35°C)",
    characteristics: "High temperatures, stay hydrated",
    clothing: "Minimal, light-colored, breathable clothing",
  },
  veryhot: {
    description: "Very hot temperatures, above 95°F (35°C)",
    characteristics: "Extreme heat, potential health risks",
    clothing: "Sun protection essential, seek shade frequently",
  },
} as const;

export default function WeatherLegend({
  children,
  className,
  showSunnyIcon,
}: PropsWithChildren<{ showSunnyIcon?: boolean; className?: string }>) {
  return (
    <div className={cn("bg-white_", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-xs font-normal  px-2 my-1 text-gray-800">
          Select a Comfort Zone
        </h2>
        <Button
          size={"sm"}
          variant={"ghost"}
          className="text-xs text-gray-500 py-0 bg-gray-200/50 w-fit h-6 font-normal"
        >
          {/* <GraduationCapIcon className="w-4 h-4 text-gray-500 stroke-2" /> */}
          More details
        </Button>
      </div>

      <TooltipProvider>
        <div className="shadow-sm__ border-0 px-0 rounded-lg grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-0 max-w-6xl mx-auto">
          {Object.entries(weatherIconMap2).map(
            ([key, { label, component: IconComponent }]) => {
              const details =
                weatherDetails[key as keyof typeof weatherDetails];

              return (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center  cursor-pointer hover:bg-accent _hover:scale-105 transition-transform duration-200">
                      <div className="flex flex-row items-center justify-center w-12 h-8 bg-gray-50_ rounded-lg border-none border-gray-200   transition-all duration-200">
                        <IconComponent
                          className={
                            showSunnyIcon ? "" : "w-6 h-6 relative top-1.5"
                          }
                        />
                        {showSunnyIcon && <IconComponent dot />}
                      </div>
                      <span className="text-[11px] font-medium text-gray-700 text-center break-words whitespace-break-spaces py-1">
                        {label}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="  p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{label} Weather</h3>
                      <p className="text-xs text-gray-300">
                        {details.description}
                      </p>
                      <div className="space-y-1">
                        <p className="text-xs">
                          <span className="font-medium">Characteristics:</span>{" "}
                          {details.characteristics}
                        </p>
                        <p className="text-xs">
                          <span className="font-medium">Clothing:</span>{" "}
                          {details.clothing}
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            }
          )}
          {children}
        </div>
      </TooltipProvider>
    </div>
  );
}
