export interface YourSpaceStoryScene {
  id: number;
  key: string;
  title: string;
  visualCue: string;
  lines: string[];
}

export interface YourSpaceStory {
  title: string;
  subtitle: string;
  scenes: YourSpaceStoryScene[];
  finalLine: string;
}

export const goaYourSpaceStory: YourSpaceStory = {
  title: "A Small Goa I Built",
  subtitle: "A story for the Your Space section",
  scenes: [
    {
      id: 1,
      key: "memory",
      title: "Scene 1 - A Memory",
      visualCue: "Start with a black screen or a calm beach view.",
      lines: [
        "Sometimes small conversations stay in our minds.",
        "I remember when we were talking about places.",
        "And when Goa came up... you sounded really excited.",
        "That moment stayed with me."
      ]
    },
    {
      id: 2,
      key: "thought",
      title: "Scene 2 - The Thought",
      visualCue: "Camera slowly moves across the ocean or beach.",
      lines: [
        "Later I thought about something.",
        "One day my friends and I might actually go to Goa.",
        "Maybe you could join us.",
        "Maybe you might not.",
        "And that made me think..."
      ]
    },
    {
      id: 3,
      key: "idea",
      title: "Scene 3 - The Idea",
      visualCue: "Camera moves through palm trees and pathways.",
      lines: [
        "What if I could create a small Goa myself?",
        "Not the real one...",
        "But a place inspired by it.",
        "So I started building this."
      ]
    },
    {
      id: 4,
      key: "goa-world",
      title: "Scene 4 - Goa World",
      visualCue: "She explores the environment.",
      lines: [
        "A beach.",
        "Palm trees.",
        "Sunset paths.",
        "Just a peaceful place.",
        "A small Goa... in a digital world."
      ]
    },
    {
      id: 5,
      key: "resort-discovery",
      title: "Scene 5 - Discovering the Resort",
      visualCue: "She reaches the resort entrance and walks inside.",
      lines: [
        "But inside this world...",
        "There is one place that is a little special.",
        "This resort."
      ]
    },
    {
      id: 6,
      key: "meaning",
      title: "Scene 6 - The Meaning",
      visualCue: "Final location: garden, balcony, or sunset deck.",
      lines: [
        "If one day you join us in Goa...",
        "We'll enjoy the real place together.",
        "And if that doesn't happen...",
        "Then this small Goa I built will still be here."
      ]
    }
  ],
  finalLine:
    "Just a small place I created... because you once said you liked Goa."
};
