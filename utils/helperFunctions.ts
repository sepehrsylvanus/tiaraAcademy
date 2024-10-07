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
