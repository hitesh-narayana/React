/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes intelligently.
 *
 * This function uses `clsx` to conditionally join class names together and `tailwind-merge` to merge
 * Tailwind CSS classes, ensuring that conflicting classes are handled correctly.
 *
 * @param {...ClassValue[]} inputs - An array of class values to be combined.
 * @returns {string} - A single string containing the combined class names.
 *
 * @see {@link https://github.com/lukeed/clsx} for more information on `clsx`.
 * @see {@link https://github.com/dcastil/tailwind-merge} for more information on `tailwind-merge`.
 */
/* */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
