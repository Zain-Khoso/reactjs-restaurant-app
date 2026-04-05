// Lib Imports
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

// Helper to merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
