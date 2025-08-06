import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

// type Prettify<T> = {
//   [K in keyof T]: T[K];
// } & {};

// export const weatherIconMap = {
//   cold: { filled: true },
//   brisk: { filled: true },
//   cool: { filled: true, featured: true },
//   "mild-clouds": { featured: true },
//   "mild-sun": { featured: true },
//   "warm-clouds": { featured: true },
//   "warm-sun": { featured: true },
//   hot: {},
//   "very-hot": {},
// } as const;

// type WeatherIconMap = typeof weatherIconMap;

// Step 1: Union of all values
// type WeatherIconPropsUnion = WeatherIconMap[keyof WeatherIconMap];

// Step 2: Merge into a single type
// type MergedWeatherIconProps = {
//   [K in keyof WeatherIconPropsUnion]: WeatherIconPropsUnion[K];
// };

// export type WeatherIconMap = typeof weatherIconMap;

// export type WeatherIconName = keyof WeatherIconMap;

// export type WeatherIcon = Prettify<
//   {
//     [K in keyof WeatherIconMap]: {
//       readonly type: K;
//     } & WeatherIconMap[K];
//   }[keyof WeatherIconMap]
// >;

// export type UnionToObject<T extends string | number | symbol> = {
//   [K in T]: K;
// };

// export type WeatherIconTypes = UnionToObject<WeatherIcons>;

export type WeatherIconProps = Partial<{
  dot: boolean;
  filled: boolean;
  featured: boolean;
  divider: boolean;
  className?: string;
  classNameDot?: string;
  children?: React.ReactNode;
}>;

export const WeatherIcon = ({
  dot,
  filled,
  featured,
  divider,
  className,
  classNameDot,
  children,
}: WeatherIconProps) => {
  const classNames = clsx(
    { "w-6 h-6": !featured },
    { "w-5.5 h-5.5": featured },
    "aspect-square",
    "overflow-visible",
    { "rounded-sm": featured },
    { "rounded-full": !featured },
    { "border-2": !filled },
    { "border-black": !featured },
    { "border-blue-500": featured },
    { "-rotate-45": featured },
    "relative scale-75",

    "before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-1/2 before:-translate-x-1/2",
    "before:w-[2px]",
    { "before:bg-black": !filled && divider },
    { "before:bg-white": filled && divider },
    className
  );
  return (
    <Badge variant={filled ? "default" : "outline"} className={classNames}>
      {dot && (
        <div
          className={`absolute top-1/2 left-1/2 -translate-1/2 w-2 h-2 bg-yellow-400 rounded-full border-1 ${
            !filled ? "border-black" : "border-black"
          } ${classNameDot}`}
        />
      )}
      <div
        className={`absolute top-1/2 left-1/2 -translate-1/2 flex items-center justify-center ${
          featured ? "rotate-45" : ""
        }`}
      >
        {children}
      </div>
    </Badge>
  );
};

export const WeatherIconCold = (props: WeatherIconProps) => (
  <WeatherIcon {...props} filled classNameDot="border-white border-1" />
);
export const WeatherIconBrisk = (props: WeatherIconProps) => (
  <WeatherIcon {...props} filled divider classNameDot="border-white border-1" />
);
export const WeatherIconCool = (props: WeatherIconProps) => (
  <WeatherIcon
    {...props}
    featured
    className="-rotate-45 border-blue-500 bg-gradient-to-br from-blue-500 from-50% to-white to-50%"
    classNameDot="border-blue-500"
  />
);
export const WeatherIconMild = (props: WeatherIconProps) => (
  <WeatherIcon
    {...props}
    filled
    featured
    className="bg-blue-500"
    classNameDot="border-white border-1"
  />
);
export const WeatherIconWarm = (props: WeatherIconProps) => (
  <WeatherIcon
    {...props}
    featured
    className="border-blue-500"
    classNameDot="border-blue-500"
  />
);
export const WeatherIconHot = (props: WeatherIconProps) => (
  <WeatherIcon {...props} divider />
);
export const WeatherIconVeryHot = (props: WeatherIconProps) => (
  <WeatherIcon {...props} />
);

export const weatherIconMap2 = {
  cold: {
    label: "Cold",
    component: WeatherIconCold,
    description:
      "Very cold temperatures, typically below 32°F (0°C). Bundle up with heavy winter clothing!",
  },
  brisk: {
    label: "Brisk",
    component: WeatherIconBrisk,
    description:
      "Cool and refreshing weather around 40-50°F (4-10°C). Perfect for outdoor activities with a light jacket.",
  },
  cool: {
    label: "Cool",
    component: WeatherIconCool,
    description:
      "Pleasantly cool temperatures around 50-65°F (10-18°C). Light layers recommended.",
  },
  mild: {
    label: "Mild",
    component: WeatherIconMild,
    description:
      "Comfortable mild weather around 65-75°F (18-24°C). Ideal for most outdoor activities.",
  },
  warm: {
    label: "Warm",
    component: WeatherIconWarm,
    description:
      "Warm and pleasant temperatures around 75-85°F (24-29°C). Great for swimming and outdoor fun.",
  },
  hot: {
    label: "Hot",
    component: WeatherIconHot,
    description:
      "Hot weather around 85-95°F (29-35°C). Stay hydrated and seek shade when possible.",
  },
  "very-hot": {
    label: "Very Hot",
    component: WeatherIconVeryHot,
    description:
      "Extremely hot temperatures above 95°F (35°C). Take precautions and limit outdoor exposure.",
  },
} as const;
