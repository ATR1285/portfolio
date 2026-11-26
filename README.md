# Richard A T — Developer Portfolio

An interactive, futuristic 3D developer portfolio featuring AI voice narration, interactive particle systems, and comprehensive project showcases.

## Features

- **3D Interactive Visuals**: Three.js & React Three Fiber dynamic background data particles.
- **AI Voice Guide**: Interactive voice assistant (`ExplainGuide`) and introductory welcome briefing (`WelcomeScreen`).
- **Comprehensive Showcase**:
  - Hero with animated avatar and quick actions.
  - About section highlighting expertise in Data Analytics, ML, BI, and GenAI.
  - Interactive project cards (CareerPilot AI, CreditBridge, OptiPrice AI, Churn Intelligence, AI Payment Agent).
  - Categorized skill matrix and tools.
  - Direct contact and social links.
- **Built for Deployment**: Ready for GitHub Pages, Vercel, and Netlify with automated CI/CD.

## Tech Stack

- **Framework**: React 19, TypeScript, Vite
- **3D & Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Voice/Speech**: Web Speech API & generative audio service

## Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/portfolio/`.

## Build & Verify

```bash
npm run typecheck
npm run build
```
