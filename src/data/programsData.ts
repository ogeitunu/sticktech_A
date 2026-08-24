import { ProgramTrack } from '../types';

export const STATS_DATA = [
  {
    value: "2,000+",
    label: "Students reached",
    detail: "Through our inaugural school partnerships and hands-on workshops across high school cohorts.",
    highlight: "Real School Impact"
  },
  {
    value: "3",
    label: "Departments served",
    detail: "Tailored career pathways for Arts, Commercial, and Science tracks with zero entry barriers.",
    highlight: "Inclusive Curriculum"
  },
  {
    value: "65 / 35",
    label: "Girls-centered ratio",
    detail: "Target gender balance designed intentionally to boost female participation in AI and computing.",
    highlight: "Diversity First"
  }
];

export const PROGRAM_TRACKS: ProgramTrack[] = [
  {
    id: "game-dev",
    title: "Game Development",
    iconName: "Gamepad2",
    category: "Academy",
    description: "Simple code, real games — students ship something playable in their very first weeks, building problem solving and spatial logic.",
    tools: ["Phaser.js", "Python / Pygame", "Scratch Advanced"],
    studentOutput: "Interactive 2D African myth RPG or school runner game playable directly in web browsers.",
    badge: "Popular Entry Point"
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    iconName: "Smartphone",
    category: "Academy",
    description: "Two distinct paths (full code and no-code/MIT App Inventor base) ensuring ability, not prior device access, decides who builds.",
    tools: ["MIT App Inventor", "Flutter / Dart", "React Native"],
    studentOutput: "School homework tracker app or local market inventory tool published for Android devices.",
    badge: "High Utility"
  },
  {
    id: "ai-agents",
    title: "AI Agent & Assistant Building",
    iconName: "Bot",
    category: "Academy",
    description: "Google Studio & Notebook-based practical training to design custom AI agents that solve school and community administrative challenges.",
    tools: ["Google GenAI SDK", "Google AI Studio", "Python Agent Frameworks"],
    studentOutput: "Automated school library catalog assistant or SME WhatsApp customer support bot.",
    badge: "Flagship Track"
  },
  {
    id: "digital-marketing & Content Creation",
    title: "Digital Marketing, Graphics Design, Video Editing & Social Media",
    iconName: "TrendingUp",
    category: "Academy",
    description: "Practical tech pathways specifically empowering non-Tech-track students with data-driven audience growth skills; Visual storytelling (br) skills paired with marketing and SME-facing tracks to produce high-grade brand assets.",
    tools: ["Meta Business Suite", "Google Analytics", "Content Planners"],
    studentOutput: "Full multi-channel campaign strategy and ROI dashboard for a local business partner.",
    badge: "Media Track"
  },
  {
    id: "IOT & AI",
    title: "Internet of Things (IoT) & Smart Systems",
    iconName: "Palette",
    category: "Academy",
    description: "Bridge the physical and digital worlds by building connected smart devices, automation systems, and cloud-driven hardware.",
    tools: ["Arduino & ESP32 Microcontrollers", "Sensors, Relays & Circuit Architecture", "Wi-Fi, Bluetooth & MQTT Cloud Logging", "Real-World Smart Home & Industrial Projects"],
    studentOutput: "Hardware & Cloud, STEM and product catalog for SME clients.",
    badge: "Creative Tech"
  },
  {
    id: "ai-literacy",
    title: "AI Literacy & Fluency",
    iconName: "Brain",
    category: "Core",
    description: "The essential foundation embedded under every track; every student leaves able to prompt, audit, and apply AI tools ethically and competently.",
    tools: ["Gemini 2.5", "Prompt Engineering", "AI Ethics Framework"],
    studentOutput: "Verified AI Fluency Certificate and personal prompt library portfolio.",
    badge: "Foundational"
  }
];

export const PHILOSOPHY_STEPS = [
  {
    step: "01",
    title: "Build something fun",
    subtitle: "Games as the entry point",
    description: "Early wins keep teenagers engaged, spark curiosity, and give them something tangible to show parents and peers immediately."
  },
  {
    step: "02",
    title: "Build something real",
    subtitle: "AI-assisted mobile apps & tools",
    description: "Taught through both code and no-code paths so students understand software architecture and real-world utility."
  },
  {
    step: "03",
    title: "Solve something true",
    subtitle: "Community & school challenges",
    description: "Every learner tackles an actual friction point from their own school, marketplace, or community environment."
  },
  {
    step: "04",
    title: "Present & own it",
    subtitle: "Finished portfolio",
    description: "Every track culminates in a published, presentation-ready project for a verified personal portfolio."
  }
];
