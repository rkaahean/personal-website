import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

export default function Navbar() {
  return (
    <div className="flex flex-row w-screen justify-center gap-5 h-12 items-center m-4">
      <a href="https://www.github.com/rkaahean" target="_blank">
        <GitHubLogoIcon className="w-6 h-6" />
      </a>
      <a href="https://x.com/@rkaahean" target="_blank">
        <TwitterLogoIcon className="w-6 h-6" />
      </a>
      <a href="https://www.linkedin.com/in/ranjansrinivas/" target="_blank">
        <LinkedInLogoIcon className="w-6 h-6" />
      </a>
    </div>
  );
}
