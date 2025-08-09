import React from "react";

import { Header } from "./Header";
import "./page.css";
import WeatherLegend from "./WeatherIconLegend";
import { Info } from "lucide-react";
import MapboxExample from "./MapExample";
import FilterByMonth from "./FilterByMonth";
// import { YearlyWeatherIcons } from "./WeatherRatings";
import Footer from "./Footer";

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
          <div className="col-span-4">
            <WeatherLegend />
            <FilterByMonth
              className="mt-4"
              initialActiveMonth={getCurrentMonthHalfIndex()}
            />
            <div className="flex items-center gap-5 mt-4 px-4 py-3 bg-accent rounded-lg">
              <Info className="text-gray-400 w-6 h-6" aria-label="Info" />
              <p className="text-gray-800 text-xs italic ">
                Blue icons (cool, mild &amp; warm) denote pleasant, comfortable
                weather.
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

function getCurrentMonthHalfIndex(): number {
  const today = new Date();
  const month = today.getMonth(); // 0 = Jan, 11 = Dec
  const date = today.getDate();
  const isSecondHalf = date > 15; // 1–15 = first half, 16+ = second half

  return month * 2 + (isSecondHalf ? 1 : 0);
}
