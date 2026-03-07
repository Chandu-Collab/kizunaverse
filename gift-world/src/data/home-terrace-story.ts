export interface HomeTerraceStoryScene {
  id: number;
  key: string;
  title: string;
  visualCue: string;
  lines: string[];
}

export interface HomeTerraceStory {
  title: string;
  subtitle: string;
  scenes: HomeTerraceStoryScene[];
  finalLine: string;
}

export const homeTerraceStory: HomeTerraceStory = {
  title: "A Place That Feels Like Yours",
  subtitle: "A story about noticing the little things",
  scenes: [
    {
      id: 1,
      key: "observation",
      title: "Scene 1 — A Small Observation",
      visualCue: "Start calmly with the home exterior.",
      lines: [
        "Sometimes the smallest things tell us what someone likes the most.",
        "I noticed that whenever you wanted some quiet time…",
        "you often went to the terrace.",
      ]
    },
    {
      id: 2,
      key: "terrace",
      title: "Scene 2 — The Terrace",
      visualCue: "Camera moves to the terrace area.",
      lines: [
        "A place to breathe for a moment.",
        "A place to talk with friends.",
        "A place to just be yourself.",
        "Simple places like that can become very special.",
      ]
    },
    {
      id: 3,
      key: "idea",
      title: "Scene 3 — The Idea",
      visualCue: "Pan around the house exterior.",
      lines: [
        "That made me think about something.",
        "What if there was a place that felt just as comfortable…",
        "but designed exactly the way you would like it?",
        "So I tried building one.",
      ]
    },
    {
      id: 4,
      key: "home",
      title: "Scene 4 — The 3D Home",
      visualCue: "Camera slowly reveals the house with all rooms visible.",
      lines: [
        "Not to replace your real home.",
        "But to create a small space inspired by it.",
        "A place that feels familiar…",
        "but also completely yours.",
      ]
    },
    {
      id: 5,
      key: "meaning",
      title: "Scene 5 — The Meaning",
      visualCue: "Walk through different rooms - library, bedroom, kitchen, hall.",
      lines: [
        "A place where you can relax.",
        "A place where you can talk, laugh, and spend time.",
        "A place that feels peaceful.",
      ]
    },
    {
      id: 6,
      key: "terrace-final",
      title: "Final Scene — The Terrace Again",
      visualCue: "End on the terrace with sunset/evening atmosphere.",
      lines: [
        "Every home has a small corner that becomes special.",
        "For you… it seemed to be the terrace.",
      ]
    }
  ],
  finalLine: "So I built a small world around that feeling."
};
