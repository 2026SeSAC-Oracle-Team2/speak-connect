import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Btn, Card, DuckSays, PageTitle, ProgressBar, Screen } from "@/components/app/ui";
import { SURVEY_ITEMS, SURVEY_SCALE } from "@/lib/learning";

export const Route = createFileRoute("/survey")({
  head: () => ({
    meta: [
      { title: "시작 설문 — 덕분이" },
      { name: "description", content: "다섯 가지 문항에 답해 주시면 오늘의 연습을 준비해 드려요." },
      { property: "og:title", content: "시작 설문 — 덕분이" },
      { property: "og:description", content: "5문항 5점 척도로 간단히 현재 상태를 확인해요." },
    ],
  }),
  component: SurveyPage,
});

function SurveyPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const done = Object.keys(answers).length;

  return (
    <Screen>
      <PageTitle title="지금 상태를 알려주세요" desc="정답은 없어요. 느끼시는 대로 골라 주세요." />
      <div className="mb-5 space-y-2">
        <ProgressBar value={(done / SURVEY_ITEMS.length) * 100} label="설문 진행률" />
        <p className="text-[14px] text-muted-foreground">
          {done} / {SURVEY_ITEMS.length} 문항
        </p>
      </div>
      <DuckSays>편하게 답하셔도 돼요. 결과로 난이도를 나누지 않아요.</DuckSays>

      <div className="mt-6 space-y-4">
        {SURVEY_ITEMS.map((q, i) => (
          <Card key={q}>
            <fieldset>
              <legend className="text-[16px] font-semibold leading-snug">
                {i + 1}. {q}
              </legend>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {SURVEY_SCALE.map((s) => {
                  const on = answers[i] === s.value;
                  return (
                    <label
                      key={s.value}
                      title={s.label}
                      className={`flex min-h-[56px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 text-[17px] font-semibold ${
                        on ? "border-primary bg-secondary text-accent" : "border-border bg-card"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q${i}`}
                        className="sr-only"
                        aria-label={`${s.value}점 ${s.label}`}
                        onChange={() => setAnswers((p) => ({ ...p, [i]: s.value }))}
                      />
                      {s.value}
                    </label>
                  );
                })}
              </div>
              <div className="mt-2 flex justify-between text-[13px] text-muted-foreground">
                <span>{SURVEY_SCALE[0].label}</span>
                <span>{SURVEY_SCALE[4].label}</span>
              </div>
            </fieldset>
          </Card>
        ))}

        <Btn full disabled={done < SURVEY_ITEMS.length} onClick={() => navigate({ to: "/home" })}>
          답변 마치기
        </Btn>
      </div>
    </Screen>
  );
}
