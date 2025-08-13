import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function CompareCitiesSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sheet modal={false}>
      <SheetTrigger className="w-full">
        <div className="flex items-center justify-between">
          <span>Compare Cities</span>
          <span className="text-xs text-gray-500">Click to open</span>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px]">
        <SheetHeader>
          <SheetTitle>Compare Cities</SheetTitle>
          <SheetDescription>
            Select cities to compare their weather data.
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
