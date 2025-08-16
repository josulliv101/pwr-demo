import { Button } from "@/components/ui/button";
import {
  WeatherIconMild,
  WeatherIconCool,
  WeatherIconWarm,
} from "./WeatherIcon";
import type { ComponentProps } from "react";
import type { PropsWithChildren } from "react";

export default function Logo({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<typeof Button>>) {
  return (
    <Button
      variant={"ghost"}
      className={`gap-5  border h-16 min-w-0 p-0 px-0 py-0 ps-0 pe-0 scale-[.6] origin-left ${
        className ?? ""
      }`}
      {...props}
    >
      <div className="grid grid-cols-2 gap-1 mt-2">
        <div className="flex items-center justify-center">
          <WeatherIconMild />
        </div>
        <div className="flex items-center justify-center">
          <WeatherIconWarm />
        </div>
        <div className="col-span-2 flex items-center justify-center relative -top-1/2">
          <WeatherIconCool />
        </div>
      </div>
      {children}
    </Button>
  );
}

export const LogoLabel = () => (
  <p className="text-gray-500 text-3xl font-semibold">Compare City Weather</p>
);
