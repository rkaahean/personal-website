export function Heading1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-base font-bold text-stone-500">{children}</h1>;
}

export function BaseText({ children }: { children: React.ReactNode }) {
  return <p className="text-sm">{children}</p>;
}

export function Heading2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-semibold text-stone-500">{children}</h2>;
}

export function BaseList({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc list-inside text-sm">{children}</ul>;
}
