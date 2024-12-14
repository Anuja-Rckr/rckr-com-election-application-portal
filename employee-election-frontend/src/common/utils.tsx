import {
  IconCheck,
  IconCircleFilled,
  IconClipboardCheck,
  IconLockCheck,
  IconSum,
  IconUserPlus,
  IconX,
} from "@tabler/icons-react";
import {
  BLUE,
  CLOSED,
  colorsArray,
  CYAN,
  DARK,
  DATETIME,
  ELECTION_ANNOUNCED,
  GRAPE,
  GREEN,
  INDIGO,
  LIME,
  NOMINATIONS,
  NOMINATIONS_ANNOUNCED,
  NOMINATIONS_COMPLETED,
  NOMINATIONS_LIVE,
  ORANGE,
  pageNames,
  PINK,
  RED,
  TEAL,
  VIOLET,
  VOTING_ANNOUNCED,
  VOTING_COMPLETED,
  VOTING_LIVE,
  YELLOW,
} from "./constants";

// userDetails
export const getUserDetails = () => {
  const empDetails = localStorage.getItem("empDetails");
  if (empDetails) {
    return JSON.parse(empDetails);
  } else {
    return null;
  }
};

// Generate random color for profile
export const generateRandomColor = (input: string) => {
  const firstLetter = input.charAt(0).toLowerCase();
  const charCode = firstLetter.charCodeAt(0);

  const index = Math.floor((charCode - 97) / 2);

  return colorsArray[index] || colorsArray[0];
};

// Generate color for status
export const getColorForStatus = (status: string) => {
  switch (status) {
    case ELECTION_ANNOUNCED:
      return YELLOW;
    case NOMINATIONS_ANNOUNCED:
      return INDIGO;
    case NOMINATIONS_LIVE:
      return RED;
    case NOMINATIONS_COMPLETED:
      return TEAL;
    case VOTING_ANNOUNCED:
      return GRAPE;
    case VOTING_LIVE:
      return PINK;
    case VOTING_COMPLETED:
      return CYAN;
    case CLOSED:
      return LIME;
    default:
      return DARK;
  }
};

export const formatDate = (timestamp: string, returnType: string = "date") => {
  if (timestamp) {
    const date = new Date(timestamp);

    const getDayWithSuffix = (day: number) => {
      if (day > 3 && day < 21) return day + "th";
      switch (day % 10) {
        case 1:
          return day + "st";
        case 2:
          return day + "nd";
        case 3:
          return day + "rd";
        default:
          return day + "th";
      }
    };

    const day = getDayWithSuffix(date.getDate());
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    if (returnType === DATETIME) {
      return `${day} ${month}, ${year} ${time}`;
    }

    return `${day} ${month}, ${year}`;
  } else {
    return "----";
  }
};

// Get Page Name
export const getPageName = (path: string) => {
  const page = pageNames.find((element) => {
    if (element.path.includes(":")) {
      return path.split("/")[1] === element.path.split("/")[1];
    } else {
      return element.path === path;
    }
  });
  return page ? page.label : "";
};

// Get Active
export const getActiveNumber = (status: string) => {
  switch (status) {
    case ELECTION_ANNOUNCED:
      return -1;
    case NOMINATIONS_ANNOUNCED:
      return 0;
    case NOMINATIONS_LIVE:
      return 0;
    case NOMINATIONS_COMPLETED:
      return 0;
    case VOTING_ANNOUNCED:
      return 1;
    case VOTING_LIVE:
      return 1;
    case VOTING_COMPLETED:
      return 1;
    case CLOSED:
      return 2;
    default:
      return -1;
  }
};

// Get Initials
export const getInitials = (name: string) => {
  const nameParts = name
    .trim()
    .split(" ")
    .filter((part: string) => part !== "");

  if (nameParts.length === 0) {
    return "";
  }

  const firstInitial = nameParts[0].charAt(0).toUpperCase();
  const lastInitial =
    nameParts.length > 1
      ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
      : "";

  return firstInitial + lastInitial;
};

export const getIcon = (icon: any) => {
  switch (icon) {
    case "IconCheck":
      return IconCheck;
    case "IconUserPlus":
      return IconUserPlus;
    case "IconCircleFilled":
      return IconCircleFilled;
    case "IconClipboardCheck":
      return IconClipboardCheck;
    case "IconX":
      return IconX;
    case "IconSum":
      return IconSum;
    case "IconLockCheck":
      return IconLockCheck;
    default:
      return IconLockCheck;
  }
};

export const isDateValid = (
  startDate: string | null | undefined,
  endDate: string | null | undefined
): boolean => {
  if (!startDate || !endDate) {
    return false;
  }

  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();

  const isValid = now >= start && now <= end;
  return isValid;
};

export const getElectionStatus = (election: any): string => {
  const now = new Date();

  const nominationStartDate = election.nomination_start_date
    ? new Date(election.nomination_start_date)
    : null;
  const nominationEndDate = election.nomination_end_date
    ? new Date(election.nomination_end_date)
    : null;
  const votingStartDate = election.voting_start_date
    ? new Date(election.voting_start_date)
    : null;
  const votingEndDate = election.voting_end_date
    ? new Date(election.voting_end_date)
    : null;

  if (!nominationStartDate && !nominationEndDate) {
    return ELECTION_ANNOUNCED;
  }

  if (nominationStartDate && now < nominationStartDate) {
    return NOMINATIONS_ANNOUNCED;
  }

  if (
    nominationStartDate &&
    nominationEndDate &&
    now >= nominationStartDate &&
    now <= nominationEndDate
  ) {
    return NOMINATIONS_LIVE;
  }

  if (
    nominationEndDate &&
    now >= nominationEndDate &&
    votingStartDate === null
  ) {
    return NOMINATIONS_COMPLETED;
  }

  if (
    nominationEndDate &&
    votingStartDate &&
    now >= nominationEndDate &&
    now <= votingStartDate
  ) {
    return VOTING_ANNOUNCED;
  }

  if (
    votingStartDate &&
    votingEndDate &&
    now >= votingStartDate &&
    now <= votingEndDate
  ) {
    return VOTING_LIVE;
  }

  if (
    votingEndDate &&
    now > votingEndDate &&
    !election.results_published_date
  ) {
    return VOTING_COMPLETED;
  }

  if (election.results_published_date) {
    return CLOSED;
  }

  return ELECTION_ANNOUNCED;
};
