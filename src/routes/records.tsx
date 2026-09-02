import { createFileRoute, Link } from "@tanstack/react-router";
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
  { date: "9월 1일", theme: "시장 가는 길", aq: 85.2 },
  { date: "8월 31일", theme: "동네 카페에서", aq: 83.0 },
  { date: "8월 29일", theme: "시장 가는 길", aq: 80.4 },
];

function RecordsPage() {
  const max = 100;
  return (
    <>
      <Screen>
        <PageTitle title="학습 기록" desc="조금씩 쌓인 연습을 살펴보세요." />

        <Card>
          <h2 className="text-[16px] font-bold">AQ 지수 변화</h2>
          <div className="mt-5 flex h-40 items-end justify-between gap-3">
            {[...history].reverse().map((h) => (
              <div key={h.date} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[13px] font-semibold text-accent">{h.aq}</span>
                <div
                  className="w-full rounded-t-xl bg-[image:var(--gradient-brand)]"
                  style={{ height: `${(h.aq / max) * 100}%` }}
                />
                <span className="text-[12px] text-muted-foreground">{h.date}</span>
              </div>
            ))}
          </div>
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
