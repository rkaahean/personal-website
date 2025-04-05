import dayjs from "dayjs";

export function Date({ date }: { date: string }) {
  const formattedDate = dayjs(date).format("MMMM D, YYYY");

  return (
    <div className="text-stone-400 text-sm 2xl:text-xl">{formattedDate}</div>
  );
}
