import { IconChartBar, IconTicket, IconTrophy } from "@tabler/icons-react";

// theme constants
export const LIGHT = "light";
export const DARK = "dark";
export const OUTLINE = "outline";
export const FILLED = "filled";

// color constants
export const RED = "red";
export const GREEN = "green";
export const YELLOW = "yellow";
export const VIOLET = "violet";
export const DARK_6 = "dark.6";
export const DARK_8 = "dark.8";
export const GRAY_1 = "gray.1";
export const WHITE = "white";
export const ORANGE = "orange";
export const PINK = "pink";
export const INDIGO = "indigo";
export const GRAPE = "grape";

// Route constants
export const DASHBOARD = "/dashboard";
export const ELECTIONS = "/elections";
export const YOUR_NOMINATIONS = "/your-nominations";
export const HOME = "/";
export const ELECTION_DETAILS = "/election-details/:id";

// Menu options
export const menuItems = [
  {
    icon: <IconChartBar size={20} />,
    label: "Dashboard",
    path: DASHBOARD,
  },
  {
    icon: <IconTicket size={20} />,
    label: "Elections",
    path: ELECTIONS,
  },
  {
    icon: <IconTrophy size={20} />,
    label: "Your Nominations",
    path: YOUR_NOMINATIONS,
  },
];

// Page Names
export const pageNames = [
  {
    path: DASHBOARD,
    label: "Dashboard",
  },
  {
    path: ELECTIONS,
    label: "Elections",
  },
  {
    path: YOUR_NOMINATIONS,
    label: "Your Nominations",
  },
  {
    path: ELECTION_DETAILS,
    label: "Election Details",
  },
];

// colors array
export const colorsArray = [
  "pink",
  "indigo",
  "blue",
  "violet",
  "red",
  "green",
  "yellow",
  "orange",
  "teal",
  "cyan",
  "lime",
  "grape",
  "gray",
];

// Table constants
export const LINK = "link";
export const DATETIME = "datetime";
export const DATA = "data";
export const STATUS = "status";

// Tab constants
export const OVERVIEW = "Overview";
export const NOMINATIONS = "Nominations";
export const RESULTS = "Results";

// Status Constants
export const DECLARED = "Declared";
export const LIVE = "Live";
export const COMPLETED = "Completed";
export const CLOSED = "Closed";
