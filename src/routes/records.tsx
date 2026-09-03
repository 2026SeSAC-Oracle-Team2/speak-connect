import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { Card, PageTitle, Screen } from "@/components/app/ui";
import { BottomNav } from "@/components/app/BottomNav";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/records")({
  head: () => ({
    meta: [
      { title: "학습 기록 — 덕분이" },
      { name: "description", content: "지난 세션의 AQ 지수 변화와 보고서를 한곳에서 살펴보세요." },
      { property: "og:title", content: "학습 기록 — 덕분이" },
      { property: "og:description", content: "쌓아온 연습 기록을 날짜별로 확인해요." },
    ],
  }),
  component: RecordsPage,
});

const history = [
  { date: "9월 2일", theme: "동네 카페에서", aq: 88.6 },
  { date: "9월 1일", theme: "병원에서 진료받기", aq: 85.2 },
  { date: "8월 31일", theme: "동네 카페에서", aq: 83.0 },
  { date: "8월 29일", theme: "병원에서 진료받기", aq: 80.4 },
];

const aqParts = [
  { item: "자발화", score: 16, max: 20 },
  { item: "이해력", score: 8, max: 10 },
  { item: "따라말하기", score: 7, max: 10 },
  { item: "이름대기", score: 9, max: 10 },
];

const chartData = aqParts.map((p) => ({ item: p.item, value: (p.score / p.max) * 100 }));

function RecordsPage() {
  return (
    <>
      <Screen>
        <PageTitle title="학습 기록" desc="조금씩 쌓인 연습을 살펴보세요." />
        <p className="mb-4 rounded-2xl bg-secondary px-4 py-3 text-[15px] text-foreground">
          AI 대화: 최근 대화에서 대답이 한층 또렷해지셨어요.
        </p>

        <Card>
          <div className="flex items-baseline justify-between">
            <h2 className="text-[16px] font-bold">AQ 지수</h2>
            <p className="text-[15px] text-muted-foreground">9월 2일 기준</p>
          </div>
          <p className="mt-1 text-[40px] font-bold leading-none text-accent">{history[0]?.aq}</p>

          <div className="mt-3 h-64" aria-hidden>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData} outerRadius="72%">
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="item" tick={{ fill: "var(--foreground)", fontSize: 13 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="var(--accent)" fill="var(--primary)" fillOpacity={0.55} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 grid grid-cols-2 gap-2 text-[14px]">
            {aqParts.map((p) => (
              <li key={p.item} className="flex justify-between rounded-xl bg-secondary px-3 py-2">
                <span className="text-muted-foreground">{p.item}</span>
                <span className="font-semibold text-foreground">
                  {p.score} / {p.max}
                </span>
              </li>
            ))}
          </ul>
        </Card>


        <h2 className="mb-3 mt-7 text-[17px] font-bold">지난 보고서</h2>
        <ul className="space-y-3">
          {history.map((h) => (
            <li key={h.date}>
              <Link to="/report" className="card-soft flex items-center gap-3 p-4">
                <div className="flex-1">
                  <p className="text-[16px] font-semibold">{h.theme}</p>
                  <p className="mt-1 text-[14px] text-muted-foreground">{h.date} · AQ {h.aq}</p>
                </div>
                <ChevronRight size={22} strokeWidth={2.2} aria-hidden className="text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </Screen>
      <BottomNav />
    </>
  );
}
