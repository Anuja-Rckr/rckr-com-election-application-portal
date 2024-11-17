import { colorsArray, DATETIME, menuItems } from "./constants";

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
    case "Declared":
      return "orange";
    case "Nominations":
      return "indigo";
    case "Live":
      return "pink";
    case "Completed":
      return "green";
    case "Closed":
      return "grape";
    default:
      return "dark";
  }
};

export const formatDate = (timestamp: string, returnType: string = "date") => {
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
};

// Get Page Name
export const getPageName = (path: string) => {
  const page = menuItems.find((element) => element.path === path);
  return page ? page.label : "";
};
