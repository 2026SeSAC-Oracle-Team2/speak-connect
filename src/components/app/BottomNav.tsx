import { Link } from "@tanstack/react-router";
import { House, GraduationCap, ChartLine, Bell, Settings } from "lucide-react";

const items = [
  { to: "/home", label: "홈", Icon: House },
  { to: "/learn", label: "학습", Icon: GraduationCap },
  { to: "/records", label: "기록", Icon: ChartLine },
  { to: "/notifications", label: "알림", Icon: Bell },
  { to: "/settings", label: "설정", Icon: Settings },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="주요 메뉴"
      className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t border-border bg-card/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <ul className="flex items-stretch justify-between">
        {items.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              className="flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-xl text-muted-foreground"
              activeProps={{ className: "text-accent font-semibold" }}
            >
              <Icon size={24} strokeWidth={2.2} aria-hidden />
              <span className="text-xs">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
