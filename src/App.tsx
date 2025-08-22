import { BreakpointIndicator } from "./components/breakpoint-indicator";
import { Page } from "./stories/Page";
import { SelectedPeriodProvider } from "./stories/SelectedPeriodContext";

function App() {
  return (
    <SelectedPeriodProvider>
      <Page />
      <BreakpointIndicator />
    </SelectedPeriodProvider>
  );
}

export default App;
