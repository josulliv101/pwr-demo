import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Header } from "./Header";
import "./page.css";
import WeatherLegend from "./WeatherIconLegend";
import { Circle, Info } from "lucide-react";
import MapboxExample from "./MapExample";
import FilterByMonth from "./FilterByMonth";
// import { YearlyWeatherIcons } from "./WeatherRatings";
import Footer from "./Footer";
// import { Separator } from "@/components/ui/separator";

type User = {
  name: string;
};

export const Page: React.FC = () => {
  const [user, setUser] = React.useState<User>();

  return (
    <>
      <article className="max-w-7xl mx-auto h-[calc(100dvh-65px-16px)] px-4">
        <Header
          user={user}
          onLogin={() => setUser({ name: "Jane Doe" })}
          onLogout={() => setUser(undefined)}
          onCreateAccount={() => setUser({ name: "Jane Doe" })}
        />

        <section className="grid grid-cols-12 gap-4 h-[calc(100dvh-16px-148px)] mt-4">
          <div className="col-span-4 flex flex-col justify-between h-full">
            <div>
              <WeatherLegend>
                {" "}
                <div className="w-full flex items-center gap-3 mt-4">
                  <Label className="w-full hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-gray-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-gray-900 dark:has-[[aria-checked=true]]:bg-gray-950">
                    <Checkbox
                      id="toggle-2"
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
              </WeatherLegend>
              {/* <Separator className="my-6" /> */}
              <FilterByMonth
                className="mt-4"
                // initialActiveMonth={getCurrentMonthHalfIndex()}
              />
            </div>
            <div className="flex items-center gap-5 mt-4 px-4 py-3 bg-accent rounded-lg">
              <Info className="text-gray-400 w-6 h-6" aria-label="Info" />
              <p className="text-gray-800 text-xs italic ">
                Blue icons denote pleasant, comfortable weather.
              </p>
            </div>
            {/* <YearlyWeatherIcons
              cityLabel="San Francisco, CA"
              className="mt-8"
            />
            <YearlyWeatherIcons cityLabel="New York, NY" className="mt-4" />

            <YearlyWeatherIcons cityLabel="Seattle, WA" className="mt-4" /> */}
          </div>
          <div className="col-span-8 h-full">
            <MapboxExample />
          </div>
        </section>
      </article>
      <Footer className="mt-2">
        {/* <FilterByMonth initialActiveMonth={getCurrentMonthHalfIndex()} /> */}
      </Footer>
    </>
  );
};

export function getCurrentMonthHalfIndex(): number {
  const today = new Date();
  const month = today.getMonth(); // 0 = Jan, 11 = Dec
  const date = today.getDate();
  const isSecondHalf = date > 15; // 1–15 = first half, 16+ = second half

  return month * 2 + (isSecondHalf ? 1 : 0);
}
