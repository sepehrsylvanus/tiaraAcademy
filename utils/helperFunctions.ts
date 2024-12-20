import { getAllVideos } from "@/actions/videos/videos.action";

export const formatTimeFromNow = (createdAt: Date): string => {
  const now = new Date();
  const diffMilliseconds = now.getTime() - createdAt.getTime();

  // Calculate the difference in seconds, minutes, hours, etc.
  const seconds = Math.floor(diffMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
};
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number = 1000
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  const result = str.charAt(0).toUpperCase() + str.slice(1);

  return result;
}

export function formatDateToStandard(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} | ${hours}:${minutes}:${seconds}`;
}
export function convertDaysToPersian(days: string[]) {
  const dayMapping: { [key: string]: string } = {
    monday: "دوشنبه",
    tuesday: "سه‌شنبه",
    wednesday: "چهارشنبه",
    thursday: "پنج‌شنبه",
    friday: "جمعه",
    saturday: "شنبه",
    sunday: "یک‌شنبه",
  };

  if (days.length === 1) {
    // If a single day string is provided, return the corresponding Persian day.
    return dayMapping[days[0].toLowerCase()] || days;
  } else if (days.length > 1) {
    // If an array of days is provided, map each day to its Persian equivalent.
    return days
      .map((day: string) => dayMapping[day.toLowerCase()] || day)
      .join("/");
  }
}

export function makeEnglishDaysUppercase(days: string[]) {
  const newDays = days
    .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
    .join(" / ");
  return newDays;
}
