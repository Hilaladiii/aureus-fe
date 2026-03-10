import { ReactNode } from "react";
import { ProtectedLayoutWrapper } from "./_component/ProtectedLayoutWrapper";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <ProtectedLayoutWrapper>{children}</ProtectedLayoutWrapper>;
}
