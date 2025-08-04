import { clsx } from "clsx";
import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";

type DividerType = boolean | ReactNode;

export const WeatherIcon2 = ({
  filled,
  featured,
  divider,
  children,
  className,
}: Partial<{
  filled: boolean;
  featured: boolean;
  divider: DividerType;
  children: ReactNode;
  className?: string;
}>) => {
  const baseClassNames = clsx(
    "aspect-square",
    "rounded-none",
    { "border-2": !filled },
    "border-black",
    { "-rotate-45": featured },
    "relative",
    "flex items-center justify-center", // Add flex centering for children
    className
  );

  const renderLineDivider = () => {
    if (divider !== true) return null;

    const dividerColor = false ? "bg-white" : "bg-black";
    return (
      <div
        className={clsx(
          "absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px]",
          dividerColor
        )}
      />
    );
  };

  const renderDividerContent = () => {
    // if (typeof divider === "boolean" || !divider) return null;
    return divider;
  };

  return (
    <Badge variant={filled ? "default" : "outline"} className={baseClassNames}>
      {renderLineDivider()}
      {children}
      {renderDividerContent()}
    </Badge>
  );
};
