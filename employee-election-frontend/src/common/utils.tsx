import { colorsArray } from "./constants";

export const generateRandomColor = (input: string) => {
  const firstLetter = input.charAt(0).toLowerCase();
  const charCode = firstLetter.charCodeAt(0);

  const index = Math.floor((charCode - 97) / 2);

  return colorsArray[index] || colorsArray[0];
};
