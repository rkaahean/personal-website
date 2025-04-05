export function Heading1({ children }: { children: React.ReactNode }) {
	return (
		<h1 className="text-base text-gray-50 tracking-tighter lg:text-2xl">
			{children}
		</h1>
	);
}

export function BaseText({ children }: { children: React.ReactNode }) {
	return (
		<p className="text-sm lg:text-xl inline-block tracking-tight">{children}</p>
	);
}

export function Heading2({ children }: { children: React.ReactNode }) {
	return (
		<h2 className="text-sm font-semibold text-stone-500 pt-4 lg:text-xl">
			{children}
		</h2>
	);
}

export function Heading3({ children }: { children: React.ReactNode }) {
	return (
		<h2 className="text-sm font-semibold text-stone-500 pt-4 lg:text-xl">
			{children}
		</h2>
	);
}

export function BaseList({ children }: { children: React.ReactNode }) {
	return <ul className="list-disc pl-5 text-sm lg:text-xl">{children}</ul>;
}

export function NumberList({ children }: { children: React.ReactNode }) {
	return <ol className="pl-5 list-decimal text-sm lg:text-xl">{children}</ol>;
}

export function TitleDescription({ children }: { children: React.ReactNode }) {
	return (
		<span className="pt-1 text-sm text-stone-300 lg:text-xl">{children}</span>
	);
}
