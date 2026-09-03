import { useState } from "react";
import { Btn, DuckSays, Loading } from "@/components/app/ui";
import { Mic } from "lucide-react";
import type { SessionStep } from "@/lib/learning";

export function ChatStep({
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
