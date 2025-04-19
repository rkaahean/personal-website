import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { BASE_TEXT_COLOR } from "./colors";

export function Date({ date }: { date: string }) {
  const formattedDate = dayjs(date).format("MMMM D, YYYY");

  return (
    <div className={twMerge("text-sm 2xl:text-xl", BASE_TEXT_COLOR)}>
      {formattedDate}
    </div>
  );
}
