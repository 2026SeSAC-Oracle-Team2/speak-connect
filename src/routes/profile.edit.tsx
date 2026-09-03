import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Btn, Card, Screen } from "@/components/app/ui";
import { ChevronLeft, Camera } from "lucide-react";
import duck from "@/assets/duck.png";

export const Route = createFileRoute("/profile/edit")({
  head: () => ({
    meta: [
      { title: "프로필 편집 — 덕분이" },
      { name: "description", content: "프로필 사진과 닉네임을 바꿔 보세요." },
      { property: "og:title", content: "프로필 편집 — 덕분이" },
      { property: "og:description", content: "프로필 사진과 닉네임을 바꿔 보세요." },
    ],
  }),
  component: ProfileEditPage,
});

function ProfileEditPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("덕분님");

  return (
    <Screen className="pb-10">
      <header className="mb-6 flex items-center gap-3">
        <Link
          to="/profile"
          aria-label="뒤로 가기"
          className="grid size-11 place-items-center rounded-2xl bg-card text-muted-foreground"
        >
          <ChevronLeft size={24} strokeWidth={2.2} aria-hidden />
        </Link>
        <h1 className="text-[20px] font-bold">프로필 편집</h1>
      </header>

      <Card className="flex flex-col items-center gap-4 py-8">
        <div className="relative">
          <img
            src={duck}
            alt="현재 프로필 사진"
            width={112}
            height={112}
            style={{ width: 112, height: 112 }}
            className="rounded-full bg-secondary object-contain"
          />
          <button
            aria-label="프로필 사진 바꾸기"
            className="absolute -bottom-1 -right-1 grid size-11 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-soft)]"
          >
            <Camera size={22} fill="currentColor" strokeWidth={0} aria-hidden />
          </button>
        </div>
        <p className="text-[15px] text-muted-foreground">프로필 사진</p>
      </Card>

      <label className="mt-6 block text-[16px] font-semibold" htmlFor="nickname">
        프로필 닉네임
      </label>
      <input
        id="nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="mt-2 min-h-[56px] w-full rounded-2xl border-2 border-border bg-card px-4 text-[17px]"
      />

      <Btn full className="mt-8" onClick={() => navigate({ to: "/profile" })}>
        저장하기
      </Btn>
    </Screen>
  );
}
