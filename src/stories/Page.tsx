import React from "react";

import { Header } from "./Header";
import "./page.css";
// import WeatherLegend from "./WeatherIconLegend";

import MapboxExample from "./MapExample";
// import { YearlyWeatherIcons } from "./WeatherRatings";
import Footer from "./Footer";

import { SidebarTabs } from "./SidebarTabs";
import { useSelectedPeriod } from "./SelectedPeriodContext";
import WeatherLegend from "./WeatherIconLegend";
import VercelTabs from "@/components/vercel-tabs";
// import { ShowSunnyDaysToggle } from "./ShowSunnyDaysToggle";
// import { ShowSunnyDaysToggle } from "./ShowSunnyDaysToggle";

type User = {
  name: string;
};

export const Page: React.FC = () => {
  const [user, setUser] = React.useState<User>();
  const { showSunnyDays, activeCityIds } = useSelectedPeriod();
  return (
    <>
      <article className="max-w-7xl mx-auto h-[calc(100dvh-40px-0px)] px-4">
        <Header
          user={user}
          onLogin={() => setUser({ name: "Jane Doe" })}
          onLogout={() => setUser(undefined)}
          onCreateAccount={() => setUser({ name: "Jane Doe" })}
        />

        <section className="grid grid-cols-12 gap-4 h-[calc(100dvh-0px-130px)] mt-4 rounded-t-lg">
          <div className="col-span-4 flex flex-col justify-between h-full rounded-t-lg">
            <div className="bg-blue-50 h-full rounded-b-lg rounded-t-lg border">
              <WeatherLegend
                // showSunnyIcon={showSunnyDays}
                className="bg-accent text-white pt-1 rounded-t-lg mb-4 px-2 border-0"
              >
                {/* <ShowSunnyDaysToggle className="col-span-7 pt-3 text-accent-foreground text-xs" /> */}
              </WeatherLegend>

              <div className=" px-2 relative h-[560px]">
                <SidebarTabs
                  showSunnyDays={showSunnyDays}
                  activeCityIds={activeCityIds}
                />
              </div>
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
        <VercelTabs />
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
