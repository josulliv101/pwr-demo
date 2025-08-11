// SelectedPeriodContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { getCurrentMonthHalfIndex } from "./Page";

type SelectedPeriodContextType = {
  selectedPeriod: number;
  setSelectedPeriod: (value: number) => void;
  showSunnyDays: boolean;
  setShowSunnyDays: (value: boolean) => void;
};

const SelectedPeriodContext = createContext<
  SelectedPeriodContextType | undefined
>(undefined);

export const SelectedPeriodProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(
    getCurrentMonthHalfIndex()
  );
  const [showSunnyDays, setShowSunnyDays] = useState<boolean>(false);

  return (
    <SelectedPeriodContext.Provider
      value={{
        selectedPeriod,
        setSelectedPeriod,
        showSunnyDays,
        setShowSunnyDays,
      }}
    >
      {children}
    </SelectedPeriodContext.Provider>
  );
};

export const useSelectedPeriod = () => {
  const ctx = useContext(SelectedPeriodContext);
  if (!ctx) {
    throw new Error(
      "useSelectedPeriod must be used within SelectedPeriodProvider"
    );
  }
  return ctx;
};
