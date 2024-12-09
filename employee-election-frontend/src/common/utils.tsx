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
  CLOSED,
  colorsArray,
  COMPLETED,
  DARK,
  DATETIME,
  DECLARED,
  GRAPE,
  GREEN,
  INDIGO,
  LIVE,
  NOMINATIONS,
  ORANGE,
  pageNames,
  PINK,
  VIOLET,
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
    case DECLARED:
      return YELLOW;
    case NOMINATIONS:
      return INDIGO;
    case LIVE:
      return PINK;
    case COMPLETED:
      return GREEN;
    case CLOSED:
      return GRAPE;
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
    case DECLARED:
      return -1;
    case NOMINATIONS:
      return 0;
    case LIVE:
      return 1;
    case COMPLETED:
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

export const isDateValid = (date: string | null | undefined): boolean => {
  if (!date) return false;
  const nominationEndDate = new Date(date);
  return new Date() > nominationEndDate;
};

export const convertToLocalTime = (votingEndTime: string) => {
  // Create a Date object from the UTC time
  const utcDate = new Date(votingEndTime);

  // Convert UTC to local time (IST in your case, UTC+5:30)
  const localDate = new Date(
    utcDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  return localDate.toLocaleString(); // Display the local date-time as a string
};
