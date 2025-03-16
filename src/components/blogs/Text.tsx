export function Heading1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-base font-bold text-stone-500">{children}</h1>;
}

export function BaseText({ children }: { children: React.ReactNode }) {
  return <p className="text-sm">{children}</p>;
}
