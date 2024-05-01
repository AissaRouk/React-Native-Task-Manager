import { monthNamesEnum } from "../Types/Types";

// Function to get the index of the month in the monthNamesEnum enum
export default function getMonthIndex(
  monthName: monthNamesEnum
): number | undefined {
  // Get the keys of the monthNamesEnum enum
  const monthKeys = Object.keys(
    monthNamesEnum
  ) as (keyof typeof monthNamesEnum)[];

  // Find the index of the given month name in the enum
  const monthIndex = monthKeys.findIndex(
    (key) => monthNamesEnum[key] === monthName
  );

  // Return the month index if found, otherwise return null
  if (monthIndex != -1) return monthIndex;
}
