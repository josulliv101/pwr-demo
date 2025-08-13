import { weatherIconMap2, type WeatherKey } from "./WeatherIcon";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

type MonthPair = { start: WeatherKey; end: WeatherKey };

const DEFAULT_YEAR: MonthPair[] = [
  { start: "cold", end: "brisk" }, // Jan
  { start: "cold", end: "brisk" }, // Feb
  { start: "brisk", end: "cool" }, // Mar
  { start: "cool", end: "mild" }, // Apr
  { start: "mild", end: "warm" }, // May
  { start: "warm", end: "hot" }, // Jun
  { start: "hot", end: "veryhot" }, // Jul
  { start: "veryhot", end: "hot" }, // Aug
  { start: "warm", end: "mild" }, // Sep
  { start: "mild", end: "cool" }, // Oct
  { start: "cool", end: "brisk" }, // Nov
  { start: "brisk", end: "cold" }, // Dec
];

export type YearlyWeatherIconsProps = {
  months?: readonly string[];
  data?: MonthPair[];
  showLabels?: boolean;
  showSunnyDays?: boolean;
  compact?: boolean;
  cityLabel?: string;
  className?: string;
};

export function YearlyWeatherIcons({
  months = MONTHS as unknown as string[],
  data = DEFAULT_YEAR,
  showLabels = true,
  showSunnyDays,
  compact = false,
  cityLabel,
  className,
}: YearlyWeatherIconsProps = {}) {
  const safeMonths = months.slice(0, 12);
  const safeData = data.slice(0, 12);

  const rowClass = compact
    ? "min-w-max flex items-end gap-2 py-1"
    : "min-w-max flex items-end gap-2 py-2";
  const monthColClass = compact
    ? "flex flex-col items-center gap-1 w-full"
    : "flex flex-col items-center gap-1 w-full";
  const stackClass = compact
    ? "flex flex-col items-center gap-0 -space-y-1"
    : "flex flex-col items-center gap-0";
  const labelClass = compact
    ? "text-[10px] text-muted-foreground tabular-nums"
    : "text-xs text-muted-foreground tabular-nums";

  // Consistent icon box size per mode.
  const iconClassName = compact ? "w-4 h-4" : "w-6 h-6";

  // City label styling (left-aligned, slightly smaller in compact).
  const cityClass = compact
    ? "mb-1 text-xs font-medium text-foreground"
    : "mb-2 text-sm font-medium text-foreground";

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")}>
      {cityLabel && <div className={cityClass}>{cityLabel}</div>}

      <div className="w-full overflow-x-auto">
        <div
          role="list"
          aria-label="Yearly weather icons, two per month"
          className={rowClass}
        >
          {safeData.map((pair, idx) => {
            const monthLabel = safeMonths[idx] ?? `M${idx + 1}`;
            const StartIcon = weatherIconMap2[pair.start].component;
            const EndIcon = weatherIconMap2[pair.end].component;

            return (
              <div key={idx} role="listitem" className={monthColClass}>
                <div className={stackClass}>
                  <div
                    className="w-full"
                    role="img"
                    aria-label={`${monthLabel} start: ${
                      weatherIconMap2[pair.start].label
                    }`}
                    title={`${monthLabel} start: ${
                      weatherIconMap2[pair.start].label
                    }`}
                  >
                    <StartIcon
                      dot={showSunnyDays && idx % 2 === 0}
                      className={iconClassName}
                    />
                  </div>
                  <div
                    className="w-full"
                    role="img"
                    aria-label={`${monthLabel} end: ${
                      weatherIconMap2[pair.end].label
                    }`}
                    title={`${monthLabel} end: ${
                      weatherIconMap2[pair.end].label
                    }`}
                  >
                    <EndIcon className={iconClassName} />
                  </div>
                </div>
                {showLabels && <div className={labelClass}>{monthLabel}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
