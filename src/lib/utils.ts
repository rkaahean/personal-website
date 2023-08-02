import { getCollection } from "astro:content";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getBlogs() {
  return await getCollection("blog", (blog) => !blog.data.isHidden);
}
