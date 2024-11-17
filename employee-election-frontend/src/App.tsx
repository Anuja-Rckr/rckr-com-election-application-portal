import { MantineProvider } from "@mantine/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { theme } from "./theme";
import {
  DASHBOARD,
  ELECTIONS,
  HOME,
  LIGHT,
  YOUR_NOMINATIONS,
} from "./common/constants";
import { Suspense, lazy } from "react";
import Elections from "./components/pages/Elections";
import YourNominations from "./components/pages/YourNominations";

// Lazy load the components
const Main = lazy(() => import("./components/pages/Main"));

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme={LIGHT}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={HOME} element={<Navigate to={ELECTIONS} />} />
            <Route path={HOME} element={<Main />}>
              <Route path={DASHBOARD} element={<p>Dashboard</p>} />
              <Route path={ELECTIONS} element={<Elections />} />
              <Route path={YOUR_NOMINATIONS} element={<YourNominations />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </MantineProvider>
  );
}

export default App;
