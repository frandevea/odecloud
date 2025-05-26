import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Chat } from '@/types/chat';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getRelativeTimestamp(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const oneDayMs = 1000 * 60 * 60 * 24;

  const startOfDay = (d: Date) => {
    const copy = new Date(d);
    copy.setHours(0, 0, 0, 0);
    return copy;
  };

  const diffMs = startOfDay(now).getTime() - startOfDay(date).getTime();
  const diffDays = Math.floor(diffMs / oneDayMs);

  const isSameYear = date.getFullYear() === now.getFullYear();

  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  if (diffDays === 1) {
    return 'Yesterday';
  }

  if (diffDays <= 6) {
    return new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(date);
  }

  if (isSameYear) {
    return new Intl.DateTimeFormat(undefined, {
      day: '2-digit',
      month: '2-digit',
    }).format(date);
  }

  return new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
export function getUserProfileById(members: Chat['data']['members'], userId: string) {
  return members.find((member) => member._id === userId);
}
