import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Btn, Card, DuckSays, Loading, ProgressBar, Screen } from "@/components/app/ui";
import {
  SESSIONS,
  SESSION_TITLE,
  STEP_LABEL,
  stepWeight,
  totalItems,
  type SessionId,
  type SessionStep,
} from "@/lib/learning";
import cafe from "@/assets/cafe_1.jpg";
import { Volume2, Lightbulb, Mic, X, Check } from "lucide-react";

export const Route = createFileRoute("/learn/$themeId")({
  head: () => ({
    meta: [
      { title: "학습 세션 — 덕분이" },
      { name: "description", content: "알아듣기, 이름대기, 따라말하기, 자발화와 AI 대화를 차례로 연습해요." },
      { property: "og:title", content: "학습 세션 — 덕분이" },
      { property: "og:description", content: "생활 상황 속에서 한 걸음씩 말하기를 연습하는 세션이에요." },
    ],
  }),
  component: SessionPage,
});

function SessionPage() {
  const { themeId } = Route.useParams();
  const navigate = useNavigate();
  const id: SessionId = (["cafe", "hospital", "daily"] as const).includes(themeId as SessionId)
    ? (themeId as SessionId)
    : "daily";
  const steps = SESSIONS[id];

  const [idx, setIdx] = useState(0);
  const step = steps[idx]!;
  const total = totalItems(steps);
  const done = steps.slice(0, idx).reduce((n, s) => n + stepWeight(s), 0);

  const next = () => {
    if (idx + 1 >= steps.length) navigate({ to: "/report" });
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
          <ProgressBar value={((done + stepWeight(step)) / total) * 100} label="세션 진행률" />
        </div>
        <span className="text-[14px] font-semibold text-muted-foreground">
          {done + 1}/{total}
        </span>
      </header>

      <p className="mb-2 inline-flex rounded-full bg-secondary px-3 py-1 text-[13px] font-semibold text-accent">
        {SESSION_TITLE[id]} · {STEP_LABEL[step.kind]}
      </p>
      <h2 className="mb-4 text-[15px] font-semibold text-muted-foreground">{step.title}</h2>

      <StepView key={idx} step={step} onNext={next} />
    </Screen>
  );
}

function StepView({ step, onNext }: { step: SessionStep; onNext: () => void }) {
  if (step.kind === "listen") return <ListenStep step={step} onNext={onNext} />;
  if (step.kind === "naming") return <NamingStep step={step} onNext={onNext} />;
  if (step.kind === "repeat") return <RepeatStep sentence={step.sentence} onNext={onNext} />;
  if (step.kind === "spontaneous") return <SpontaneousStep prompt={step.prompt} onNext={onNext} />;
  return <ChatStep step={step} onNext={onNext} />;
}

function PlayButton({ label = "다시 듣기" }: { label?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
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
        {playing ? "들려드리고 있어요" : label}
      </p>
    </Card>
  );
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

  return (
    <div className="space-y-5">
      <h3 className="text-[20px] font-bold leading-snug">{step.prompt}</h3>

      <PlayButton />

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
            {picked === step.answer
              ? "정확히 들으셨어요. 잘하셨어요!"
              : `정답은 “${step.options[step.answer]}”예요.`}
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
      <h3 className="text-[20px] font-bold leading-snug">{step.prompt}</h3>
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

function Recorder({ onDone }: { onDone: () => void }) {
  const [state, setState] = useState<"idle" | "recording" | "scoring" | "done">("idle");
  return (
    <Card className="flex flex-col items-center gap-4 py-8">
      {state === "scoring" ? (
        <Loading message="말씀을 살펴보고 있어요" />
      ) : (
        <>
          <button
            onClick={() => {
              if (state === "recording") {
                setState("scoring");
                setTimeout(() => {
                  setState("done");
                  onDone();
                }, 1400);
              } else setState("recording");
            }}
            aria-label={state === "recording" ? "녹음 마치기" : "녹음하기"}
            className={`grid size-24 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-soft)] ${
              state === "recording" ? "animate-pulse bg-accent" : "bg-[image:var(--gradient-brand)]"
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
  );
}

function RepeatStep({ sentence, onNext }: { sentence: string; onNext: () => void }) {
  const [recorded, setRecorded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-5">
      <Card className="py-7 text-center">
        <p className="text-[13px] font-semibold text-muted-foreground">제시어</p>
        <p className="mt-2 text-[22px] font-bold leading-snug">{sentence}</p>
      </Card>

      <PlayButton />
      <Recorder onDone={() => setRecorded(true)} />

      {submitted ? (
        <>
          <DuckSays>또박또박 따라 말씀해 주셨어요.</DuckSays>
          <Btn full onClick={onNext}>
            다음
          </Btn>
        </>
      ) : (
        <Btn full disabled={!recorded} onClick={() => setSubmitted(true)}>
          제출하기
        </Btn>
      )}
    </div>
  );
}

function SpontaneousStep({ prompt, onNext }: { prompt: string; onNext: () => void }) {
  const [recorded, setRecorded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-5">
      <h3 className="text-[20px] font-bold leading-snug">{prompt}</h3>
      <img
        src={cafe}
        alt="말씀하실 상황 이미지"
        loading="lazy"
        width={1024}
        height={768}
        className="h-52 w-full rounded-3xl object-cover shadow-[var(--shadow-card)]"
      />

      <Recorder onDone={() => setRecorded(true)} />

      {submitted ? (
        <>
          <DuckSays>문장 길이도 알맞았어요.</DuckSays>
          <Btn full onClick={onNext}>
            다음
          </Btn>
        </>
      ) : (
        <Btn full disabled={!recorded} onClick={() => setSubmitted(true)}>
          제출하기
        </Btn>
      )}
    </div>
  );
}

function ChatStep({
  step,
  onNext,
}: {
  step: Extract<SessionStep, { kind: "chat" }>;
  onNext: () => void;
}) {
  const [turn, setTurn] = useState(1);
  const [waiting, setWaiting] = useState(false);
  const [log, setLog] = useState<{ who: "ai" | "me"; text: string }[]>([
    { who: "ai", text: step.turns[0]! },
  ]);

  const atMax = turn >= step.maxTurns;
  const canFinish = turn >= step.minTurns;

  const reply = () => {
    setLog((l) => [...l, { who: "me", text: "네, 말씀드렸어요." }]);
    setWaiting(true);
    setTimeout(() => {
      setWaiting(false);
      const nextIdx = turn;
      if (step.turns[nextIdx] && nextIdx < step.maxTurns) {
        setLog((l) => [...l, { who: "ai", text: step.turns[nextIdx]! }]);
        setTurn(nextIdx + 1);
      } else {
        setTurn(step.maxTurns);
      }
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[15px] text-muted-foreground">덕분이와 이야기 나누기</p>
        <span className="rounded-full bg-secondary px-3 py-1 text-[13px] font-semibold text-accent">
          {turn}/{step.maxTurns}턴
        </span>
      </div>

      <ul className="space-y-4 rounded-3xl bg-secondary/50 p-4">
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

      <Btn full disabled={waiting || atMax} onClick={reply}>
        <Mic size={20} fill="currentColor" strokeWidth={0} aria-hidden />
        답하기
      </Btn>
      {canFinish ? (
        <Btn full variant="outline" disabled={waiting} onClick={onNext}>
          끝내기
        </Btn>
      ) : null}
    </div>
  );
}
