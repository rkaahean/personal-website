import { BaseText } from "./Text";

export default function Footer({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-8">
      <BaseText>{children}</BaseText>
    </div>
  );
}
