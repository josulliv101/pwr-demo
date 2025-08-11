import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Circle } from "lucide-react";
import { useSelectedPeriod } from "@/stories/SelectedPeriodContext";

export function ShowSunnyDaysToggle() {
  const { showSunnyDays, setShowSunnyDays } = useSelectedPeriod();

  return (
    <div className="w-full flex items-center gap-3 mt-4">
      <Label
        htmlFor="toggle-2"
        className="w-full hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-gray-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-gray-900 dark:has-[[aria-checked=true]]:bg-gray-950"
      >
        <Checkbox
          id="toggle-2"
          checked={showSunnyDays}
          onCheckedChange={(checked) => setShowSunnyDays(!!checked)}
          className="data-[state=checked]:border-gray-600 data-[state=checked]:bg-gray-600 data-[state=checked]:text-white dark:data-[state=checked]:border-gray-700 dark:data-[state=checked]:bg-gray-700"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="text-muted-foreground text-sm">
            Show periods with more sunny days (
            <Circle className="inline-block fill-yellow-300 stroke-1 w-2 h-2" />
            )
          </p>
        </div>
      </Label>
    </div>
  );
}
