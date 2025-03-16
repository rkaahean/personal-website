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
      target="_blank"
      className="text-stone-400 hover:text-stone-300 font-medium underline underline-offset-4 text-base"
    >
      {children}
    </a>
  );
}
