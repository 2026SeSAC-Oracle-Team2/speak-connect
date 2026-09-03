import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Btn, Card, DuckSays, PageTitle, Screen } from "@/components/app/ui";
import { INTEREST_TAGS } from "@/lib/learning";
import { Camera, Check } from "lucide-react";
import duck from "@/assets/duck.png";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "회원가입 — 덕분이" },
      { name: "description", content: "이름, 성별, 나이, 취미와 관심사를 알려주시면 맞춤 학습을 준비해 드려요." },
      { property: "og:title", content: "회원가입 — 덕분이" },
      { property: "og:description", content: "관심사에 맞춘 생활 기반 말하기 연습을 준비해 드려요." },
    ],
  }),
  component: SignupPage,
});

const field =
  "w-full min-h-[52px] rounded-2xl border-2 border-border bg-card px-4 text-[17px] text-foreground placeholder:text-muted-foreground";

function SignupPage() {
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [name, setName] = useState("");

  const toggle = (t: string) =>
    setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <Screen>
      <PageTitle title="반가워요, 몇 가지만 알려주세요" desc="연습 내용을 편하게 맞춰 드릴게요." />
      <DuckSays>천천히 하셔도 괜찮아요. 나중에 설정에서 바꾸실 수 있어요.</DuckSays>

      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/survey" });
        }}
      >
        <div className="space-y-2">
          <label htmlFor="name" className="block text-[15px] font-semibold">
            이름
          </label>
          <input
            id="name"
            className={field}
            placeholder="예) 김덕분"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <fieldset className="space-y-2">
          <legend className="mb-2 text-[15px] font-semibold">성별</legend>
          <div className="flex gap-3">
            {["여성", "남성", "선택 안 함"].map((g) => (
              <label
                key={g}
                className="flex flex-1 min-h-[52px] cursor-pointer items-center justify-center rounded-2xl border-2 border-border bg-card text-[15px] font-medium has-[:checked]:border-primary has-[:checked]:bg-secondary"
              >
                <input type="radio" name="gender" value={g} className="sr-only" />
                {g}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="space-y-2">
          <label htmlFor="age" className="block text-[15px] font-semibold">
            나이
          </label>
          <input id="age" type="number" min={1} max={120} className={field} placeholder="예) 62" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="hobby" className="block text-[15px] font-semibold">
            취미
          </label>
          <input id="hobby" className={field} placeholder="예) 산책, 텃밭 가꾸기" />
        </div>

        <Card className="space-y-3">
          <div>
            <h2 className="text-[15px] font-semibold">관심사 태그</h2>
            <p className="mt-1 text-[14px] text-muted-foreground">
              고르신 만큼 대화 주제가 가까워져요. ({tags.length}개 선택)
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {INTEREST_TAGS.map((t) => {
              const on = tags.includes(t);
              return (
                <li key={t}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(t)}
                    className={`flex min-h-[44px] items-center gap-1.5 rounded-full border-2 px-4 text-[15px] transition-colors ${
                      on
                        ? "border-primary bg-[image:var(--gradient-brand)] font-semibold text-primary-foreground"
                        : "border-border bg-card text-foreground"
                    }`}
                  >
                    {on ? <Check size={16} strokeWidth={2.5} aria-hidden /> : null}
                    {t}
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>

        <Btn full type="submit">
          다음으로
        </Btn>
      </form>
    </Screen>
  );
}
