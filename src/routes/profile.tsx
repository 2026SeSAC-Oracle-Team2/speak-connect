import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card, PageTitle, Screen } from "@/components/app/ui";
import { BottomNav } from "@/components/app/BottomNav";
import { ChevronRight } from "lucide-react";
import duck from "@/assets/duck.png";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "프로필 — 덕분이" },
      { name: "description", content: "프로필과 알림, 계정 설정을 한 곳에서 편하게 관리하세요." },
      { property: "og:title", content: "프로필 — 덕분이" },
      { property: "og:description", content: "프로필 편집, 알림 설정, 계정 관리를 모았어요." },
    ],
  }),
  component: ProfilePage,
});

function Toggle({ label, desc, defaultOn = true }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="flex-1">
        <p className="text-[16px] font-semibold">{label}</p>
        <p className="mt-1 text-[14px] text-muted-foreground">{desc}</p>
      </div>
      <button
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn(!on)}
        className={`h-8 w-14 shrink-0 rounded-full p-1 transition-colors ${on ? "bg-[image:var(--gradient-brand)]" : "bg-secondary"}`}
      >
        <span
          className={`block size-6 rounded-full bg-card shadow transition-transform ${on ? "translate-x-6" : ""}`}
        />
      </button>
    </div>
  );
}

function ProfilePage() {
  return (
    <>
      <Screen>
        <PageTitle title="프로필" />

        <Card className="flex items-center gap-4">
          <img
            src={duck}
            alt="프로필 사진"
            width={64}
            height={64}
            style={{ width: 64, height: 64 }}
            className="shrink-0 rounded-full bg-secondary object-contain"
          />
          <div className="flex-1">
            <p className="text-[19px] font-bold">덕분님</p>
            <p className="mt-0.5 text-[14px] text-muted-foreground">Google 계정으로 연결됨</p>
          </div>
          <Link to="/profile/edit" aria-label="프로필 편집" className="text-muted-foreground">
            <ChevronRight size={22} strokeWidth={2.2} aria-hidden />
          </Link>
        </Card>

        <h2 className="mb-2 mt-7 text-[15px] font-bold text-muted-foreground">설정</h2>
        <Card className="divide-y divide-border py-1">
          <Link to="/profile/edit" className="flex items-center justify-between py-3 text-[16px] font-semibold">
            프로필 편집
            <ChevronRight size={20} strokeWidth={2.2} aria-hidden className="text-muted-foreground" />
          </Link>
          <Toggle label="푸시 알림" desc="오늘의 덕담, 주간 요약을 보내드려요." />
          <Toggle label="연습 알림" desc="정하신 시간에 부담 없이 알려드려요." />
          <div className="flex items-center justify-between py-3">
            <p className="text-[16px] font-semibold">알림 시간 설정</p>
            <p className="text-[16px] font-semibold text-accent">오전 10:00</p>
          </div>
        </Card>

        <Card className="mt-4 divide-y divide-border py-1">
          <button className="flex w-full items-center justify-between py-3 text-left text-[16px] font-semibold">
            로그아웃
            <ChevronRight size={20} strokeWidth={2.2} aria-hidden className="text-muted-foreground" />
          </button>
          <button className="flex w-full items-center justify-between py-3 text-left text-[16px] font-semibold text-destructive">
            회원탈퇴
            <ChevronRight size={20} strokeWidth={2.2} aria-hidden />
          </button>
        </Card>
      </Screen>
      <BottomNav />
    </>
  );
}
