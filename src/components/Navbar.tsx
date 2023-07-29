import { GithubIcon, TwitterIcon } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex flex-row w-screen justify-center gap-5 h-12 items-center">
      <a href="https://www.github.com/rkaahean" target="_blank">
        <GithubIcon />
      </a>
      <a href="https://x.com/@rkaahean" target="_blank">
        <TwitterIcon />
      </a>
    </div>
  );
}
