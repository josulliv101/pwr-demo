import { Input } from "@/components/ui/input";
export function Searchbox() {
  return (
    <Input
      className="w-72"
      type="search"
      placeholder="Search for cities, countries, states"
    />
  );
}
