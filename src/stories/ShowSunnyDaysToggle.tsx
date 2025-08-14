import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Circle } from "lucide-react";
import { useSelectedPeriod } from "@/stories/SelectedPeriodContext";

type ShowSunnyDaysToggleProps = {
  className?: string;
};

export function ShowSunnyDaysToggle({ className }: ShowSunnyDaysToggleProps) {
  const { showSunnyDays, setShowSunnyDays } = useSelectedPeriod();

  return (
    <div className={`w-full_ flex items-center gap-3 mt-0 ${className ?? ""}`}>
      <Label
        htmlFor="toggle-2"
        className="w-full hover:bg-accent/20 border-0 flex items-start gap-3 rounded-lg  px-1 py-1 has-[[aria-checked=true]]:border-gray-600 has-[[aria-checked=true]]:bg-blue-50/20 dark:has-[[aria-checked=true]]:border-gray-900 dark:has-[[aria-checked=true]]:bg-gray-950/20"
      >
        <Checkbox
          id="toggle-2"
          checked={showSunnyDays}
          onCheckedChange={(checked) => setShowSunnyDays(!!checked)}
          className="h-3.5 w-3.5 relative top-[3px] left-[4px] data-[state=checked]:border-gray-200 data-[state=checked]:bg-gray-600/10 data-[state=checked]:text-white dark:data-[state=checked]:border-gray-200 dark:data-[state=checked]:bg-gray-700/10"
        />
        <div className="grid gap-1 font-normal">
          <p className="text-current text-sm">
            Highlight more sunny days (
            <Circle className="inline-block fill-yellow-300 stroke-1 w-2 h-2" />
            )
          </p>
        </div>
      </Label>
    </div>
  );
}
