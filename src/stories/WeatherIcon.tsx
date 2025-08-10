import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import React from "react";

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
}: WeatherIconProps = {}) => {
  const classNames = clsx(
    // size
    !featured ? "w-6 h-6" : "w-[22px] h-[22px]",
    "aspect-square",
    "overflow-visible",
    // shape
    featured ? "rounded-sm" : "rounded-full",
    // border
    !filled && "border-2",
    !featured ? "border-black" : "border-blue-500",
    // rotation for featured
    featured && "-rotate-45",
    // positioning and divider helper
    "relative scale-[.65]",
    "before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-[2px]",
    divider && (filled ? "before:bg-white" : "before:bg-black"),
    className
  );

  return (
    <Badge variant={filled ? "default" : "outline"} className={classNames}>
      {dot && (
        <div
          className={clsx(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full border",
            "border-black",
            classNameDot
          )}
        />
      )}
      <div
        className={clsx(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center",
          featured && "rotate-45"
        )}
      >
        {children}
      </div>
    </Badge>
  );
};

// Variants (kept your intent and styling, with class fixes)
export const WeatherIconCold = (props: WeatherIconProps = {}) => (
  <WeatherIcon {...props} filled classNameDot="border-white border" />
);

export const WeatherIconBrisk = (props: WeatherIconProps = {}) => (
  <WeatherIcon {...props} filled divider classNameDot="border-white border" />
);

export const WeatherIconCool = (props: WeatherIconProps = {}) => (
  <WeatherIcon
    {...props}
    featured
    className={clsx(
      "-rotate-45 border-blue-500 bg-gradient-to-br from-blue-500 from-50% to-white to-50%",
      props.className
    )}
    classNameDot={clsx("border-blue-500", props.classNameDot)}
  />
);

export const WeatherIconMild = (props: WeatherIconProps = {}) => (
  <WeatherIcon
    {...props}
    filled
    featured
    className={clsx("bg-blue-500", props.className)}
    classNameDot={clsx("border-white border", props.classNameDot)}
  />
);

export const WeatherIconWarm = (props: WeatherIconProps = {}) => (
  <WeatherIcon
    {...props}
    featured
    className={clsx("border-blue-500", props.className)}
    classNameDot={clsx("border-blue-500", props.classNameDot)}
  />
);

export const WeatherIconHot = (props: WeatherIconProps = {}) => (
  <WeatherIcon {...props} divider />
);

export const WeatherIconVeryHot = (props: WeatherIconProps = {}) => (
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
  veryhot: {
    label: "Very Hot",
    component: WeatherIconVeryHot,
    description:
      "Extremely hot temperatures above 95°F (35°C). Take precautions and limit outdoor exposure.",
  },
} as const;

export type WeatherKey = keyof typeof weatherIconMap2;

// Extract icon names
export const weatherIconNames = Object.keys(
  weatherIconMap2
) as (keyof typeof weatherIconMap2)[];

// Function to get a random icon name
export function getRandomWeatherIconName(): keyof typeof weatherIconMap2 {
  const randomIndex = Math.floor(Math.random() * weatherIconNames.length);
  return weatherIconNames[randomIndex];
}

export function getIconNameByDigit(
  digit: number
): keyof typeof weatherIconMap2 | undefined {
  switch (digit) {
    case 1:
      return "cold";
    case 2:
      return "brisk";
    case 3:
      return "cool";
    case 4:
    case 5:
      return "mild";
    case 6:
    case 7:
      return "warm";
    case 8:
      return "hot";
    case 9:
      return "veryhot";
    default:
      return undefined; // Or throw an error if preferred
  }
}
