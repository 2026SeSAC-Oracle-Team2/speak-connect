import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, DuckSays, Screen } from "@/components/app/ui";
import { BottomNav } from "@/components/app/BottomNav";
import { Play, Flame, TrendingUp, ChevronRight } from "lucide-react";
import duck from "@/assets/duck.png";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "오늘의 학습 — 덕분이" },
      { name: "description", content: "오늘의 학습 12문항과 테마별 학습을 홈에서 바로 시작하세요." },
      { property: "og:title", content: "오늘의 학습 — 덕분이" },
      { property: "og:description", content: "연속 학습 일수와 평균 점수, 최근 학습 결과를 한눈에 확인해요." },
    ],
  }),
  component: HomePage,
});

const recent = [
  { date: "9월 2일", title: "카페에서 주문하기", aq: 88.6 },
  { date: "9월 1일", title: "오늘의 학습", aq: 85.2 },
  { date: "8월 31일", title: "병원에서 진료받기", aq: 83.0 },
];

function HomePage() {
  return (
    <>
      <Screen>
        <header className="mb-5">
          <p className="text-[15px] text-muted-foreground">9월 3일 목요일</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">덕분님, 오늘도 반가워요</h1>
        </header>

        <DuckSays>같이 오늘의 학습을 해볼까요? 꽥꽥꽥</DuckSays>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Card className="p-4">
            <p className="flex items-center gap-1.5 text-[14px] text-muted-foreground">
              <Flame size={16} strokeWidth={2.2} aria-hidden />
              연속 학습
            </p>
            <p className="mt-1 text-[26px] font-bold leading-none text-accent">6일</p>
          </Card>
          <Card className="p-4">
            <p className="flex items-center gap-1.5 text-[14px] text-muted-foreground">
              <TrendingUp size={16} strokeWidth={2.2} aria-hidden />
              평균 점수
            </p>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="text-[26px] font-bold leading-none text-accent">85.6</span>
              <span className="text-[14px] font-semibold text-success">+3.4</span>
            </p>
          </Card>
        </div>

        <Card className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold">오늘의 학습</h2>
            <span className="rounded-full bg-secondary px-3 py-1 text-[13px] font-semibold text-accent">
              12문항 · 약 8분
            </span>
          </div>
          <p className="text-[15px] text-muted-foreground">
            {"\n"}
          </p>
          <Link
            to="/learn/$themeId"
            params={{ themeId: "daily" }}
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] text-[17px] font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
          >
            <Play size={20} fill="currentColor" strokeWidth={0} aria-hidden />
            학습하기
          </Link>
        </Card>

        <h2 className="mb-3 mt-7 text-[17px] font-bold">최근 학습 결과</h2>
        <ul className="space-y-3">
          {recent.map((r) => (
            <li key={r.date}>
              <Link to="/report" className="card-soft flex items-center gap-3 p-4">
                <div className="flex-1">
                  <p className="text-[16px] font-semibold">{r.title}</p>
                  <p className="mt-1 text-[14px] text-muted-foreground">{r.date}</p>
                </div>
                <span className="text-[17px] font-bold text-accent">{r.aq}</span>
                <ChevronRight size={20} strokeWidth={2.2} aria-hidden className="text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-20 right-5 z-30 flex flex-col items-center gap-2">
          <div className="relative rounded-2xl bg-brand-yellow px-4 py-2.5 text-[14px] font-bold text-primary-foreground shadow-[var(--shadow-card)]">
            덕분이와 함께 대화해요
            <span
              aria-hidden
              className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 bg-brand-yellow"
            />
          </div>
          <Link
            to="/learn/$themeId"
            params={{ themeId: "daily" }}
            aria-label="덕분이와 대화 시작하기"
            className="grid size-20 place-items-center overflow-hidden rounded-full border-4 border-brand-yellow bg-brand-yellow shadow-[var(--shadow-card)] transition-transform active:scale-[0.96]"
          >
            <img src={duck} alt="덕분이" className="size-14 object-contain" />
          </Link>
        </div>
      </Screen>
      <BottomNav />
    </>
  );
}
