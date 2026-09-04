import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { Btn, Card, DuckSays, PageTitle, Screen } from "@/components/app/ui";
import { calcAQ, type Scores } from "@/lib/learning";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "학습 보고서 — 덕분이" },
      { name: "description", content: "AQ 지수와 자발화·이해력·따라말하기·이름대기 항목별 점수를 확인하세요." },
      { property: "og:title", content: "학습 보고서 — 덕분이" },
      { property: "og:description", content: "오늘 연습의 결과를 방사형 그래프로 한눈에 살펴봐요." },
    ],
  }),
  component: ReportPage,
});

const scores: Scores = { spontaneous: 16, comprehension: 8, repetition: 7, naming: 9 };

type Detail = { q: string; answer: string };

const rows: { key: string; score: number; max: number; note: string; details: Detail[] }[] = [
  {
    key: "자발화",
    score: scores.spontaneous,
    max: 20,
    note: "문장의 핵심을 잘 파악했어요.",
    details: [
      { q: "카페에서 음료를 주문해 보세요.", answer: "직접 말한 문장" },
      { q: "음료를 받는 장면을 설명해 주세요.", answer: "직접 말한 문장" },
    ],
  },
  {
    key: "이해력(알아듣기)",
    score: scores.comprehension,
    max: 10,
    note: "두 번 들으면 더 또렷해져요.",
    details: [
      { q: "이 음료는 우유를 넣어 부드러워요.", answer: "우유를 넣어 부드러워요" },
      { q: "따뜻한 커피 한 잔 주세요.", answer: "따뜻한 커피를 주문했어요" },
    ],
  },
  {
    key: "따라말하기",
    score: scores.repetition,
    max: 10,
    note: "긴 문장에서 잠시 쉬어가면 좋아요.",
    details: [
      { q: "따라 말해 보세요.", answer: "따뜻한 커피 한 잔 주세요." },
      { q: "따라 말해 보세요.", answer: "네, 여기서 마시고 갈게요." },
    ],
  },
  {
    key: "이름대기",
    score: scores.naming,
    max: 10,
    note: "사물 이름을 빠르게 떠올리셨어요.",
    details: [
      { q: "사진 속 음료의 이름을 말씀해 주세요.", answer: "커피" },
      { q: "사진 속 물건의 이름을 말씀해 주세요.", answer: "커피잔" },
    ],
  },
];

const chartData = rows.map((r) => ({
  item: r.key.replace("(알아듣기)", ""),
  value: (r.score / r.max) * 100,
}));

function ReportPage() {
  const aq = calcAQ(scores);

  return (
    <Screen className="pb-12">
      <PageTitle title="오늘의 보고서" desc="차분히 살펴보시면 돼요." />
      <DuckSays>오늘도 끝까지 함께해 주셔서 고맙습니다.</DuckSays>
      <p className="mt-3 rounded-2xl bg-secondary px-4 py-3 text-[15px] text-foreground">
        AI 대화: 덕분이와의 대화에서 말문이 편하게 트이셨어요.
      </p>

      <Card className="mt-5">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[17px] font-bold">AQ 지수</h2>
          <p className="text-[15px] text-muted-foreground">100점 만점</p>
        </div>
        <p className="mt-1 text-[44px] font-bold leading-none text-accent">{aq}</p>

        <div className="mt-4 h-64" aria-hidden>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} outerRadius="72%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="item"
                tick={{ fill: "var(--foreground)", fontSize: 13 }}
              />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                dataKey="value"
                stroke="var(--accent)"
                fill="var(--primary)"
                fillOpacity={0.55}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <p className="sr-only">
          {rows.map((r) => `${r.key} ${r.score}점 만점 ${r.max}점`).join(", ")}
        </p>
      </Card>

      <h2 className="mb-3 mt-7 text-[17px] font-bold">항목별 점수</h2>
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.key}>
            <Card className="p-4">
              <div className="flex items-baseline justify-between">
                <h3 className="text-[16px] font-semibold">{r.key}</h3>
                <p className="text-[17px] font-bold text-accent">
                  {r.score}
                  <span className="text-[14px] font-medium text-muted-foreground"> / {r.max}</span>
                </p>
              </div>
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-[image:var(--gradient-brand)]"
                  style={{ width: `${(r.score / r.max) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-[14px] text-muted-foreground">{r.note}</p>
            </Card>
          </li>
        ))}
      </ul>

      <Link to="/home" className="mt-7 block">
        <Btn full>홈으로 돌아가기</Btn>
      </Link>
    </Screen>
  );
}
