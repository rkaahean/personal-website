import { Link } from "./Link";

export default function Footer() {
  return (
    <div className="relative bottom-0 mt-10 mb-5 text-stone-500">
      Source code for my website{" "}
      <Link href="https://github.com/rkaahean/personal-website">here.</Link>
    </div>
  );
}
