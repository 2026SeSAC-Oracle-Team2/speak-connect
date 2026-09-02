import { createFileRoute } from "@tanstack/react-router";
import { Card, PageTitle, Screen } from "@/components/app/ui";
import { BottomNav } from "@/components/app/BottomNav";
import { Bell, Sparkles } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "알림 — 덕분이" },
      { name: "description", content: "오늘의 덕담과 연습 리마인더를 확인해 보세요." },
      { property: "og:title", content: "알림 — 덕분이" },
      { property: "og:description", content: "가벼운 초대와 부담 없는 연습 리마인더를 보내드려요." },
    ],
  }),
  component: NotificationsPage,
});

const list = [
  { type: "일반", icon: Sparkles, text: "오늘의 덕담이 도착했어요. 잠시 마음을 나눠볼까요?", time: "방금" },
  { type: "연습", icon: Bell, text: "오늘의 짧은 연습, 편하실 때 이어서 해보세요.", time: "1시간 전" },
  { type: "연습", icon: Bell, text: "어제 하던 연습이 남아 있어요. 3분이면 충분해요.", time: "어제" },
  { type: "일반", icon: Sparkles, text: "이번 주 연습 요약이 준비됐어요. 함께 살펴볼까요?", time: "3일 전" },
];

function NotificationsPage() {
  return (
    <>
      <Screen>
        <PageTitle title="알림" desc="오늘도 편안한 속도로 함께해요." />
        <ul className="space-y-3">
          {list.map((n, i) => (
            <li key={i}>
              <Card className="flex gap-3 p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-accent">
                  <n.icon size={22} strokeWidth={2.2} aria-hidden />
                </span>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-accent">{n.type} 알림</p>
                  <p className="mt-1 text-[15px] leading-relaxed">{n.text}</p>
                  <p className="mt-1 text-[13px] text-muted-foreground">{n.time}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Screen>
      <BottomNav />
    </>
  );
}
