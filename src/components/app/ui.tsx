import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import duck from "@/assets/duck.png";

export function Screen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("relative mx-auto min-h-dvh w-full max-w-md surface-warm px-5 pb-28 pt-6", className)}>
      {children}
    </main>
  );
}

export function PageTitle({ title, desc }: { title: string; desc?: string }) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-bold leading-snug tracking-tight text-foreground">{title}</h1>
      {desc ? <p className="mt-2 text-[15px] text-muted-foreground">{desc}</p> : null}
    </header>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "soft" | "outline" | "ghost";
  full?: boolean;
};

export function Btn({ variant = "primary", full, className, ...props }: BtnProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl px-5 text-[17px] font-semibold transition-transform active:scale-[0.98] disabled:opacity-45 disabled:active:scale-100",
        full && "w-full",
        variant === "primary" &&
          "bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-soft)]",
        variant === "soft" && "bg-secondary text-secondary-foreground",
        variant === "outline" && "border-2 border-border bg-card text-foreground",
        variant === "ghost" && "text-muted-foreground",
        className,
      )}
    />
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("card-soft p-5", className)}>{children}</section>;
}

export function DuckSays({ children, size = 72 }: { children: ReactNode; size?: number }) {
  return (
    <div className="flex items-end gap-3">
      <img
        src={duck}
        alt="안내 캐릭터 덕분이"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="shrink-0 object-contain"
      />
      <p className="card-soft flex-1 rounded-bl-md px-4 py-3 text-[15px] leading-relaxed text-foreground">
        {children}
      </p>
    </div>
  );
}

export function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      aria-label={label}
      className="h-3 w-full overflow-hidden rounded-full bg-secondary"
    >
      <div
        className="h-full rounded-full bg-[image:var(--gradient-brand)] transition-[width] duration-500"
        style={{ width: `${Math.max(4, value)}%` }}
      />
    </div>
  );
}

export function Loading({ message = "잠시만 기다려 주세요" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-10" role="status" aria-live="polite">
      <img
        src={duck}
        alt=""
        width={96}
        height={96}
        style={{ width: 96, height: 96 }}
        className="animate-bounce object-contain"
      />
      <p className="text-[15px] text-muted-foreground">{message}</p>
    </div>
  );
}
