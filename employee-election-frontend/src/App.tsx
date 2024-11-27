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
  ELECTION_DETAILS,
  ELECTIONS,
  HOME,
  LIGHT,
  YOUR_NOMINATIONS,
} from "./common/constants";
import { Suspense, lazy } from "react";
import Dashboard from "./components/pages/Dashboard";

// Lazy load the components
const Main = lazy(() => import("./components/pages/Main"));
const Elections = lazy(() => import("./components/pages/Elections"));
const YourNominations = lazy(
  () => import("./components/pages/YourNominations")
);
const ElectionDetails = lazy(
  () => import("./components/pages/ElectionDetails/ElectionDetails")
);

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme={LIGHT}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={HOME} element={<Main />}>
              <Route path={DASHBOARD} element={<Dashboard />} />
              <Route path={ELECTIONS} element={<Elections />} />
              <Route path={ELECTION_DETAILS} element={<ElectionDetails />} />
              <Route path={YOUR_NOMINATIONS} element={<YourNominations />} />
              <Route index element={<Navigate to={ELECTIONS} />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </MantineProvider>
  );
}

export default App;
