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
      className=" hover:text-orange-100 font-medium underline underline-offset-4 text-sm"
    >
      {children}
    </a>
  );
}
