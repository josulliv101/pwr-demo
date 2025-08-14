// import React from 'react';

import { Button } from "@/components/ui/button";

import "./header.css";
import Logo, { LogoLabel } from "./Logo";
import { Searchbox } from "./Searchbox";
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
        <div />
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
