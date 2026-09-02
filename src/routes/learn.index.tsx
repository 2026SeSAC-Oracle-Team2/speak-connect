import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, DuckSays, PageTitle, Screen } from "@/components/app/ui";
import { BottomNav } from "@/components/app/BottomNav";
import { THEMES, STEP_LABEL } from "@/lib/learning";
import cafe from "@/assets/cafe_1.jpg";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "테마별 학습 — 덕분이" },
      { name: "description", content: "동네 카페, 시장 가는 길. 생활 테마를 골라 오늘의 연습을 시작하세요." },
      { property: "og:title", content: "테마별 학습 — 덕분이" },
      { property: "og:description", content: "한 세션에 알아듣기·이름대기·따라말하기·자발화와 AI 대화를 연습해요." },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  return (
    <>
      <Screen>
        <PageTitle title="테마별 학습" desc="오늘 마음이 가는 상황을 골라 주세요." />
        <DuckSays>한 세션은 12개 항목, 약 8분이에요.</DuckSays>

        <ul className="mt-5 space-y-4">
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
                  className="h-40 w-full object-cover"
                />
                <div className="flex items-center gap-3 p-4">
                  <div className="flex-1">
                    <h2 className="text-[18px] font-bold">{t.title}</h2>
                    <p className="mt-1 text-[14px] text-muted-foreground">{t.subtitle}</p>
                  </div>
                  <ChevronRight size={22} strokeWidth={2.2} aria-hidden className="text-muted-foreground" />
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Card className="mt-6">
          <h2 className="text-[16px] font-bold">한 세션 구성</h2>
          <ul className="mt-3 space-y-2 text-[15px] text-muted-foreground">
            {(["listen", "naming", "repeat", "spontaneous"] as const).map((k) => (
              <li key={k} className="flex justify-between">
                <span>{STEP_LABEL[k]}</span>
                <span className="font-semibold text-foreground">2개</span>
              </li>
            ))}
            <li className="flex justify-between">
              <span>AI 대화</span>
              <span className="font-semibold text-foreground">4턴</span>
            </li>
          </ul>
        </Card>
      </Screen>
      <BottomNav />
    </>
  );
}
