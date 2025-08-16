// import React from 'react';

import { Button } from "@/components/ui/button";

import "./header.css";
import Logo, { LogoLabel } from "./Logo";
import { Searchbox } from "./Searchbox";
// import { Info } from "lucide-react";
import {
  WeatherIconCool,
  WeatherIconMild,
  WeatherIconWarm,
} from "./WeatherIcon";
// import { ShowSunnyDaysToggle } from "./ShowSunnyDaysToggle";

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const Header = ({ user }: HeaderProps) => (
  <header>
    <div className="storybook-header grid grid-cols-12 gap-8">
      <div className="flex items-center justify-start col-span-4">
        <Logo>
          <LogoLabel />
        </Logo>
      </div>
      <div className="flex grow justify-between items-center col-span-8 gap-4">
        <div className="flex items-center gap-2 mt-0 px-0 py-3 bg-accent_ rounded-lg">
          {/* <Info
            className="hidden text-gray-5300 w-4 h-4 stroke-1"
            aria-label="Info"
          /> */}
          <div className="text-gray-800 text-sm italic ">
            Icons &nbsp;
            <WeatherIconCool className="w-5 h-5" />{" "}
            <WeatherIconMild className="w-5 h-5" />{" "}
            <WeatherIconWarm className="w-5 h-5" />
            &nbsp; denote pleasant, comfortable weather.
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Searchbox />
          {user ? <></> : <></>}
          <Button variant="secondary" className="flex items-center gap-2">
            Login
          </Button>
        </div>
      </div>
    </div>
  </header>
);
