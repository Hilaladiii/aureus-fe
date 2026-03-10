import { ReactNode } from "react";

interface AuthPageWrapperProps {
  children: ReactNode;
  title: ReactNode;
  subtitle: string;
  footer: ReactNode;
}

export function AuthPageWrapper({ children, title, subtitle, footer }: AuthPageWrapperProps) {
  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-5xl font-serif text-black tracking-tight leading-tight font-normal">
          {title}
        </h1>
        <p className="meta-label text-zinc-500">
          {subtitle}
        </p>
      </div>

      {children}

      <div className="text-center pt-8 border-t border-zinc-200">
        {footer}
      </div>
    </div>
  );
}
