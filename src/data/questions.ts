export interface Question {
  id: number;
  scenario: string;
  optionA: string;
  optionB: string;
  correct: "A" | "B"; // A = Healthy, B = Burnout (or vice versa)
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    scenario: "You have 3 tests tomorrow. What do you do?",
    optionA: "Study in focused blocks with breaks",
    optionB: "Pull an all-nighter and cram everything",
    correct: "A",
    explanation: "Focused study with breaks improves retention and reduces burnout.",
  },
  {
    id: 2,
    scenario: "Your friend asks you to hang out but you have homework.",
    optionA: "Finish homework first, then hang out",
    optionB: "Skip the homework — YOLO",
    correct: "A",
    explanation: "Prioritizing responsibilities first leads to guilt-free fun later.",
  },
  {
    id: 3,
    scenario: "You're feeling overwhelmed by extracurriculars.",
    optionA: "Talk to a counselor about balancing your load",
    optionB: "Push through and add more to your resume",
    correct: "A",
    explanation: "Seeking help is a sign of strength, not weakness.",
  },
  {
    id: 4,
    scenario: "It's 11 PM and you still have an essay to write.",
    optionA: "Write a solid draft and revise tomorrow morning",
    optionB: "Stay up until 3 AM perfecting every sentence",
    correct: "A",
    explanation: "Sleep is essential — a rested brain writes better than an exhausted one.",
  },
  {
    id: 5,
    scenario: "You got a B+ on a test you studied hard for.",
    optionA: "Acknowledge your effort and learn from mistakes",
    optionB: "Beat yourself up and feel like a failure",
    correct: "A",
    explanation: "Growth mindset means learning from results, not being defined by them.",
  },
  {
    id: 6,
    scenario: "Your schedule has zero free time this week.",
    optionA: "Drop one activity to make room for rest",
    optionB: "Keep everything — sleep is for the weak",
    correct: "A",
    explanation: "Rest is productive. You can't pour from an empty cup.",
  },
  {
    id: 7,
    scenario: "A classmate is struggling with mental health.",
    optionA: "Listen and encourage them to talk to an adult",
    optionB: "Tell them to just toughen up",
    correct: "A",
    explanation: "Empathy and support can save lives. Always take mental health seriously.",
  },
  {
    id: 8,
    scenario: "You're comparing yourself to classmates on social media.",
    optionA: "Take a social media break and focus on your own path",
    optionB: "Work harder to match their highlight reel",
    correct: "A",
    explanation: "Comparison is the thief of joy. Your journey is yours alone.",
  },
];
