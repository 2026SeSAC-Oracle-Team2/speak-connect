import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, PageTitle, Screen } from "@/components/app/ui";
import { BottomNav } from "@/components/app/BottomNav";
import { ChevronRight, Camera, Check, Pencil } from "lucide-react";
import duck from "@/assets/duck.png";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "프로필 — 덕분이" },
      { name: "description", content: "프로필 사진과 닉네임, 알림, 계정 설정을 한 곳에서 편하게 관리하세요." },
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
  const [photo, setPhoto] = useState<string>(duck);
  const [nickname, setNickname] = useState("덕분님");
  const [draft, setDraft] = useState(nickname);
  const [editing, setEditing] = useState(false);
  const [time, setTime] = useState("10:00");

  function saveNickname() {
    const next = draft.trim();
    if (next) setNickname(next);
    setDraft(next || nickname);
    setEditing(false);
  }

  return (
    <>
      <Screen>
        <PageTitle title="프로필" />

        <Card className="flex items-center gap-4">
          <label className="relative shrink-0 cursor-pointer">
            <img
              src={photo}
              alt="프로필 사진"
              width={64}
              height={64}
              style={{ width: 64, height: 64 }}
              className="size-16 rounded-full bg-secondary object-cover"
            />
            <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-soft)]">
              <Camera size={15} strokeWidth={2.4} aria-hidden />
            </span>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              aria-label="프로필 사진 변경"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPhoto(URL.createObjectURL(file));
              }}
            />
          </label>
          <div className="flex-1">
            {editing ? (
              <div className="flex items-center gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveNickname();
                    if (e.key === "Escape") setEditing(false);
                  }}
                  autoFocus
                  aria-label="닉네임"
                  maxLength={12}
                  className="min-w-0 flex-1 rounded-xl border border-input bg-background px-3 py-2 text-[17px] font-bold"
                />
                <button
                  onClick={saveNickname}
                  aria-label="닉네임 저장"
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[image:var(--gradient-brand)] text-primary-foreground"
                >
                  <Check size={19} strokeWidth={2.6} aria-hidden />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setDraft(nickname);
                  setEditing(true);
                }}
                className="group flex items-center gap-1.5"
                aria-label="닉네임 편집"
              >
                <span className="text-[19px] font-bold">{nickname}</span>
                <Pencil size={16} strokeWidth={2.2} aria-hidden className="text-muted-foreground" />
              </button>
            )}
            <p className="mt-0.5 text-[14px] text-muted-foreground">Google 계정으로 연결됨</p>
          </div>
        </Card>

        <h2 className="mb-2 mt-7 text-[15px] font-bold text-muted-foreground">설정</h2>
        <Card className="divide-y divide-border py-1">
          <Toggle label="푸시 알림" desc="오늘의 덕담, 주간 요약을 보내드려요." />
          <Toggle label="연습 알림" desc="정하신 시간에 부담 없이 알려드려요." />
          <div className="flex items-center justify-between gap-4 py-3">
            <p className="text-[16px] font-semibold">알림 시간 설정</p>
            <label className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-1.5">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                aria-label="알림 시간 선택"
                className="bg-transparent text-[16px] font-semibold text-accent outline-none"
              />
            </label>
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
