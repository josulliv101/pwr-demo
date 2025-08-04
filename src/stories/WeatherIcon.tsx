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
  children?: React.ReactNode;
}>;

export const WeatherIcon = ({
  dot,
  filled,
  featured,
  divider,
  className,
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
    "relative",

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
          }`}
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
  <WeatherIcon {...props} filled />
);
export const WeatherIconBrisk = (props: WeatherIconProps) => (
  <WeatherIcon {...props} filled divider />
);
export const WeatherIconCool = (props: WeatherIconProps) => (
  <WeatherIcon
    {...props}
    featured
    className="-rotate-45 border-black bg-gradient-to-br from-black from-50% to-white to-50%"
  />
);
export const WeatherIconMild = (props: WeatherIconProps) => (
  <WeatherIcon {...props} filled featured className="bg-blue-500" />
);
export const WeatherIconWarm = (props: WeatherIconProps) => (
  <WeatherIcon {...props} featured className="border-blue-500" />
);
export const WeatherIconHot = (props: WeatherIconProps) => (
  <WeatherIcon {...props} divider />
);
export const WeatherIconVeryHot = (props: WeatherIconProps) => (
  <WeatherIcon {...props} />
);

export const weatherIconMap2 = {
  cold: { label: "Cold", component: WeatherIconCold },
  brisk: { label: "Brisk", component: WeatherIconBrisk },
  cool: { label: "Cool", component: WeatherIconCool },
  mild: { label: "Mild", component: WeatherIconMild },

  warm: { label: "Warm", component: WeatherIconWarm },

  hot: { label: "Hot", component: WeatherIconHot },
  "very-hot": {
    label: "Very Hot",
    component: WeatherIconVeryHot,
  },
} as const;
