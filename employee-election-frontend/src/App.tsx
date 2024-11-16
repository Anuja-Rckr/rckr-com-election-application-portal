import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Main from "./components/pages/Main";
import { LIGHT } from "./common/constants";

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme={LIGHT}>
      <Main>
        <p>Hello</p>
      </Main>
    </MantineProvider>
  );
}

export default App;
