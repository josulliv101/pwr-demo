import React from "react";

import { Header } from "./Header";
import "./page.css";
import WeatherLegend from "./WeatherIconLegend";
import { Info } from "lucide-react";
import MapboxExample from "./MapExample";

type User = {
  name: string;
};

export const Page: React.FC = () => {
  const [user, setUser] = React.useState<User>();

  return (
    <article className="max-w-6xl mx-auto h-dvh">
      <Header
        user={user}
        onLogin={() => setUser({ name: "Jane Doe" })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: "Jane Doe" })}
      />

      <section className="grid grid-cols-12 gap-4 h-[calc(100dvh-64px)] mt-4">
        <div className="col-span-4">
          <div className="flex items-center gap-5 -mt-0 mb-6 px-4 py-3 bg-accent rounded-lg">
            <Info className="text-gray-400 w-6 h-6" aria-label="Info" />
            <p className="text-gray-800 text-xs italic ">
              Blue icons (cool, mild &amp; warm) denote pleasant, comfortable
              weather.
            </p>
          </div>
          <WeatherLegend />
        </div>
        <div className="col-span-8 h-full">
          <MapboxExample />
        </div>
      </section>
    </article>
  );
};
