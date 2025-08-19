import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { weatherDetails } from "./WeatherIconLegend";
import { weatherIconMap2 } from "./WeatherIcon";

const temperatureColors = {
  cold: "bg-blue-600",
  brisk: "bg-blue-400",
  cool: "bg-green-400",
  mild: "bg-yellow-400",
  warm: "bg-orange-400",
  hot: "bg-red-400",
  veryhot: "bg-red-600",
} as const;

const temperatureRanges = {
  cold: "Below 32°F (0°C)",
  brisk: "40-50°F (4-10°C)",
  cool: "50-65°F (10-18°C)",
  mild: "65-75°F (18-24°C)",
  warm: "75-85°F (24-29°C)",
  hot: "85-95°F (29-35°C)",
  veryhot: "Above 95°F (35°C)",
} as const;

export function WeatherLegendDetails() {
  return (
    <Card className="w-full max-w-md mx-auto py-0 rounded-lg bg-none shadow-none border-0">
      {/* <CardHeader className="text-center pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">
          Temperature Guide
        </CardTitle>
      </CardHeader> */}
      <CardContent className="space-y-0 px-0 py-0 rounded-lg bg-none border-0">
        {Object.entries(weatherDetails).map(([key, details]) => {
          const Icon = weatherIconMap2[key as keyof typeof weatherIconMap2];
          const tempKey = key as keyof typeof temperatureColors;
          return (
            <div
              key={key}
              className="flex items-center gap-3 p-2 rounded bg-none hover:bg-accent/50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium flex items-center gap-2 text-sm text-foreground capitalize">
                    <Icon.component className="w-5 h-5" />{" "}
                    {key === "veryhot" ? "Very Hot" : key}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="text-xs px-1.5 py-0.5 bg-blue-100/50"
                  >
                    {temperatureRanges[tempKey]}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {details.description}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
