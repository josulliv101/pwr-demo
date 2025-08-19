import { weatherIconMap2, type WeatherKey } from "./WeatherIcon";

const WeatherRating = {
  COLD: 0,
  BRISK: 1,
  COOL: 2,
  MILD: 3,
  WARM: 4,
  HOT: 5,
  VERYHOT: 6,
} as const;

// Type of the numeric values (0–6 only)
type WeatherDigit = (typeof WeatherRating)[keyof typeof WeatherRating];

// Utility type: build a tuple of N elements of type T
export type Tuple<
  T,
  N extends number,
  R extends unknown[] = []
> = R["length"] extends N ? R : Tuple<T, N, [...R, T]>;

// Weather array = exactly 24 digits
type WeatherArray = Tuple<WeatherDigit, 24>;

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

// const DEFAULT_YEAR: MonthPair[] = [
//   { start: "cold", end: "brisk" }, // Jan
//   { start: "cold", end: "brisk" }, // Feb
//   { start: "brisk", end: "cool" }, // Mar
//   { start: "cool", end: "mild" }, // Apr
//   { start: "mild", end: "warm" }, // May
//   { start: "warm", end: "hot" }, // Jun
//   { start: "hot", end: "veryhot" }, // Jul
//   { start: "veryhot", end: "hot" }, // Aug
//   { start: "warm", end: "mild" }, // Sep
//   { start: "mild", end: "cool" }, // Oct
//   { start: "cool", end: "brisk" }, // Nov
//   { start: "brisk", end: "cold" }, // Dec
// ];

const exampleData: WeatherArray = [
  // Jan
  0, 0,
  // Feb
  0, 1,
  // Mar
  1, 2,
  // Apr
  2, 3,
  // May
  3, 4,
  // Jun
  4, 5,
  // Jul
  5, 6,
  // Aug
  5, 4,
  // Sep
  4, 3,
  // Oct
  3, 2,
  // Nov
  2, 1,
  // Dec
  1, 0,
];

const exampleSunnyDaysByPeriod: Tuple<number, 24> = [
  // Jan
  2, 3,
  // Feb
  3, 4,
  // Mar
  4, 5,
  // Apr
  5, 6,
  // May
  6, 7,
  // Jun
  8, 9,
  // Jul
  10, 11,
  // Aug
  10, 9,
  // Sep
  8, 7,
  // Oct
  6, 5,
  // Nov
  4, 3,
  // Dec
  3, 2,
];

export type YearlyWeatherIconsProps = {
  months?: readonly string[];
  data?: MonthPair[];
  showLabels?: boolean;
  showSunnyDays?: boolean;
  compact?: boolean;
  cityLabel?: string;
  className?: string;
  ratings?: WeatherArray;
  sunnyDaysByPeriod?: Tuple<number, 24>;
};

const SUNNY_DAY_THRESHOLD = 8; // Minimum sunny days to show a dot
export function YearlyWeatherIcons({
  months = MONTHS as unknown as string[],
  // data = DEFAULT_YEAR,
  showLabels = true,
  showSunnyDays,
  compact = false,
  ratings = exampleData,
  sunnyDaysByPeriod = exampleSunnyDaysByPeriod,
  cityLabel,
  className,
}: YearlyWeatherIconsProps = {}) {
  console.log(ratings, "ratings");
  const safeMonths = months.slice(0, 12);
  // const safeData = data.slice(0, 12);

  const rowClass = compact
    ? "min-w-max flex items-end gap-0 py-1"
    : "min-w-max flex items-end gap-0 py-2";
  const monthColClass = compact
    ? "flex flex-col items-center gap-0 w-full even:bg-white_ border-r last:border-r-0 rounded-sm"
    : "flex flex-col items-center gap-0 w-full even:bg-white_ border-r last:border-r-0 rounded-sm";
  const stackClass = compact
    ? "flex flex-col items-center gap-0 -space-y-1 "
    : "flex flex-col items-center gap-0  ";
  const labelClass = compact
    ? "text-[10px] text-muted-foreground tabular-nums"
    : "text-xs text-muted-foreground tabular-nums";

  // Consistent icon box size per mode.
  const iconClassName = compact ? "w-4 h-4" : "w-5 h-5";

  // City label styling (left-aligned, slightly smaller in compact).
  const cityClass = compact
    ? "mb-0 text-xs font-medium text-foreground px-2"
    : "mb-0 text-sm font-medium text-foreground px-2";

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")}>
      {cityLabel && <div className={cityClass}>{cityLabel}</div>}

      <div className="w-full overflow-x-auto">
        <div
          role="list"
          aria-label="Yearly weather icons, two per month"
          className={rowClass}
        >
          {Array.from({ length: 12 }).map((_, monthIdx) => {
            const monthLabel = safeMonths[monthIdx] ?? `M${monthIdx + 1}`;

            // Get ratings for this month → 2 periods per month
            const startRating = ratings[monthIdx * 2];
            const endRating = ratings[monthIdx * 2 + 1];

            // Map ratings (0–6) back to WeatherKey strings
            const startKey = Object.keys(weatherIconMap2)[
              startRating
            ] as WeatherKey;
            const endKey = Object.keys(weatherIconMap2)[
              endRating
            ] as WeatherKey;

            const StartIcon = weatherIconMap2[startKey].component;
            const EndIcon = weatherIconMap2[endKey].component;

            // Sunny days for each period
            const startSunny = sunnyDaysByPeriod[monthIdx * 2];
            const endSunny = sunnyDaysByPeriod[monthIdx * 2 + 1];

            return (
              <div key={monthIdx} role="listitem" className={monthColClass}>
                <div className={stackClass}>
                  <div
                    className="w-full"
                    role="img"
                    aria-label={`${monthLabel} start: ${weatherIconMap2[startKey].label}`}
                    title={`${monthLabel} start: ${weatherIconMap2[startKey].label}`}
                  >
                    <StartIcon
                      dot={showSunnyDays && startSunny >= SUNNY_DAY_THRESHOLD}
                      // sunnyDays={showSunnyDays ? startSunny : undefined}
                      className={iconClassName}
                    />
                  </div>
                  <div
                    className="w-full"
                    role="img"
                    aria-label={`${monthLabel} end: ${weatherIconMap2[endKey].label}`}
                    title={`${monthLabel} end: ${weatherIconMap2[endKey].label}`}
                  >
                    <EndIcon
                      dot={showSunnyDays && endSunny >= SUNNY_DAY_THRESHOLD}
                      // sunnyDays={showSunnyDays ? endSunny : undefined}
                      className={iconClassName}
                    />
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
