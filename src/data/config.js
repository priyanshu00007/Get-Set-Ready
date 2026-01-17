// src/data/config.js

export const WALLPAPERS = [
  { id: 2, url: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2560&auto=format&fit=crop', name: "Light Abstract" },
  { id: 3, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2560&auto=format&fit=crop', name: "Yosemite" },
  { id: 4, url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2560&auto=format&fit=crop', name: "High Sierra" },
  { id: 5, url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2560&auto=format&fit=crop', name: "Lake" },
];

export const SONGS = [
  { title: "Chill Lofi", artist: "Unknown Artist", duration: "0:0", url: "https://pixabay.com/sound-effects/study-in-b-minor-75946/" },
  { title: "Coding Focus", artist: "Dev Beats", duration: "0:0", url: "https://pixabay.com/sound-effects/15-minutes-of-rain-sound-for-relaxation-and-sleep-study-312863/" },
  { title: "Night Walk", artist: "Synthwave", duration: "0:0", url: "https://pixabay.com/sound-effects/birds-singing-in-early-summer-359446/" }
];

export const PORTFOLIO_DATA = {
  name: "Priyanshu",
  role: "Mern  Stack Engineer",
  about:
    "Engineering student passionate about AI-driven products, real-time systems, and full-stack development. I build scalable applications integrating modern web technologies, cloud services, and machine intelligence. Currently working on productivity and intelligence-based platforms.",
  skills: [
    "Next.js / React", "Node.js / Express", "TypeScript", "Python / FastAPI",
    "MongoDB / PostgreSQL", "Docker / Nginx", "WebRTC / Socket.IO",
    "Tailwind CSS", "OpenAI / Gemini / Meta AI", "System Design"
  ],

  projects: [
    {
      id: 1,
      title: "Spark – AI Personal Success Assistant",
      tech: "Next.js, Meta AI API, Python, WebRTC, Docker",
      desc: "A powerful AI assistant platform inspired by J.A.R.V.I.S. Includes real-time chat, camera & voice control, TTS, tasks management, learning paths, dashboard, and productivity automation with rate-limiting and auth.",
      color: "bg-purple-600",
      link: "https://example.com/spark"
    },
    {
      id: 2,
      title: "Momentum Productivity Platform",
      tech: "Next.js, ShadCN UI, React Flow, Node.js, MongoDB",
      desc: "A smart daily planner featuring Pomodoro, task manager, AI chat, energy-based planning, automated task rollover, and personalized onboarding.",
      color: "bg-blue-500",
      link: "https://example.com/momentum"
    },
    {
      id: 3,
      title: "AI Powered Chat App",
      tech: "Next.js, FastAPI, WebRTC, Socket.IO, Docker",
      desc: "A real-time chat platform with video/audio calling, CI/CD, and support for OpenAI/Gemini LLM models.",
      color: "bg-green-500",
      link: "https://example.com/chat"
    },
    {
      id: 4,
      title: "Gesture-Controlled Flappy Bird Game",
      tech: "C++, OpenCV, MediaPipe",
      desc: "A fun motion-tracking game controlled through hand gestures using computer vision.",
      color: "bg-orange-500",
      link: "https://example.com/game"
    }
  ],

  experience: [
    {
      company: "Academic & Freelance Projects",
      role: "Mern stack Developer",
      period: "2023 - Present",
      desc: "Built multiple production-grade applications integrating AI, cloud infrastructure, real-time systems, and strong UI/UX foundations."
    },
    {
      company: "Hackathons & Technical Challenges",
      role: "Participant / Problem Solver",
      period: "2022 - Present",
      desc: "Solving complex DSA, participating in GRiD 7.0, building scalable prototypes and showcasing innovative solutions."
    }
  ]
};

// export const INITIAL_WINDOW_SIZE = { width: 800, height: 550 };

// export const WALLPAPERS = [
//   { id: 1, url: 'https://images.unsplash.com/photo-1542384557-0824d90731ee?q=80&w=2560&auto=format&fit=crop', name: "Dark Abstract" },
//   { id: 2, url: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2560&auto=format&fit=crop', name: "Light Abstract" },
//   { id: 3, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2560&auto=format&fit=crop', name: "Yosemite" },
// ];

// export const SONGS = [
//   { title: "Chill Lofi", artist: "Unknown Artist", duration: "2:30", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
//   { title: "Coding Focus", artist: "Dev Beats", duration: "3:45", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
// ];

// export const PORTFOLIO_DATA = {
//   name: "priyanshu ",
//   role: "Mern Stack Engineer",
//   about: "I craft scalable, high-performance web applications...",
//   skills: ["React", "TypeScript", "Node.js", "AWS", "Tailwind CSS"],
//   projects: [
//     {
//       id: 1,
//       title: "E-Commerce Dashboard",
//       tech: "React, Tremor, Postgres",
//       desc: "Real-time analytics dashboard.",
//       color: "bg-blue-500",
//       link: "https://example.com"
//     },
//     // ... add the rest of your projects here
//   ],
//   experience: [
//     {
//       company: "Tech Corp",
//       role: "Senior Engineer",
//       period: "2021 - Present",
//       desc: "Leading UI infrastructure."
//     }
//   ]
// };