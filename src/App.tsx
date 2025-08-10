import { Page } from "./stories/Page";
import { SelectedPeriodProvider } from "./stories/SelectedPeriodContext";

function App() {
  return (
    <SelectedPeriodProvider>
      <Page />
    </SelectedPeriodProvider>
  );
}

export default App;
