import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, DuckSays, ProgressBar, Screen } from "@/components/app/ui";
import { BottomNav } from "@/components/app/BottomNav";
import { THEMES } from "@/lib/learning";
import cafe from "@/assets/cafe_1.jpg";
import { Play, Flame, Clock } from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "오늘의 학습 — 덕분이" },
      { name: "description", content: "오늘의 테마 학습을 확인하고 8분 연습을 이어가 보세요." },
      { property: "og:title", content: "오늘의 학습 — 덕분이" },
      { property: "og:description", content: "생활 테마로 알아듣기부터 AI 대화까지 한 세션에 연습해요." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Screen>
        <header className="mb-5">
          <p className="text-[15px] text-muted-foreground">9월 2일 수요일</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">덕분님, 오늘도 반가워요</h1>
        </header>

        <DuckSays>오늘의 짧은 연습, 편하실 때 이어서 해보세요.</DuckSays>

        <Card className="mt-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold">오늘의 학습</h2>
            <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[13px] font-semibold text-accent">
              <Flame size={16} strokeWidth={2.2} aria-hidden />6일째 이어가는 중
            </span>
          </div>
          <ProgressBar value={40} label="오늘의 학습 진행률" />
          <p className="text-[14px] text-muted-foreground">12개 중 4개를 마치셨어요.</p>
          <Link
            to="/learn"
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] text-[17px] font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
          >
            <Play size={20} fill="currentColor" strokeWidth={0} aria-hidden />
            이어서 학습하기
          </Link>
        </Card>

        <h2 className="mb-3 mt-7 text-[17px] font-bold">테마별 학습</h2>
        <ul className="space-y-4">
          {THEMES.map((t) => (
            <li key={t.id}>
              <Link
                to="/learn/$themeId"
                params={{ themeId: t.id }}
                className="card-soft block overflow-hidden p-0"
              >
                <img
                  src={cafe}
                  alt={`${t.title} 테마 이미지`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-36 w-full object-cover"
                />
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-[17px] font-bold">{t.title}</h3>
                    <p className="mt-1 text-[14px] text-muted-foreground">{t.subtitle}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[14px] text-muted-foreground">
                    <Clock size={16} strokeWidth={2.2} aria-hidden />
                    {t.minutes}분
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Screen>
      <BottomNav />
    </>
  );
}
