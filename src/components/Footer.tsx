import { GithubIcon, TwitterIcon } from "lucide-react";

export default function Footer() {
  return (
    <div className="mb-5 text-stone-700">
      <div className="flex flex-row justify-center gap-5 h-24 items-center">
        <div>Copyright's reserved 2023</div>
        <a href="https://www.github.com/rkaahean" target="_blank">
          <GithubIcon />
        </a>
        <a href="https://x.com/@rkaahean" target="_blank">
          <TwitterIcon />
        </a>
      </div>
    </div>
  );
}
