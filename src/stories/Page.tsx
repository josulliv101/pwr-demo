import React from "react";

import { Header, HeaderFull } from "./Header";
import "./page.css";
// import WeatherLegend from "./WeatherIconLegend";

import MapboxExample from "./MapExample";
// import { YearlyWeatherIcons } from "./WeatherRatings";

import { SidebarTabs } from "./SidebarTabs";
import { useSelectedPeriod } from "./SelectedPeriodContext";
import WeatherLegend from "./WeatherIconLegend";

import { Navigation } from "./Navigation";
import WeatherCitiesList from "@/components/WeatherCitiesList";
import WeatherLegend2 from "./WeatherLegend2";
import ScrollNavbar from "@/components/scroll-navbar";
// import { ShowSunnyDaysToggle } from "./ShowSunnyDaysToggle";
// import { ShowSunnyDaysToggle } from "./ShowSunnyDaysToggle";

type User = {
  name: string;
};

export const Page: React.FC = () => {
  return <Home />;
};

export const PageOrig: React.FC = () => {
  const [user, setUser] = React.useState<User>();
  const { showSunnyDays, activeCityIds } = useSelectedPeriod();
  return (
    <Layout>
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
    </Layout>
  );
};

export function getCurrentMonthHalfIndex(): number {
  const today = new Date();
  const month = today.getMonth(); // 0 = Jan, 11 = Dec
  const date = today.getDate();
  const isSecondHalf = date > 15; // 1–15 = first half, 16+ = second half

  return month * 2 + (isSecondHalf ? 1 : 0);
}

function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="">
      <section
        id="section1"
        className="h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-start justify-center"
      >
        {children}
      </section>

      <section
        id="section2"
        className="h-screen w-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center"
      >
        <div className="text-center text-white">
          <WeatherCitiesList />
        </div>
      </section>

      <section
        id="section3"
        className="h-screen w-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center"
      >
        <div className="text-center text-white">
          <WeatherLegend2 />
        </div>
      </section>

      <Navigation>
        <div className="text-sm text-gray-600">
          Content area ready for children
        </div>
      </Navigation>
    </div>
  );
}

export default function Home() {
  // const [user, setUser] = React.useState<User>();
  const { showSunnyDays, activeCityIds } = useSelectedPeriod();

  return (
    <div className="min-h-screen  w-full bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Demo content to enable scrolling */}
      <div className="h-screen px-0 py-0 flex-col items-center justify-center">
        <HeaderFull user={undefined} />
        <div className=" grid grid-cols-12 gap-0 h-[calc(100dvh-65px-40px)]">
          <div className="col-span-12 md:col-span-4 bg-blue-200/40 px-0 py-0">
            <WeatherLegend className="bg-accent_ bg-blue-50/50 text-white_ border-b pt-1 rounded-t-lg__ mb-4 px-2  ">
              {/* <ShowSunnyDaysToggle className="col-span-7 pt-3 text-accent-foreground text-xs" /> */}
            </WeatherLegend>

            <SidebarTabs
              showSunnyDays={showSunnyDays}
              activeCityIds={activeCityIds}
            />
          </div>
          <div className="col-span-12 md:col-span-8 bg-blue-200/40">
            <MapboxExample />
          </div>
        </div>
      </div>

      <ScrollNavbar />

      <section
        id="section2"
        className="h-screen w-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center"
      >
        <div className="text-center text-white">
          <WeatherCitiesList />
        </div>
      </section>

      <section
        id="section3"
        className="h-screen w-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center"
      >
        <div className="text-center text-white">
          <WeatherLegend2 />
        </div>
      </section>
    </div>
  );
}
