import { twMerge } from "tailwind-merge";
import { BASE_TEXT_COLOR } from "./colors";

export function Link({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={twMerge(
        " font-medium underline underline-offset-4 text-sm 2xl:text-xl",
        BASE_TEXT_COLOR
      )}
    >
      {children}
    </a>
  );
}
