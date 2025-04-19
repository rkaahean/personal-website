import { getCollection } from "astro:content";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getBlogs() {
  const env = import.meta.env.MODE;
  let blogs = await getCollection(
    "blog",
    (blog) => !(blog.data.isHidden && env === "production")
  );

  return blogs.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });
}

export async function getNotes() {
  let notes = await getCollection("note", (note) => note);
  return notes.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });
}
