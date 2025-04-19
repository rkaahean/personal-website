import { twMerge } from "tailwind-merge";
import { BASE_TEXT_COLOR, HEADER_COLOR } from "./colors";

export function Heading1({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className={twMerge(
        "text-base tracking-tighter lg:text-2xl",
        HEADER_COLOR
      )}
    >
      {children}
    </h1>
  );
}

export function BaseText({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={twMerge(
        "text-sm 2xl:text-xl inline-block tracking-tight",
        BASE_TEXT_COLOR
      )}
    >
      {children}
    </p>
  );
}

export function Heading2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className={twMerge(
        "text-sm font-semibold text-emerald-700 pt-4 2xl:text-xl",
        HEADER_COLOR
      )}
    >
      {children}
    </h2>
  );
}

export function Heading3({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold text-stone-500 pt-4 2xl:text-xl">
      {children}
    </h2>
  );
}

export function BaseList({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-5 text-sm 2xl:text-xl">{children}</ul>;
}

export function NumberList({ children }: { children: React.ReactNode }) {
  return <ol className="pl-5 list-decimal text-sm 2xl:text-xl">{children}</ol>;
}

export function TitleDescription({ children }: { children: React.ReactNode }) {
  return (
    <span className={twMerge("pt-1 text-sm 2xl:text-xl", BASE_TEXT_COLOR)}>
      {children}
    </span>
  );
}
