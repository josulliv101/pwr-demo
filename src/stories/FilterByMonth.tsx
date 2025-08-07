import DualButton from "./dual-button";
import { useState } from "react";

interface FilterByMonthProps {
  className?: string;
  initialActiveMonth?: number | null;
}

export default function FilterByMonth({
  className = "",
  initialActiveMonth = null,
}: FilterByMonthProps) {
  const [activeMonth, setActiveMonth] = useState<number | null>(
    initialActiveMonth
  );
  return (
    <div className={`grid grid-cols-6 gap-2 ${className}`}>
      {getFullMonthNames().map((month, index) => (
        <DualButton
          label={month}
          key={month}
          activeButton={
            activeMonth === index * 2
              ? "left"
              : activeMonth === index * 2 + 1
              ? "right"
              : undefined
          }
          onLeftClick={() => setActiveMonth(index * 2)}
          onRightClick={() => setActiveMonth(index * 2 + 1)}
        />
      ))}
    </div>
  );
}

function getFullMonthNames(): string[] {
  const formatter = new Intl.DateTimeFormat("en-US", { month: "long" });
  return Array.from({ length: 12 }, (_, i) =>
    formatter.format(new Date(2000, i, 1))
  );
}
