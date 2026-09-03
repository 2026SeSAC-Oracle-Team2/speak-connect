export const INTEREST_TAGS = [
  "건강관리",
  "등산",
  "골프",
  "여행",
  "트로트",
  "요리",
  "텃밭가꾸기",
  "낚시",
  "독서",
  "바둑",
  "사진",
  "전시관람",
  "국내여행",
  "반려동물",
  "봉사활동",
] as const;

export const SURVEY_ITEMS = [
  "일상에서 하고 싶은 말을 어렵지 않게 표현하시나요?",
  "상대방의 말을 끝까지 이해하는 편이신가요?",
  "물건이나 사람의 이름이 잘 떠오르시나요?",
  "들은 문장을 그대로 따라 말하기가 편하신가요?",
  "대화를 이어가는 데 부담이 적으신가요?",
] as const;

export const SURVEY_SCALE = [
  { value: 1, label: "전혀 아니에요" },
  { value: 2, label: "조금 어려워요" },
  { value: 3, label: "보통이에요" },
  { value: 4, label: "대체로 편해요" },
  { value: 5, label: "아주 편해요" },
];

export type ThemeId = "cafe" | "hospital";

export const THEMES: {
  id: ThemeId;
  title: string;
  subtitle: string;
  minutes: number;
}[] = [
  { id: "cafe", title: "동네 카페에서", subtitle: "주문하고 이야기 나누기", minutes: 8 },
  { id: "hospital", title: "병원에서 진료받기", subtitle: "접수하고 증상 말하기", minutes: 8 },
];

export type StepKind = "listen" | "naming" | "repeat" | "spontaneous" | "chat";

export const STEP_LABEL: Record<StepKind, string> = {
  listen: "알아듣기",
  naming: "이름대기",
  repeat: "따라말하기",
  spontaneous: "자발화",
  chat: "AI 대화",
};

export type SessionStep =
  | { kind: "listen"; prompt: string; audioText: string; options: [string, string]; answer: 0 | 1 }
  | { kind: "naming"; prompt: string; hint: string; answer: string }
  | { kind: "repeat"; sentence: string }
  | { kind: "spontaneous"; prompt: string }
  | { kind: "chat"; turns: string[] };

export const SESSIONS: Record<ThemeId, SessionStep[]> = {
  cafe: [
    {
      kind: "listen",
      prompt: "들려드린 문장에 맞는 답을 골라 주세요.",
      audioText: "따뜻한 커피 한 잔 주세요.",
      options: ["따뜻한 커피를 주문했어요", "차가운 주스를 주문했어요"],
      answer: 0,
    },
    {
      kind: "listen",
      prompt: "들려드린 문장에 맞는 답을 골라 주세요.",
      audioText: "창가 자리에 앉을게요.",
      options: ["문 앞에 서 있어요", "창가 자리에 앉아요"],
      answer: 1,
    },
    { kind: "naming", prompt: "사진 속 장소의 이름을 말씀해 주세요.", hint: "커피를 마시는 곳이에요", answer: "카페" },
    { kind: "naming", prompt: "사진 속 물건의 이름을 말씀해 주세요.", hint: "받침 위에 놓인 잔이에요", answer: "커피잔" },
    { kind: "repeat", sentence: "커피 한 잔 부탁드립니다." },
    { kind: "repeat", sentence: "창가 자리에 앉아도 될까요?" },
    { kind: "spontaneous", prompt: "카페에서 커피를 주문하는 장면을 말씀해 주세요." },
    { kind: "spontaneous", prompt: "좋아하시는 음료와 그 이유를 들려주세요." },
    {
      kind: "chat",
      turns: [
        "오늘 카페에 오셨네요. 어떤 음료가 마시고 싶으세요?",
        "좋은 선택이에요. 따뜻하게 드릴까요, 차갑게 드릴까요?",
        "자리는 창가와 안쪽 중 어디가 편하실까요?",
        "편안한 시간 보내세요. 오늘 이야기 나눠 주셔서 고맙습니다.",
      ],
    },
  ],
  hospital: [
    {
      kind: "listen",
      prompt: "들려드린 문장에 맞는 답을 골라 주세요.",
      audioText: "진료 접수를 하러 왔어요.",
      options: ["진료를 접수하러 왔어요", "약을 사러 왔어요"],
      answer: 0,
    },
    {
      kind: "listen",
      prompt: "들려드린 문장에 맞는 답을 골라 주세요.",
      audioText: "어제부터 목이 아팠어요.",
      options: ["다리를 다쳤어요", "어제부터 목이 아팠어요"],
      answer: 1,
    },
    { kind: "naming", prompt: "사진 속 장소의 이름을 말씀해 주세요.", hint: "진료를 받는 곳이에요", answer: "병원" },
    { kind: "naming", prompt: "사진 속 물건의 이름을 말씀해 주세요.", hint: "몸의 열을 재는 물건이에요", answer: "체온계" },
    { kind: "repeat", sentence: "진료 접수 부탁드립니다." },
    { kind: "repeat", sentence: "어제부터 목이 아팠습니다." },
    { kind: "spontaneous", prompt: "병원에서 접수하는 장면을 말씀해 주세요." },
    { kind: "spontaneous", prompt: "요즘 몸 상태가 어떠신지 들려주세요." },
    {
      kind: "chat",
      turns: [
        "병원에 오셨네요. 어디가 불편하셔서 오셨어요?",
        "언제부터 그러셨는지 말씀해 주시겠어요?",
        "지금 드시고 계신 약이 있으실까요?",
        "곧 진료 시작할게요. 오늘 이야기 나눠 주셔서 고맙습니다.",
      ],
    },
  ],
};

export type Scores = {
  spontaneous: number; // 20점
  comprehension: number; // 10점
  repetition: number; // 10점
  naming: number; // 10점
};

export function calcAQ(s: Scores) {
  return Math.round(
    (s.spontaneous + s.comprehension / 20 + s.repetition / 10 + s.naming / 10) * 2 * 10,
  ) / 10;
}
