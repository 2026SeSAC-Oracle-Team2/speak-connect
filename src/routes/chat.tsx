import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { ChatStep } from "@/components/app/ChatStep";
import { Screen } from "@/components/app/ui";
import { SESSIONS } from "@/lib/learning";
import { X } from "lucide-react";

const dailyChat = SESSIONS.daily.find((s) => s.kind === "chat")! as Extract<
  (typeof SESSIONS.daily)[number],
  { kind: "chat" }
>;

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "덕분이와 대화하기 — 덕분이" },
      { name: "description", content: "덕분이와 편하게 이야기를 나누며 말하기를 연습해요." },
      { property: "og:title", content: "덕분이와 대화하기 — 덕분이" },
      { property: "og:description", content: "4~8턴 동안 덕분이와 일상 이야기를 나눠요." },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const navigate = useNavigate();

  return (
    <Screen className="pb-10">
      <header className="mb-5 flex items-center gap-3">
        <Link
          to="/home"
          aria-label="홈으로 나가기"
          className="grid size-11 place-items-center rounded-2xl bg-card text-muted-foreground"
        >
          <X size={22} strokeWidth={2.2} aria-hidden />
        </Link>
        <h1 className="text-[17px] font-bold">덕분이와 대화하기</h1>
      </header>

      <ChatStep step={dailyChat} onNext={() => navigate({ to: "/home" })} />
    </Screen>
  );
}
