import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Btn, Card, DuckSays, Loading, ProgressBar, Screen } from "@/components/app/ui";
import { SESSIONS, STEP_LABEL, THEMES, type SessionStep, type ThemeId } from "@/lib/learning";
import cafe from "@/assets/cafe_1.jpg";
import { Volume2, Lightbulb, Mic, X, Check } from "lucide-react";

export const Route = createFileRoute("/learn/$themeId")({
  head: () => ({
    meta: [
      { title: "테마 학습 세션 — 덕분이" },
      { name: "description", content: "알아듣기, 이름대기, 따라말하기, 자발화와 AI 대화를 차례로 연습해요." },
      { property: "og:title", content: "테마 학습 세션 — 덕분이" },
      { property: "og:description", content: "생활 상황 속에서 한 걸음씩 말하기를 연습하는 세션이에요." },
    ],
  }),
  component: SessionPage,
});

function SessionPage() {
  const { themeId } = Route.useParams();
  const navigate = useNavigate();
  const theme = THEMES.find((t) => t.id === (themeId as ThemeId)) ?? THEMES[0]!;
  const steps = SESSIONS[theme.id];

  const [idx, setIdx] = useState(0);
  const step = steps[idx]!;
  const total = steps.length;

  const next = () => {
    if (idx + 1 >= total) navigate({ to: "/report" });
    else setIdx(idx + 1);
  };

  return (
    <Screen className="pb-10">
      <header className="mb-5 flex items-center gap-3">
        <Link
          to="/learn"
          aria-label="학습 목록으로 나가기"
          className="grid size-11 place-items-center rounded-2xl bg-card text-muted-foreground"
        >
          <X size={22} strokeWidth={2.2} aria-hidden />
        </Link>
        <div className="flex-1">
          <ProgressBar value={((idx + 1) / total) * 100} label="세션 진행률" />
        </div>
        <span className="text-[14px] font-semibold text-muted-foreground">
          {idx + 1}/{total}
        </span>
      </header>

      <p className="mb-4 inline-flex rounded-full bg-secondary px-3 py-1 text-[13px] font-semibold text-accent">
        {theme.title} · {STEP_LABEL[step.kind]}
      </p>

      <StepView key={idx} step={step} onNext={next} />
    </Screen>
  );
}

function StepView({ step, onNext }: { step: SessionStep; onNext: () => void }) {
  if (step.kind === "listen") return <ListenStep step={step} onNext={onNext} />;
  if (step.kind === "naming") return <NamingStep step={step} onNext={onNext} />;
  if (step.kind === "repeat") return <SpeakStep title={step.sentence} guide="문장을 그대로 따라 말해 주세요." onNext={onNext} />;
  if (step.kind === "spontaneous") return <SpeakStep title={step.prompt} guide="편하신 만큼 자유롭게 말씀해 주세요." onNext={onNext} />;
  return <ChatStep turns={step.turns} onNext={onNext} />;
}

function ListenStep({
  step,
  onNext,
}: {
  step: Extract<SessionStep, { kind: "listen" }>;
  onNext: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="space-y-5">
      <h2 className="text-[20px] font-bold leading-snug">{step.prompt}</h2>

      <Card className="flex flex-col items-center gap-3 py-7">
        <button
          onClick={() => {
            setPlaying(true);
            setTimeout(() => setPlaying(false), 1200);
          }}
          className="grid size-20 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-soft)]"
          aria-label="문장 다시 듣기"
        >
          <Volume2 size={34} fill="currentColor" strokeWidth={0} aria-hidden />
        </button>
        <p className="text-[15px] text-muted-foreground" aria-live="polite">
          {playing ? "들려드리고 있어요" : "다시 듣기"}
        </p>
      </Card>

      <ul className="space-y-3">
        {step.options.map((o, i) => {
          const on = picked === i;
          const correct = submitted && i === step.answer;
          const wrong = submitted && on && i !== step.answer;
          return (
            <li key={o}>
              <button
                disabled={submitted}
                aria-pressed={on}
                onClick={() => setPicked(i)}
                className={`min-h-[64px] w-full rounded-2xl border-2 px-4 text-left text-[17px] font-medium ${
                  correct
                    ? "border-success bg-success/10"
                    : wrong
                      ? "border-destructive bg-destructive/10"
                      : on
                        ? "border-primary bg-secondary"
                        : "border-border bg-card"
                }`}
              >
                {o}
              </button>
            </li>
          );
        })}
      </ul>

      {submitted ? (
        <>
          <DuckSays>
            {picked === step.answer ? "정확히 들으셨어요. 잘하셨어요!" : `정답은 “${step.options[step.answer]}”예요. 다시 들어보면 더 또렷해요.`}
          </DuckSays>
          <Btn full onClick={onNext}>
            다음
          </Btn>
        </>
      ) : (
        <Btn full disabled={picked === null} onClick={() => setSubmitted(true)}>
          제출하기
        </Btn>
      )}
    </div>
  );
}

function NamingStep({
  step,
  onNext,
}: {
  step: Extract<SessionStep, { kind: "naming" }>;
  onNext: () => void;
}) {
  const [hint, setHint] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="space-y-5">
      <h2 className="text-[20px] font-bold leading-snug">{step.prompt}</h2>
      <img
        src={cafe}
        alt="이름을 말할 사진"
        loading="lazy"
        width={1024}
        height={768}
        className="h-52 w-full rounded-3xl object-cover shadow-[var(--shadow-card)]"
      />

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={submitted}
        aria-label="답 입력"
        placeholder="이름을 말하거나 적어 주세요"
        className="min-h-[56px] w-full rounded-2xl border-2 border-border bg-card px-4 text-[17px]"
      />

      <div className="flex gap-3">
        <Btn variant="outline" className="flex-1" onClick={() => setHint(true)} disabled={submitted}>
          <Lightbulb size={20} fill="currentColor" strokeWidth={0} aria-hidden />
          힌트 보기
        </Btn>
        <Btn className="flex-1" disabled={submitted || !value} onClick={() => setSubmitted(true)}>
          제출하기
        </Btn>
      </div>

      {hint && !submitted ? <DuckSays>{step.hint}</DuckSays> : null}

      {submitted ? (
        <>
          <Card className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-success/15 text-success">
              <Check size={22} strokeWidth={2.5} aria-hidden />
            </span>
            <p className="text-[17px]">
              정답은 <strong>{step.answer}</strong>예요.
            </p>
          </Card>
          <Btn full onClick={onNext}>
            다음
          </Btn>
        </>
      ) : null}
    </div>
  );
}

function SpeakStep({
  title,
  guide,
  onNext,
}: {
  title: string;
  guide: string;
  onNext: () => void;
}) {
  const [state, setState] = useState<"idle" | "recording" | "scoring" | "done">("idle");

  return (
    <div className="space-y-5">
      <h2 className="text-[20px] font-bold leading-snug">{title}</h2>
      <p className="text-[15px] text-muted-foreground">{guide}</p>

      <Card className="flex flex-col items-center gap-4 py-8">
        {state === "scoring" ? (
          <Loading message="말씀을 살펴보고 있어요" />
        ) : (
          <>
            <button
              onClick={() => {
                if (state === "recording") {
                  setState("scoring");
                  setTimeout(() => setState("done"), 1400);
                } else setState("recording");
              }}
              aria-label={state === "recording" ? "녹음 마치기" : "녹음하기"}
              className={`grid size-24 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-soft)] ${
                state === "recording"
                  ? "animate-pulse bg-accent"
                  : "bg-[image:var(--gradient-brand)]"
              }`}
            >
              <Mic size={40} fill="currentColor" strokeWidth={0} aria-hidden />
            </button>
            <p className="text-[15px] text-muted-foreground" aria-live="polite">
              {state === "recording"
                ? "듣고 있어요. 마치시면 눌러 주세요."
                : state === "done"
                  ? "잘 담겼어요."
                  : "버튼을 누르고 말씀해 주세요."}
            </p>
          </>
        )}
      </Card>

      {state === "done" ? (
        <>
          <DuckSays>또박또박 말씀해 주셨어요. 문장 길이도 알맞았어요.</DuckSays>
          <Btn full onClick={onNext}>
            다음
          </Btn>
        </>
      ) : (
        <Btn full variant="soft" onClick={onNext}>
          건너뛰기
        </Btn>
      )}
    </div>
  );
}

function ChatStep({ turns, onNext }: { turns: string[]; onNext: () => void }) {
  const [turn, setTurn] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [log, setLog] = useState<{ who: "ai" | "me"; text: string }[]>([
    { who: "ai", text: turns[0]! },
  ]);

  const reply = () => {
    setLog((l) => [...l, { who: "me", text: "네, 말씀드렸어요." }]);
    setWaiting(true);
    setTimeout(() => {
      const nextTurn = turn + 1;
      setWaiting(false);
      setTurn(nextTurn);
      if (turns[nextTurn]) setLog((l) => [...l, { who: "ai", text: turns[nextTurn]! }]);
    }, 1200);
  };

  const finished = turn >= turns.length - 1;

  return (
    <div className="space-y-5">
      <h2 className="text-[20px] font-bold leading-snug">덕분이와 이야기 나누기</h2>
      <p className="text-[15px] text-muted-foreground">{turn + 1} / {turns.length}번째 대화예요.</p>

      <ul className="space-y-3">
        {log.map((m, i) => (
          <li key={i} className={m.who === "me" ? "flex justify-end" : ""}>
            {m.who === "ai" ? (
              <DuckSays size={48}>{m.text}</DuckSays>
            ) : (
              <p className="max-w-[80%] rounded-2xl rounded-br-md bg-[image:var(--gradient-brand)] px-4 py-3 text-[15px] text-primary-foreground">
                {m.text}
              </p>
            )}
          </li>
        ))}
      </ul>

      {waiting ? <Loading message="덕분이가 답을 준비하고 있어요" /> : null}

      {finished && !waiting ? (
        <Btn full onClick={onNext}>
          학습 마치고 보고서 보기
        </Btn>
      ) : (
        <Btn full disabled={waiting} onClick={reply}>
          <Mic size={20} fill="currentColor" strokeWidth={0} aria-hidden />
          답하기
        </Btn>
      )}
    </div>
  );
}
