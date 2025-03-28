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
  LOGIN,
  BASENAME,
  AUTHCOMPLETE,
} from "./common/constants";
import { Suspense, lazy } from "react";
import Dashboard from "./components/pages/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AuthComplete from "./components/pages/auth/AuthComplete";

// Lazy load the components
const Main = lazy(() => import("./components/pages/Main"));
const Elections = lazy(() => import("./components/pages/Elections"));
const YourNominations = lazy(
  () => import("./components/pages/YourNominations")
);
const ElectionDetails = lazy(
  () => import("./components/pages/ElectionDetails/ElectionDetails")
);
const Auth = lazy(() => import("./components/pages/auth/Auth"));

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme={LIGHT}>
      <Router basename={BASENAME}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Auth Route */}
            <Route path={LOGIN} element={<Auth />} />
            <Route path={AUTHCOMPLETE} element={<AuthComplete />} />

            {/* Protected Routes */}
            <Route
              path={HOME}
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            >
              <Route path={DASHBOARD} element={<Dashboard />} />
              <Route path={ELECTIONS} element={<Elections />} />
              <Route path={ELECTION_DETAILS} element={<ElectionDetails />} />
              <Route path={YOUR_NOMINATIONS} element={<YourNominations />} />
              <Route index element={<Navigate to={ELECTIONS} />} />
            </Route>

            {/* Redirect unknown routes to elections */}
            <Route path="*" element={<Navigate to={DASHBOARD} replace />} />
          </Routes>
        </Suspense>
      </Router>
    </MantineProvider>
  );
}

export default App;
