import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// ─── CONTENT ──────────────────────────────────────────────────────────────────
const L = {
  github: "https://github.com/mhd-faraz",
  linkedin: "https://linkedin.com/in/mohammad-faraz-a27176223",
  leetcode: "https://leetcode.com/u/Faraz_20/",
  instagram: "https://www.instagram.com/mhd._.faraz_._",
  email: "rfaraz5678@gmail.com",
  cv: "/Mohammad_Faraz_Resume.pdf",
};
if (typeof window !== "undefined" && "scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
const NAV = ["About", "Skills", "Experience", "Projects", "Achievements", "Education", "Contact"];
const dv = n => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${n}-original.svg`;

const STATS = [
  [30, "%", "Better booking efficiency on a salon SaaS platform I helped build."],
  [15, "%", "Lower backend latency after optimizing MongoDB queries."],
  [40, "x", "Faster candidate screening than manual review with my LangGraph agent."],
  [300, "+", "LeetCode problems solved across arrays, DP, graphs and trees."],
];

const FOCUS = [
  ["Backend & system design", "REST APIs, auth, queues and databases built to stay reliable under failure."],
  ["MERN full stack", "End-to-end products on MongoDB, Express, React and Node.js."],
  ["Frontend engineering", "Responsive, accessible interfaces with React, Next.js and Tailwind."],
  ["Generative AI", "RAG pipelines, LangGraph agents and MCP integrations for real workflows."],
];

const SKILLS = [
  ["React.js", dv("react")], ["Next.js", dv("nextjs")], ["JavaScript", dv("javascript")], ["Node.js", dv("nodejs")], ["Express.js", dv("express"), 1],
  ["MongoDB", dv("mongodb")], ["Redis", dv("redis")], ["PostgreSQL", dv("postgresql")], ["MySQL", dv("mysql")], ["Docker", dv("docker")],
  ["Kafka", dv("apachekafka"), 1], ["Python", dv("python")], ["C++", dv("cplusplus")], ["Git", dv("git")],
  ["LangChain", "LC"], ["LangGraph", "LG"], ["RAG", "RAG"], ["MCP", "MCP"], ["Agentic AI", "AI"], ["Vector DBs", "VDB"],
];
const GMAIL = `https://mail.google.com/mail/?view=cm&to=${L.email}`;

const PROFICIENCY = [
  ["Backend Engineering", "Node · Express · REST · JWT · BullMQ · Kafka", 85, "APIs, authentication, async jobs and reliable data flow."],
  ["System Design", "Queues · Caching · Idempotency · Concurrency", 80, "Designing for retries, crashes and double-write safety."],
  ["MERN Full Stack", "MongoDB · Express · React · Node.js", 85, "Shipping complete products from schema to UI."],
  ["Frontend Engineering", "React · Next.js · Tailwind · HTML · CSS", 84, "Responsive interfaces and clean component architecture."],
  ["Generative AI", "LangChain · LangGraph · RAG · MCP", 82, "Retrieval, orchestration and AI integrations that hold up."],
  ["DSA & Algorithms", "C++ · Python · 300+ LeetCode problems", 78, "Problem solving and efficient, optimized logic."],
];

const JOB = {
  role: "Full Stack Developer Intern", org: "Zylu Business Solutions Pvt. Ltd.", meta: "Remote · May 2025 - Oct 2025",
  intro: "I worked on a MERN-based salon management SaaS that moves booking workflows away from phone calls and manual registers, across frontend features, backend APIs and access control.",
  points: [
    <>Built core features of a <b>salon management SaaS</b> on the MERN stack, lifting <b>booking efficiency by 30%</b> and <b>customer retention by 20%</b>.</>,
    <>Implemented <b>role-based access control</b> for <b>3 roles</b> (owners, staff and clients) with authorization checks on protected endpoints.</>,
    <>Designed <b>REST APIs</b> for bookings, authentication and payments, and <b>prevented double bookings</b> with MongoDB concurrency control.</>,
    <>Optimized MongoDB queries, <b>cutting backend latency by 15%</b>, and fixed bugs across the stack.</>,
  ],
  stack: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "JWT", "RBAC", "Tailwind CSS", "Git", "Postman"],
};

const PROJECTS = [
  { k: "relay", title: "Relay: AI Workflow Orchestrator", label: "AI workflow automation",
    desc: "An n8n-style platform with a React Flow builder. Crash-safe execution resumes from the last completed step.",
    tags: ["React Flow", "BullMQ", "Redis", "MongoDB"],
    live: "https://relay-workflow-automation.vercel.app", code: "https://github.com/mhd-faraz/Relay-Workflow-Automation" },
  { k: "meet", title: "Meeting Intelligence Platform", label: "AI transcription and Q&A",
    desc: "Transcribes, summarizes and answers questions on meetings in under 30 seconds, in English and Hinglish.",
    tags: ["Whisper", "LangChain", "ChromaDB", "Python"],
    live: "https://ai-video-assistant-4.onrender.com/", code: "https://github.com/mhd-faraz/AI-Video-Assistant" },
  { k: "resume", title: "AI Resume Screening Agent", label: "LangGraph matching system",
    desc: "A LangGraph agent that ranks 100+ resumes against a job description in under 2 seconds.",
    tags: ["LangGraph", "ChromaDB", "Groq", "Streamlit"],
    live: "https://ai-resume-matcher-rag-dz5vwweeeihuqlkmz7sr3f.streamlit.app/", code: "https://github.com/mhd-faraz/RESUME-MATCHING-RAG" },
  { k: "call", title: "Connectify", label: "Real-time video conferencing",
    desc: "Room-based group video calls over WebRTC with Socket.io signaling.",
    tags: ["React", "Node.js", "Socket.io", "WebRTC"],
    live: "https://connectify-dev.netlify.app/lobby.html", code: "https://github.com/mhd-faraz/Connectify" },
  { k: "magma", title: "Magma Real Estate", label: "Scroll-driven website",
    desc: "A real estate site with scroll-driven animation and smooth page transitions using GSAP.",
    tags: ["React", "GSAP", "Tailwind"],
    live: "https://magma-real-estate.vercel.app", code: "https://github.com/mhd-faraz/MAGMA-REAL-ESTATE" },
  { k: "weather", title: "Weather Forecast App", label: "Real-time weather",
    desc: "A responsive weather app with live temperature, humidity and wind, and condition-based UI.",
    tags: ["HTML", "CSS", "JavaScript", "WeatherAPI"],
    live: "https://weather-app-ten-ochre-29.vercel.app", code: "https://github.com/mhd-faraz/weather-app" },
];

const CERTS = [
  ["Claude with Anthropic API", "Anthropic", "2026", "Building applications with the Claude API.", "https://verify.skilljar.com/c/drcqp8k5n8v9"],
  ["AI Fluency: Framework & Foundations", "Anthropic", "2026", "A framework for working effectively with AI systems.", "https://verify.skilljar.com/c/k7y5hkvnnv4d"],
  ["Introduction to Generative AI: The Art of the Possible", "AWS", "2026", "Generative AI concepts and their practical possibilities.", "https://drive.google.com/file/d/1XJWpxFoFkp-oBXJM3VaGBMow34Y5swDd/view?usp=sharing"],
  ["Comprehensive JavaScript Development", "Infosys Springboard", "2024", "ES6+, async/await, closures, DOM and browser APIs.", "https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_18109698366332810000_shared/1-05761df0-1004-44ab-b29b-4017cf9439f9.pdf"],
  ["Advanced React.js Development", "Infosys Springboard", "2024", "Hooks, context API, performance and production patterns.", "https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_10648877150323546000_shared/1-6e34963a-e48e-457d-a63e-4cbf6d8369eb.pdf"],
  ["Front-End Web Development Essentials", "Johns Hopkins · Coursera", "2024", "HTML5, CSS3, responsive design and JavaScript fundamentals.", "https://www.coursera.org/account/accomplishments/certificate/839HVLPM88FK"],
];
const COURSES = ["Data Structures & Algorithms", "Object-Oriented Programming", "Database Management Systems", "Computer Networks", "Operating Systems", "Software Engineering", "Web Technologies", "System Design"];

// ─── PROJECT ARTWORK (laptop mockups; drop real screenshots in /public/projects/<key>.png to replace) ───
const T = (x, y, t, o = {}) => (<text x={x} y={y} fontSize={o.s || 6} fill={o.f || "#cfd3e6"} fontWeight={o.w || 500} textAnchor={o.a || "start"} fontFamily="Montserrat,system-ui,sans-serif">{t}</text>);
const Ln = (x, y, w, c = "#2a2f42", h = 3) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={c}/>;
const PAL = { relay: ["#ff9d4d", "#8f5bff"], meet: ["#2dd4a8", "#8f5bff"], resume: ["#4da3ff", "#8f5bff"], call: ["#ff9d4d", "#8f5bff"], magma: ["#ff7a45", "#c2468a"], weather: ["#4da3ff", "#2dd4a8"] };

const SCREEN = {
  call: (<>
    <rect width="264" height="148" fill="#0e1129"/><rect width="264" height="19" fill="#0a0a12"/>
    <path d="M9 6.5 5 10l4 3.5M13 6.5 17 10l-4 3.5" stroke="#8f7bff" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
    {T(22, 13, "connectify", { s: 8.5, w: 700, f: "#fff" })}{T(198, 12.5, "Lobby", { s: 5.5, f: "#fff" })}
    <rect x="217" y="4.5" width="42" height="11" rx="3" fill="#7c4dff"/>{T(238, 12, "Create Room", { s: 5, a: "middle", w: 700, f: "#fff" })}
    <rect y="19" width="62" height="129" fill="#15152b"/>{T(8, 33, "Participants", { s: 6, f: "#fff" })}
    <rect x="45" y="26" width="10" height="9" rx="2.5" fill="#0a0a12"/>{T(50, 33, "1", { s: 5.5, a: "middle", f: "#fff" })}
    <circle cx="9" cy="46" r="1.8" fill="#4ade80"/>{T(14, 48, "Faraz", { s: 5, f: "#fff" })}
    <rect x="80" y="34" width="156" height="82" rx="4" fill="#222a58"/><rect x="80" y="34" width="156" height="14" rx="4" fill="#2e3870"/>
    {T(158, 43.5, "Create or Join a room", { s: 6, a: "middle", f: "#fff", w: 600 })}
    {T(90, 58, "Your Name", { s: 4.8, f: "#fff", w: 600 })}<rect x="90" y="61" width="136" height="11" rx="2" fill="#eef3ff"/>{T(94, 68.5, "Faraz", { s: 4.8, f: "#445" })}
    {T(90, 81, "Room ID", { s: 4.8, f: "#fff", w: 600 })}<rect x="90" y="84" width="136" height="11" rx="2" fill="#eef3ff"/>{T(94, 91.5, "123456", { s: 4.8, f: "#445" })}
    <rect x="90" y="101" width="136" height="11" rx="2.5" fill="#7c4dff"/>{T(158, 108.5, "Go to Room  →", { s: 5.2, a: "middle", f: "#fff", w: 700 })}
    <rect x="62" y="124" width="202" height="24" fill="#0a0a12"/>
    <rect x="124" y="130" width="16" height="12" rx="3" fill="#8f5bff"/><rect x="146" y="130" width="16" height="12" rx="3" fill="#8f5bff"/><rect x="168" y="130" width="16" height="12" rx="3" fill="#e8e8f0"/><rect x="190" y="130" width="16" height="12" rx="3" fill="#ef4444"/>
  </>),
  relay: (<>
    <defs><pattern id="dotsrelay" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#2a2a3a"/></pattern></defs>
    <rect width="264" height="148" fill="#0d0d14"/><rect y="19" width="264" height="129" fill="url(#dotsrelay)"/>
    <rect width="264" height="19" fill="#12121b"/><circle cx="9" cy="9.5" r="3.5" fill="#ff9d4d"/>
    {T(17, 12.3, "Relay", { s: 7.5, w: 700, f: "#fff" })}{T(46, 12, "/ Order refund workflow", { s: 5.2, f: "#8b8fa3" })}
    <rect x="222" y="4.5" width="32" height="10" rx="5" fill="#ff9d4d"/>{T(238, 11.5, "Run", { s: 5.2, a: "middle", w: 700, f: "#1a1208" })}
    <rect y="19" width="46" height="129" fill="#101019"/>{T(7, 32, "NODES", { s: 4.5, f: "#6b7088", w: 700 })}
    {["Trigger", "AI step", "Approval", "Action"].map((n, i) => (<g key={n}><rect x="6" y={38 + i * 19} width="34" height="14" rx="4" fill="#181824" stroke="#2a2a3a" strokeWidth=".7"/>{T(23, 47 + i * 19, n, { s: 4.6, a: "middle" })}</g>))}
    <path d="M104 74H118M168 74C176 74 176 50 184 50M168 74C176 74 176 100 184 100" stroke="#ff9d4d" strokeWidth="1.3" fill="none" strokeDasharray="2 2.5"/>
    {[[56, 58, "#8f5bff", "Trigger", "Refund request"], [118, 58, "#ff9d4d", "AI risk check", "Score order"], [184, 34, "#4ade80", "Auto-approve", "Low risk"], [184, 84, "#ff9d4d", "Human review", "High risk"]].map(([x, y, c, a, b]) => (<g key={a}><rect x={x} y={y} width="50" height="32" rx="6" fill="#181824" stroke={c} strokeWidth="1"/><rect x={x} y={y} width="50" height="9" rx="6" fill={c} opacity=".25"/>{T(x + 25, y + 6.5, a, { s: 4.6, a: "middle", f: "#fff", w: 700 })}{T(x + 25, y + 21, b, { s: 4.4, a: "middle", f: "#9aa0b5" })}</g>))}
    <rect x="56" y="128" width="64" height="12" rx="6" fill="#171a24"/>{T(88, 136.3, "7 nodes · 6 workflows", { s: 4.4, a: "middle", f: "#9aa0b5" })}
  </>),
  meet: (<>
    <rect width="264" height="148" fill="#0f1117"/><rect width="264" height="19" fill="#0b0c12"/>{T(10, 12.5, "Meeting Intelligence", { s: 7.5, w: 700, f: "#fff" })}
    <rect x="206" y="4.5" width="50" height="10" rx="5" fill="none" stroke="#2dd4a8" strokeWidth=".8"/>{T(231, 11.5, "EN · Hinglish", { s: 4.6, a: "middle", f: "#2dd4a8" })}
    <rect x="8" y="26" width="128" height="50" rx="5" fill="#171a24"/>
    {Array.from({ length: 30 }, (_, i) => { const h = 5 + Math.abs(Math.sin(i * .6)) * 30; return <rect key={i} x={14 + i * 4} y={48 - h / 2} width="2.2" height={h} rx="1.1" fill={i < 14 ? "#2dd4a8" : "#3a3f55"}/>; })}
    <rect x="14" y="66" width="116" height="2" rx="1" fill="#2a2f42"/><rect x="14" y="66" width="52" height="2" rx="1" fill="#2dd4a8"/>
    {["00:12", "00:41", "01:08", "01:37"].map((t, i) => (<g key={t}>{T(10, 90 + i * 14, t, { s: 4.6, f: "#2dd4a8", w: 700 })}{Ln(32, 87 + i * 14, 98 - (i % 2) * 22, "#2a2f42")}{Ln(32, 92 + i * 14, 70 + (i % 3) * 10, "#20243a")}</g>))}
    <rect x="146" y="26" width="110" height="42" rx="5" fill="#171a24"/>{T(153, 36, "Summary", { s: 5.6, f: "#fff", w: 700 })}
    {[0, 1, 2].map(i => <g key={i}><circle cx="155" cy={45 + i * 7} r="1.1" fill="#2dd4a8"/>{Ln(160, 43.5 + i * 7, 84 - i * 12, "#2f3550")}</g>)}
    <rect x="170" y="76" width="86" height="14" rx="6" fill="#7c4dff"/>{T(213, 85, "What was decided?", { s: 5, a: "middle", f: "#fff", w: 600 })}
    <rect x="146" y="96" width="104" height="28" rx="6" fill="#171a24"/>{Ln(153, 103, 88, "#3a4060")}{Ln(153, 110, 70, "#2f3550")}{Ln(153, 116.5, 40, "#2f3550")}
    <rect x="146" y="130" width="110" height="12" rx="6" fill="#171a24" stroke="#2a2f42" strokeWidth=".7"/>{T(154, 138, "Ask about this meeting…", { s: 4.8, f: "#6b7088" })}
  </>),
  resume: (<>
    <rect width="264" height="148" fill="#0f1117"/><rect width="264" height="19" fill="#0b0c12"/>{T(10, 12.5, "Resume Screening Agent", { s: 7.2, w: 700, f: "#fff" })}
    <rect y="19" width="62" height="129" fill="#151620"/>{T(8, 32, "Job description", { s: 5.2, f: "#fff", w: 700 })}{Ln(8, 37, 46)}{Ln(8, 43, 40)}{Ln(8, 49, 44)}
    <rect x="8" y="64" width="46" height="36" rx="4" fill="none" stroke="#4da3ff" strokeWidth=".9" strokeDasharray="3 2"/>{T(31, 80, "Upload", { s: 5, a: "middle", f: "#4da3ff", w: 700 })}{T(31, 88, "resumes", { s: 4.6, a: "middle", f: "#6b7088" })}
    <rect x="8" y="108" width="46" height="12" rx="4" fill="#4da3ff"/>{T(31, 116.2, "Rank", { s: 5, a: "middle", f: "#06121f", w: 700 })}
    {T(72, 32, "Ranked candidates", { s: 7, w: 700, f: "#fff" })}
    {[96, 91, 84, 78].map((p, i) => (<g key={p}><rect x="72" y={40 + i * 20} width="184" height="16" rx="5" fill="#171a24"/><circle cx="82" cy={48 + i * 20} r="4.5" fill={i === 0 ? "#4da3ff" : "#2f3550"}/>{Ln(92, 46.5 + i * 20, 38 + (i % 2) * 10, "#3a4060")}<rect x="150" y={46.5 + i * 20} width="70" height="3" rx="1.5" fill="#262b3e"/><rect x="150" y={46.5 + i * 20} width={0.7 * p} height="3" rx="1.5" fill="#4da3ff" opacity={1 - i * .15}/>{T(236, 50.5 + i * 20, `${p}%`, { s: 5.6, w: 700, f: "#fff", a: "middle" })}</g>))}
    <rect x="72" y="126" width="184" height="14" rx="7" fill="#171a24" stroke="#2a2f42" strokeWidth=".7"/>{T(82, 135, "Ask the HR assistant about a candidate…", { s: 4.8, f: "#6b7088" })}
  </>),
  magma: (<>
    <rect width="264" height="148" fill="#17100c"/>
    <rect x="150" y="19" width="114" height="129" fill="#241610"/><circle cx="215" cy="46" r="20" fill="#ff7a45" opacity=".35"/><circle cx="215" cy="46" r="11" fill="#ff7a45" opacity=".8"/>
    {[[158, 78, 26], [186, 62, 30], [218, 72, 24], [244, 88, 18]].map(([x, y, w], i) => (<g key={i}><rect x={x} y={y} width={w} height={110 - y} fill="#1a100b" stroke="#3a2519" strokeWidth=".7"/>{Array.from({ length: Math.floor((110 - y - 8) / 10) }, (_, r) => <rect key={r} x={x + 4} y={y + 6 + r * 10} width="4" height="5" fill={(r + i) % 2 ? "#ff7a45" : "#4a2e20"}/>)}</g>))}
    {T(12, 13, "MAGMA", { s: 8, w: 800, f: "#ff7a45" })}{Ln(120, 10, 14, "#5a4034")}{Ln(140, 10, 14, "#5a4034")}{Ln(160, 10, 14, "#5a4034")}<rect x="222" y="6" width="32" height="10" rx="5" fill="none" stroke="#ff7a45" strokeWidth=".8"/>
    {T(12, 52, "Find a home", { s: 13, w: 800, f: "#fff" })}{T(12, 68, "worth living in.", { s: 13, w: 800, f: "#ff7a45" })}
    {Ln(12, 78, 100, "#5a4034")}{Ln(12, 85, 76, "#4a3329")}<rect x="12" y="95" width="46" height="12" rx="6" fill="#ff7a45"/>{T(35, 103, "Explore", { s: 5.2, a: "middle", f: "#1a0d07", w: 700 })}
    {[0, 1, 2].map(i => (<g key={i}><rect x={12 + i * 84} y="116" width="76" height="26" rx="5" fill="#21150f" stroke="#3a2519" strokeWidth=".7"/><rect x={16 + i * 84} y="120" width="24" height="18" rx="3" fill="#3a2519"/>{Ln(44 + i * 84, 123, 28, "#6a4a3a")}{Ln(44 + i * 84, 130, 20, "#4a3329")}</g>))}
  </>),
  weather: (<>
    <defs><linearGradient id="wbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#14284d"/><stop offset="1" stopColor="#0d1424"/></linearGradient></defs>
    <rect width="264" height="148" fill="url(#wbg)"/>
    <rect x="10" y="9" width="244" height="14" rx="7" fill="#ffffff" opacity=".08"/>{T(22, 18.5, "Search city…", { s: 5.5, f: "#9db0d6" })}
    <circle cx="62" cy="58" r="16" fill="#ffb64d"/>{[0, 45, 90, 135, 180, 225, 270, 315].map(a => <path key={a} d="M62 36v-6" stroke="#ffb64d" strokeWidth="2.4" strokeLinecap="round" transform={`rotate(${a} 62 58)`}/>)}
    {T(96, 66, "26°", { s: 32, w: 800, f: "#fff" })}{T(98, 78, "Clear sky", { s: 6.5, f: "#9db0d6" })}
    {[["Humidity", "54%"], ["Wind", "12 km/h"], ["Feels like", "27°"]].map(([a, b], i) => (<g key={a}><rect x={150 + (i === 2 ? 0 : 0)} y={36 + i * 20} width="96" height="16" rx="6" fill="#ffffff" opacity=".07"/>{T(158, 46.5 + i * 20, a, { s: 5.2, f: "#9db0d6" })}{T(238, 46.5 + i * 20, b, { s: 5.6, f: "#fff", w: 700, a: "end" })}</g>))}
    {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (<g key={d}><rect x={10 + i * 49} y="96" width="45" height="44" rx="8" fill="#ffffff" opacity=".07"/>{T(32 + i * 49, 108, d, { s: 5.2, a: "middle", f: "#9db0d6" })}<circle cx={32 + i * 49} cy="120" r="5" fill={i % 2 ? "#9db0d6" : "#ffb64d"}/>{T(32 + i * 49, 135, `${25 + (i * 3) % 5}°`, { s: 6, a: "middle", f: "#fff", w: 700 })}</g>))}
  </>),
};

function Art({ k }) {
  const [c1, c2] = PAL[k]; const [real, setReal] = useState(false);
  return (
    <div className="art">
      <svg viewBox="0 0 400 240" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`ga${k}`} cx="10%" cy="78%" r="62%"><stop offset="0" stopColor={c1} stopOpacity=".6"/><stop offset="1" stopColor={c1} stopOpacity="0"/></radialGradient>
          <radialGradient id={`gb${k}`} cx="92%" cy="32%" r="62%"><stop offset="0" stopColor={c2} stopOpacity=".55"/><stop offset="1" stopColor={c2} stopOpacity="0"/></radialGradient>
          <linearGradient id={`bs${k}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2c2c3d"/><stop offset="1" stopColor="#15151e"/></linearGradient>
          <clipPath id={`cl${k}`}><rect x="68" y="34" width="264" height="148" rx="3"/></clipPath>
        </defs>
        <rect width="400" height="240" fill="#0c0c13"/><rect width="400" height="240" fill={`url(#ga${k})`}/><rect width="400" height="240" fill={`url(#gb${k})`}/>
        <ellipse cx="200" cy="216" rx="175" ry="8" fill={c2} opacity=".28"/>
        <rect x="60" y="26" width="280" height="164" rx="10" fill="#101018" stroke="#40405a" strokeWidth="1.5"/>
        <g clipPath={`url(#cl${k})`}><g transform="translate(68 34)">{SCREEN[k]}</g></g>
        <path d="M26 190h348l-6 11q-1.2 3-5 3H37q-3.8 0-5-3z" fill={`url(#bs${k})`} stroke="#40405a" strokeWidth="1"/>
        <rect x="171" y="190" width="58" height="4.5" rx="2.2" fill="#0c0c13"/>
      </svg>
      <img className="real" src={`/projects/${k}.png`} alt="" loading="lazy" style={{ display: real ? "block" : "none" }} onLoad={() => setReal(true)} onError={() => setReal(false)}/>
    </div>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); ob.disconnect(); } }, { threshold: 0.08 });
    ob.observe(el); return () => ob.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
const Head = ({ n, label, title }) => (<Reveal className="head"><div className="eyebrow">{n} / {label}</div><h2>{title}</h2></Reveal>);
const Tags = ({ items }) => <ul className="tags">{items.map(t => <li key={t}>{t}</li>)}</ul>;

function Counter({ to }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; ob.disconnect();
      let c = 0; const step = to / 110;
      const t = setInterval(() => { c = Math.min(c + step, to); el.textContent = Math.floor(c) + "+"; if (c >= to) clearInterval(t); }, 16);
    }, { threshold: 0.4 });
    ob.observe(el); return () => ob.disconnect();
  }, [to]);
  return <b ref={ref} className="big">0</b>;
}

const HomeI = () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5 2 11.4h3V21h5.5v-6h3v6H19v-9.6h3z"/></svg>);
const MoonI = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg>);
const SunI = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>);

const GhI = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>);
const InI = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.32-1.96 2.69V21h-4z"/></svg>);
const IgI = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/></svg>);
const LcI = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15.5 4 6 13.5a2.8 2.8 0 0 0 0 4L8.5 20a2.8 2.8 0 0 0 4 0l2.2-2.2M12 12.5h8.5"/></svg>);

function Stat({ to, suf, text, i }) {
  const ref = useRef(null), num = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; ob.disconnect();
      el.classList.add("in");
      if (reduce) { num.current.textContent = to + suf; return; }
      const start = performance.now() + i * 150, dur = 1400;
      const tick = t => {
        const p = Math.min(Math.max((t - start) / dur, 0), 1);
        if (p > 0) num.current.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    ob.observe(el); return () => ob.disconnect();
  }, []);
  return <div ref={ref} className="stat" style={{ "--d": `${i * 150}ms` }}><b ref={num}>0{suf}</b><p>{text}</p></div>;
}

const GI = {
  LC: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>,
  LG: <><circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><path d="M8.2 6h7.6M7 7.9l4 8.2M17 7.9l-4 8.2"/></>,
  RAG: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4"/><path d="M14 3l5 5v2"/><circle cx="16" cy="16" r="3"/><path d="M18.2 18.2 21 21"/></>,
  MCP: <path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0zM12 17v5"/>,
  AI: <><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9 16.5h6"/><circle cx="12" cy="3" r="1"/></>,
  VDB: <><ellipse cx="12" cy="5.5" rx="7" ry="3"/><path d="M5 5.5v13c0 1.7 3.1 3 7 3s7-1.3 7-3v-13M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></>,
};
const GenIcon = ({ k }) => (<svg className="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{GI[k]}</svg>);

function Scramble({ text, run }) {
  const [out, setOut] = useState(text);
  const timer = useRef(null), box = useRef(null);
  const play = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    clearInterval(timer.current);
    let f = 0; const frames = 32;
    timer.current = setInterval(() => {
      f++;
      const shown = Math.floor((f / frames) * text.length);
      setOut(text.split("").map((c, i) => (c === " " || i < shown ? c : String(Math.floor(Math.random() * 10)))).join(""));
      if (f >= frames) { clearInterval(timer.current); setOut(text); }
    }, 30);
  };
  useEffect(() => { if (run) play(); }, [run]);
  useEffect(() => {
    const el = box.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { play(); ob.disconnect(); } }, { threshold: 0.6 });
    ob.observe(el); return () => { ob.disconnect(); clearInterval(timer.current); };
  }, []);
  return <span ref={box} aria-label={text}><span aria-hidden="true">{out}</span></span>;
}

function Contact({ ck }) {
  const [from, setFrom] = useState(""), [msg, setMsg] = useState("");
  const send = e => {
    e.preventDefault();
    const body = `${msg}\n\n- ${from}`;
    window.open(`${GMAIL}&su=${encodeURIComponent("Portfolio inquiry")}&body=${encodeURIComponent(body)}`, "_blank", "noopener");
  };
  return (
    <Reveal className="ctin">
      <div className="eyebrow">07 / Let’s talk</div>
      <h2><Scramble text="Let’s build something useful." run={ck}/></h2>
      <div className="rule"/>
      <form onSubmit={send}>
        <input className="fld" type="email" required placeholder="Your email" aria-label="Your email" value={from} onChange={e => setFrom(e.target.value)}/>
        <textarea className="fld" required rows={2} placeholder="Message" aria-label="Message" value={msg} onChange={e => setMsg(e.target.value)}/>
        <button className="send" type="submit"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 21 23 12 2 3v7l15 2-15 2z"/></svg>Send message</button>
      </form>
      <p className="or">Or you can email me directly at<br/><a href={GMAIL} target="_blank" rel="noreferrer">{L.email}</a></p>
      <p className="avail"><i/> Open to Software Engineer, Backend, Full Stack and GenAI roles.</p>
      <div className="soc">
        <a href={L.github} target="_blank" rel="noreferrer"><GhI/>GitHub</a>
        <a href={L.linkedin} target="_blank" rel="noreferrer"><InI/>LinkedIn</a>
        <a href={L.leetcode} target="_blank" rel="noreferrer"><LcI/>LeetCode</a>
        <a href={L.instagram} target="_blank" rel="noreferrer"><IgI/>Instagram</a>
      </div>
    </Reveal>
  );
}

// ─── PRELOADER (3 cubes) ──────────────────────────────────────────────────────
function Preloader({ onDone }) {
  const cvs = useRef(null), wrapRef = useRef(null);
  useEffect(() => {
    const canvas = cvs.current; if (!canvas) return;
    const W = window.innerWidth, H = window.innerHeight;
    const R = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
    R.setPixelRatio(Math.min(window.devicePixelRatio, 2)); R.setSize(W, H); R.setClearColor(0x000000, 1);
    const S = new THREE.Scene(); const C = new THREE.PerspectiveCamera(45, W / H, 0.1, 100); C.position.set(0, 0, W < 700 ? 9 : 7);
    const boxGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const mk = (x, y) => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(boxGeo, new THREE.MeshBasicMaterial({ color: 0x000000 })));
      g.add(new THREE.LineSegments(new THREE.EdgesGeometry(boxGeo), new THREE.LineBasicMaterial({ color: 0xffffff })));
      g.position.set(x, y, 0); g.rotation.x = 0.6; g.rotation.y = Math.PI / 4; g.scale.set(0, 0, 0); S.add(g); return g;
    };
    const cubes = [mk(0, 1.05), mk(-1.05, -0.55), mk(1.05, -0.55)];
    let frame = 0, id;
    const anim = () => {
      id = requestAnimationFrame(anim); frame++;
      cubes.forEach((g, i) => { const s = i * 8; if (frame > s) { const t = Math.min((frame - s) / 18, 1); g.scale.setScalar(1 - Math.pow(1 - t, 3)); } });
      if (frame > 40) cubes.forEach(g => { g.rotation.y = Math.PI / 4 + Math.sin((frame - 40) * 0.004) * 0.3; });
      R.render(S, C);
    };
    anim();
    const t1 = setTimeout(() => {
      const w = wrapRef.current; if (!w) return;
      w.style.transition = "opacity .65s ease, transform .65s ease"; w.style.opacity = "0"; w.style.transform = "scale(1.04)";
      setTimeout(() => { cancelAnimationFrame(id); R.dispose(); onDone(); }, 680);
    }, 2600);
    return () => { clearTimeout(t1); cancelAnimationFrame(id); R.dispose(); };
  }, [onDone]);
  return (
    <div ref={wrapRef} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <canvas ref={cvs} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <div style={{ position: "relative", marginTop: 440, display: "flex", alignItems: "center", gap: 10, animation: "plFade .6s ease 1.2s both" }}>
        <span style={{ fontFamily: "monospace", fontSize: 16, color: "rgba(255,255,255,.35)" }}>&lt;</span>
        <span style={{ fontFamily: "Georgia,serif", fontSize: "clamp(22px,6vw,34px)", fontStyle: "italic", color: "rgba(255,255,255,.88)", letterSpacing: 2 }}>Mohammad Faraz</span>
        <span style={{ fontFamily: "monospace", fontSize: 16, color: "rgba(255,255,255,.35)" }}>/&gt;</span>
      </div>
      <style>{`@keyframes plFade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
:root{--bg:#0b0b11;--card:#15151d;--fg:#f5f5f7;--muted:#a3a3b0;--line:#26262f;--accent:#ffaa55;--grad:linear-gradient(90deg,#ffb066 0%,#d9a0a0 45%,#8f7bff 100%);}
[data-theme=light]{--bg:#fbfaf8;--card:#fff;--fg:#14141a;--muted:#5d5d68;--line:#e6e3de;--accent:#d9730d;}
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;scroll-padding-top:24px;}
body{background:#0b0b11;}
.app{background:var(--bg);color:var(--fg);font-family:'Montserrat',system-ui,sans-serif;line-height:1.7;min-height:100vh;transition:background .3s,color .3s;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
a{color:inherit;text-decoration:none;}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:6px;}
.wrap{max-width:1180px;margin:0 auto;padding:0 40px;}
.page{padding-left:104px;}

.side{position:fixed;left:0;top:0;bottom:0;width:104px;display:flex;flex-direction:column;align-items:center;padding:34px 0 24px;gap:38px;z-index:20;overflow:hidden;}
.side>a{color:var(--fg);}
.vn{display:flex;flex-direction:column;gap:30px;}
.vn a{font-size:13.5px;font-weight:600;color:var(--muted);writing-mode:vertical-rl;transform:rotate(180deg);transition:color .2s;letter-spacing:.02em;}
.vn a:hover{color:var(--fg);}
.vn a{position:relative;}
.vn a.act{color:var(--accent);font-weight:800;}
.vn a.act::after{content:'';position:absolute;top:0;bottom:0;right:-12px;width:2px;border-radius:2px;background:var(--accent);}
.tog{position:fixed;right:40px;top:34px;z-index:20;background:none;border:0;color:var(--muted);cursor:pointer;}
.tog:hover,.ibtn:hover{color:var(--fg);}
.mbar{display:none;}
.ibtn{background:none;border:0;color:var(--muted);cursor:pointer;display:grid;place-items:center;padding:6px;}
.drawer{position:fixed;inset:0;z-index:40;background:color-mix(in srgb,var(--bg) 97%,transparent);backdrop-filter:blur(14px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;opacity:0;pointer-events:none;transition:opacity .25s;}
.drawer.open{opacity:1;pointer-events:auto;}
.drawer a{font-size:28px;font-weight:800;letter-spacing:-.02em;padding:8px 0;}
.drawer a.act{color:var(--accent);}
.drawer a.sm{font-size:16px;color:var(--accent);margin-top:14px;}
.drawer .x{position:absolute;top:14px;right:16px;}

section{padding:110px 0;border-top:1px solid var(--line);}
.hero{border:0;padding:120px 0 70px;}
.tag{display:inline-flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;letter-spacing:.14em;color:var(--accent);text-transform:uppercase;}
.tag i{width:12px;height:12px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 7px color-mix(in srgb,var(--accent) 18%,transparent);flex:none;}
h1{font-size:clamp(34px,5.4vw,76px);line-height:1.06;font-weight:800;letter-spacing:-.035em;margin:28px 0 26px;text-wrap:balance;}
h1 span{display:block;}
h1 em{font-style:normal;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.sub{font-size:clamp(16px,1.5vw,19px);color:var(--muted);max-width:60ch;}
.sub b{color:var(--fg);font-weight:700;}
.btns{display:flex;flex-wrap:wrap;gap:14px;margin-top:36px;}
.pill{padding:15px 28px;border-radius:999px;font-weight:700;font-size:15px;border:1px solid var(--line);transition:transform .2s,background .2s;display:inline-flex;gap:10px;align-items:center;white-space:nowrap;}
.pill:hover{transform:translateY(-2px);}
.pill:not(.fill):hover{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 8%,transparent);}
.pill.fill{background:var(--accent);color:#1a1208;border-color:var(--accent);}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:36px;list-style:none;}
.chips li,.tags li{font-size:12.5px;padding:5px 13px;border-radius:999px;border:1px solid var(--line);color:var(--muted);}
.stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:44px;}
.stats div{padding:30px 26px 34px;border-right:1px solid var(--line);}
.stat{opacity:0;transform:translateY(34px);transition:opacity .7s ease var(--d,0ms),transform .8s cubic-bezier(.16,1,.3,1) var(--d,0ms);}
.stat.in{opacity:1;transform:none;}
.stats div:first-child{padding-left:0;}.stats div:last-child{border-right:0;}
.stats b{display:block;font-size:clamp(28px,3vw,36px);font-weight:700;letter-spacing:-.02em;}
.stats p{font-size:14.5px;color:var(--muted);margin-top:8px;line-height:1.55;}

.eyebrow{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:13px;letter-spacing:.16em;color:var(--accent);text-transform:uppercase;}
h2{font-size:clamp(30px,4.6vw,58px);font-weight:800;letter-spacing:-.03em;line-height:1.1;margin-top:18px;text-wrap:balance;}
.head{margin-bottom:52px;}
.about{display:grid;grid-template-columns:1fr 1.15fr;gap:72px;align-items:start;}
.about .head{margin:0;}
.about p{font-size:clamp(16px,1.4vw,18.5px);color:var(--muted);}.about p+p{margin-top:20px;}
.about p b{color:var(--fg);}
.focus{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:36px;}
.focus div{padding:20px 22px;border:1px solid var(--line);border-radius:20px;background:var(--card);}
.focus h3{font-size:15.5px;font-weight:700;}.focus p{font-size:14px!important;margin:6px 0 0!important;}

.icons{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:56px;}
.gi{width:38px;height:38px;color:var(--accent);}
.bd{width:38px;height:38px;display:grid;place-items:center;border-radius:11px;border:1px solid color-mix(in srgb,var(--accent) 50%,var(--line));color:var(--accent);font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;}
.ic{display:flex;flex-direction:column;align-items:center;gap:10px;padding:22px 8px 16px;background:var(--card);border:1px solid var(--line);border-radius:22px;font-size:12.5px;font-weight:600;color:var(--muted);text-align:center;transition:border-color .2s,transform .2s;}
.ic:hover{border-color:var(--accent);transform:translateY(-3px);}
.ic img{width:38px;height:38px;object-fit:contain;}
.inv{filter:invert(.88);}[data-theme=light] .inv{filter:none;}
.genai{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:60px;}
.genai .eyebrow{margin-right:8px;}
.genai .g{font-size:13px;padding:6px 14px;border-radius:999px;border:1px solid color-mix(in srgb,var(--accent) 40%,var(--line));color:var(--fg);}
.prof{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.pc{background:var(--card);border:1px solid var(--line);border-radius:26px;padding:28px;}
.pc-t{display:flex;justify-content:space-between;gap:14px;align-items:flex-start;}
.pc h3{font-size:18px;font-weight:700;line-height:1.3;}
.pc small{display:block;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:var(--muted);margin-top:6px;line-height:1.5;}
.pc .pct{font-size:30px;font-weight:800;color:var(--accent);line-height:1;}
.bar{height:6px;background:var(--line);border-radius:3px;margin:20px 0 12px;overflow:hidden;}
.bar i{display:block;height:100%;width:0;background:var(--accent);border-radius:3px;transition:width 1.2s cubic-bezier(.16,1,.3,1) .2s;}
.in .bar i{width:var(--w);}
.pc p{font-size:14px;color:var(--muted);}

.job{background:var(--card);border:1px solid var(--line);border-radius:34px;padding:clamp(24px,4vw,48px);}
.job-h{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;padding-bottom:26px;border-bottom:1px solid var(--line);}
.job h3{font-size:clamp(22px,3vw,34px);font-weight:800;letter-spacing:-.02em;}
.org{font-family:'JetBrains Mono',monospace;color:var(--accent);font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;margin-top:10px;}
.meta{color:var(--muted);font-size:15px;}
.job .lead{font-size:clamp(16px,1.4vw,18px);margin:26px 0 6px;max-width:72ch;}
.pts{margin:18px 0 0;list-style:none;font-size:clamp(15.5px,1.3vw,17px);}
.pts li{position:relative;margin-top:14px;padding-left:26px;color:var(--muted);}
.pts li::before{content:'';position:absolute;left:4px;top:.62em;width:8px;height:8px;border-radius:50%;background:var(--accent);}
.pts b{color:var(--fg);font-weight:700;}

.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.card{background:var(--card);border:1px solid var(--line);border-radius:28px;overflow:hidden;display:flex;flex-direction:column;transition:transform .25s,border-color .25s;}
.card:hover{transform:translateY(-4px);border-color:color-mix(in srgb,var(--accent) 45%,var(--line));}
.shot{aspect-ratio:400/240;position:relative;overflow:hidden;background:#101018;border-bottom:1px solid var(--line);}
.art{width:100%;height:100%;position:relative;transition:transform .5s;}
.art svg{display:block;width:100%;height:100%;}
.real{position:absolute;left:17%;top:14.2%;width:66%;height:61.7%;object-fit:cover;object-position:top;border-radius:3px;}
.card:hover .art{transform:scale(1.04);}
.shot i{position:absolute;top:14px;right:14px;width:40px;height:40px;border-radius:50%;background:#0b0b11;color:#fff;display:grid;place-items:center;font-style:normal;font-size:12px;border:1px solid var(--line);font-family:'JetBrains Mono',monospace;}
.cb{padding:18px 20px 22px;display:flex;flex-direction:column;flex:1;}
.cb .eyebrow{font-size:11px;letter-spacing:.1em;font-weight:500;}
.cb h3{font-size:17.5px;font-weight:800;letter-spacing:-.01em;margin:8px 0;line-height:1.25;}
.cb p{color:var(--muted);font-size:13.5px;line-height:1.6;}
.tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px;list-style:none;}
.cl{display:flex;gap:18px;margin-top:auto;padding-top:16px;font-weight:700;font-size:13.5px;color:var(--accent);}

.certs{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-bottom:28px;}
.cert{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:26px;display:flex;flex-direction:column;gap:8px;transition:border-color .2s,transform .2s;}
.cert:hover{border-color:var(--accent);transform:translateY(-3px);}
.cert h3{font-size:17.5px;font-weight:700;line-height:1.35;}
.cert p{color:var(--muted);font-size:14.5px;flex:1;}
.cert .lk{color:var(--accent);font-weight:700;font-size:14px;margin-top:8px;}
.lc{background:var(--card);border:1px solid var(--line);border-radius:30px;padding:clamp(24px,4vw,40px) clamp(24px,4vw,44px);display:grid;grid-template-columns:auto 1fr;gap:clamp(24px,5vw,48px);align-items:center;}
.big{font-size:clamp(52px,8vw,92px);font-weight:800;letter-spacing:-.04em;color:var(--accent);line-height:1;display:block;}
.lc small{font-family:'JetBrains Mono',monospace;color:var(--muted);font-size:12px;letter-spacing:.14em;text-transform:uppercase;}
.lc h3{font-size:clamp(20px,2.4vw,24px);font-weight:800;}.lc p{color:var(--muted);margin:8px 0 18px;}

.edu{background:var(--card);border:1px solid var(--line);border-radius:34px;padding:clamp(24px,4vw,46px);}
.edu h3{font-size:clamp(22px,3vw,32px);font-weight:800;letter-spacing:-.02em;}
.edu .intro{color:var(--muted);font-size:clamp(15.5px,1.3vw,17px);margin:22px 0 28px;max-width:72ch;}
.courses{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;list-style:none;}
.courses li{padding:14px 16px;border:1px solid var(--line);border-radius:16px;font-size:14px;color:var(--muted);}

.ct{padding:110px 0 30px;}
.ctin{max-width:760px;margin:0 auto;}
.ctin h2{margin-bottom:0;}
.rule{height:2px;background:var(--accent);margin:34px 0 4px;position:relative;}
.rule::after{content:'';position:absolute;left:0;top:0;width:150px;height:20px;background:var(--accent);clip-path:polygon(0 0,100% 0,88% 100%,12% 100%);}
.fld{display:block;width:100%;background:none;border:0;border-bottom:2px solid var(--line);color:var(--fg);font:inherit;font-size:clamp(16px,1.6vw,19px);padding:34px 0 16px;outline:none;resize:none;transition:border-color .2s;}
.fld:focus{border-color:var(--accent);}
.fld::placeholder{color:var(--muted);}
.send{margin-top:42px;background:var(--accent);color:#1a1208;border:0;font:inherit;font-weight:700;font-size:clamp(16px,1.6vw,19px);padding:20px 32px;display:inline-flex;gap:14px;align-items:center;cursor:pointer;clip-path:polygon(0 0,100% 0,100% 78%,95% 100%,0 100%);transition:transform .2s;}
.send:hover{transform:translateY(-2px);}
.or{text-align:center;margin-top:72px;font-size:clamp(16px,2vw,21px);color:var(--muted);line-height:1.8;}
.or a{color:var(--accent);word-break:break-all;}
.avail{display:block;font-size:14px;color:var(--muted);margin-top:18px;text-align:center;}
.avail i{display:inline-block;vertical-align:middle;width:9px;height:9px;border-radius:50%;background:#4ade80;margin:-2px 10px 0 0;}
.soc{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:28px;}
.soc a{display:inline-flex;gap:10px;align-items:center;padding:12px 22px;border:1px solid var(--line);border-radius:999px;font-weight:700;font-size:14.5px;transition:background .2s,border-color .2s;}
.soc a:hover{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 8%,transparent);}
footer{padding:34px 0 56px;color:var(--muted);font-size:14px;}
footer .wrap{display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;}
footer code{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--accent);}

.reveal{opacity:0;transform:translateY(18px);transition:opacity .6s ease,transform .6s ease;}
.reveal.in{opacity:1;transform:none;}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto;}.reveal{opacity:1;transform:none;transition:none;}.bar i,.art{transition:none;}.stat{opacity:1;transform:none;transition:none;}}

@media(max-height:760px){.side{gap:24px;padding-top:24px;}.vn{gap:20px;}.vn a{font-size:12.5px;}}
@media(max-width:1200px){.prof{grid-template-columns:repeat(2,1fr);}}
@media(max-width:1000px){
  .side,.tog{display:none;}
  .page{padding-left:0;}
  .mbar{display:flex;position:sticky;top:0;z-index:30;align-items:center;justify-content:space-between;padding:10px 14px;background:color-mix(in srgb,var(--bg) 90%,transparent);backdrop-filter:blur(12px);border-bottom:1px solid var(--line);}
  .mbar>a{color:var(--fg);padding:6px;}
  .mbar div{display:flex;gap:4px;}
  html{scroll-padding-top:70px;}
  .wrap{padding:0 22px;}
  section{padding:76px 0;}
  .hero{padding:56px 0 36px;}
  .about{grid-template-columns:1fr;gap:30px;}
  .certs{grid-template-columns:repeat(2,1fr);}
  .courses{grid-template-columns:repeat(2,1fr);}
  .icons{grid-template-columns:repeat(4,1fr);gap:10px;}
  .head{margin-bottom:34px;}
  .grid{grid-template-columns:repeat(2,1fr);}
  .ct{padding:76px 0 24px;}
}
@media(max-width:700px){
  .stats{grid-template-columns:1fr 1fr;}
  .stats div{padding:20px 14px;border-bottom:1px solid var(--line);}
  .stats div:nth-child(odd){padding-left:0;}.stats div:nth-child(2n){border-right:0;}
  .grid,.prof,.certs,.focus{grid-template-columns:1fr;}
  .icons{grid-template-columns:repeat(3,1fr);}
  .lc{grid-template-columns:1fr;}
  .courses{grid-template-columns:1fr;}
  .btns .pill{flex:1 1 auto;justify-content:center;padding:14px 18px;font-size:14px;}
}
`;

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [open, setOpen] = useState(false);
  const [ck, setCk] = useState(0);
  const [active, setActive] = useState("home");
  useEffect(() => {
    document.title = "Mohammad Faraz | Software Engineer";
    const svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#0b0b11'/><rect x='3' y='3' width='58' height='58' rx='11' fill='none' stroke='#ffaa55' stroke-width='2'/><text x='32' y='43' text-anchor='middle' font-family='Georgia,serif' font-style='italic' font-weight='700' font-size='30' fill='#ffaa55'>MF</text></svg>";
    let link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
    link.type = "image/svg+xml"; link.href = "data:image/svg+xml," + encodeURIComponent(svg);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.hash) window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);
  useEffect(() => {
    const ids = ["home", ...NAV.map(n => n.toLowerCase())];
    const ob = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    ids.forEach(i => { const el = document.getElementById(i); if (el) ob.observe(el); });
    return () => ob.disconnect();
  }, []);
  const go = n => { setOpen(false); if (n === "Contact") setCk(c => c + 1); };
  const done = () => setLoaded(true);
  const id = n => n.toLowerCase();
  const toggle = () => setTheme(t => (t === "dark" ? "light" : "dark"));
  const ThemeI = theme === "dark" ? MoonI : SunI;

  return (
    <div className="app" data-theme={theme}>
      <style>{css}</style>
      {!loaded && <Preloader onDone={done} />}
      <div style={{ visibility: loaded ? "visible" : "hidden", opacity: loaded ? 1 : 0, transition: "opacity .5s ease" }}>

        <aside className="side">
          <a href="#home" aria-label="Home"><HomeI/></a>
          <nav className="vn" aria-label="Sections">{NAV.map(n => <a key={n} href={`#${id(n)}`} onClick={() => go(n)} className={active === id(n) ? "act" : ""} aria-current={active === id(n) ? "true" : undefined}>{n}</a>)}</nav>
        </aside>
        <button className="tog" onClick={toggle} aria-label="Toggle theme"><ThemeI/></button>

        <div className="mbar">
          <a href="#home" aria-label="Home"><HomeI/></a>
          <div>
            <button className="ibtn" onClick={toggle} aria-label="Toggle theme"><ThemeI/></button>
            <button className="ibtn" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
              <svg width="26" height="26" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
          </div>
        </div>
        <nav className={`drawer ${open ? "open" : ""}`} aria-label="Menu">
          <button className="ibtn x" onClick={() => setOpen(false)} aria-label="Close menu">
            <svg width="28" height="28" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>
          </button>
          <a href="#home" onClick={() => setOpen(false)}>Home</a>
          {NAV.map(n => <a key={n} href={`#${id(n)}`} onClick={() => go(n)} className={active === id(n) ? "act" : ""}>{n}</a>)}
          <a className="sm" href={L.cv} download="Mohammad_Faraz_Resume.pdf" onClick={() => setOpen(false)}>Download resume ↓</a>
        </nav>

        <div className="page">
          <main className="wrap">
            <section id="home" className="hero">
              <Reveal>
                <div className="tag"><i/> Software Engineer · Backend · MERN · GenAI</div>
                <h1><span>Backend by obsession.</span><span>Full stack by craft.</span><span><em>AI by curiosity.</em></span></h1>
                <p className="sub">I’m Mohammad Faraz, a software engineer with hands-on experience in MERN SaaS development, backend systems and Generative AI. I build software that stays reliable in production, not just in demos.</p>
                <div className="btns">
                  <a className="pill fill" href="#projects">See my projects ↘</a>
                  <a className="pill" href={L.cv} download="Mohammad_Faraz_Resume.pdf">Download resume ↓</a>
                </div>
                <ul className="chips">{["MERN", "Node.js", "React", "Next.js", "MongoDB", "Redis", "Docker", "LangGraph", "RAG", "MCP", "Python", "C++"].map(t => <li key={t}>{t}</li>)}</ul>
              </Reveal>
              <div className="stats">{STATS.map(([n, suf, t], i) => <Stat key={t} i={i} to={n} suf={suf} text={t}/>)}</div>
            </section>

            <section id="about" className="about">
              <Head n="01" label="About" title="Backend first, AI always."/>
              <Reveal>
                <p>I’m a Computer Science graduate (B.E., Chandigarh University, 2025) who works across the stack, with a focus on <b>backend engineering</b> and <b>Generative AI</b>. During a six-month internship I helped build a salon management SaaS on the MERN stack, contributing across APIs, access control and the React frontend.</p>
                <p>Since then I’ve gone deeper into AI engineering, building <b>RAG pipelines</b>, <b>LangGraph agents</b> and <b>MCP</b> integrations. I care about correctness and failure handling as much as features, and I keep my fundamentals sharp with <b>300+ LeetCode problems</b> solved.</p>
                <div className="focus">{FOCUS.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
              </Reveal>
            </section>

            <section id="skills">
              <Head n="02" label="Skills" title="Tools I build with."/>
              <Reveal className="icons">{SKILLS.map(([n, src, inv]) => <div key={n} className="ic">{src.startsWith("http") ? <img className={inv ? "inv" : ""} src={src} alt="" onError={e => { e.currentTarget.style.opacity = .3; }}/> : <GenIcon k={src}/>}{n}</div>)}</Reveal>
              <div className="prof">
                {PROFICIENCY.map(([t, s, p, d]) => (
                  <Reveal key={t} className="pc">
                    <div className="pc-t"><div><h3>{t}</h3><small>{s}</small></div><span className="pct">{p}%</span></div>
                    <div className="bar"><i style={{ "--w": `${p}%` }}/></div>
                    <p>{d}</p>
                  </Reveal>
                ))}
              </div>
            </section>

            <section id="experience">
              <Head n="03" label="Experience" title="What I’ve worked on."/>
              <Reveal className="job">
                <div className="job-h">
                  <div><h3>{JOB.role}</h3><div className="org">{JOB.org}</div></div>
                  <div className="meta">{JOB.meta}</div>
                </div>
                <p className="lead">{JOB.intro}</p>
                <ul className="pts">{JOB.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
                <Tags items={JOB.stack}/>
              </Reveal>
            </section>

            <section id="projects">
              <Head n="04" label="Selected work" title="Learning by building."/>
              <div className="grid">
                {PROJECTS.map((p, i) => (
                  <Reveal key={p.title} className="card">
                    <div className="shot"><Art k={p.k}/><i>{String(i + 1).padStart(2, "0")}</i></div>
                    <div className="cb">
                      <div className="eyebrow">{p.label}</div>
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                      <Tags items={p.tags}/>
                      <div className="cl"><a href={p.live} target="_blank" rel="noreferrer">Live demo ↗</a><a href={p.code} target="_blank" rel="noreferrer">Source ↗</a></div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            <section id="achievements">
              <Head n="05" label="Achievements" title="Always learning."/>
              <div className="certs">
                {CERTS.map(([t, org, yr, d, link]) => (
                  <Reveal key={t} className="cert">
                    <div className="eyebrow" style={{ fontSize: 11 }}>{org} · {yr}</div>
                    <h3>{t}</h3><p>{d}</p>
                    <a className="lk" href={link} target="_blank" rel="noreferrer">View certificate ↗</a>
                  </Reveal>
                ))}
              </div>
              <Reveal className="lc">
                <div><Counter to={300}/><small>Problems solved</small></div>
                <div>
                  <h3>LeetCode problem solving</h3>
                  <p>Steady practice across easy, medium and hard problems, strengthening my DSA foundations in C++ and Python.</p>
                  <a className="pill" href={L.leetcode} target="_blank" rel="noreferrer">View LeetCode profile ↗</a>
                </div>
              </Reveal>
            </section>

            <section id="education">
              <Head n="06" label="Education" title="Where it started."/>
              <Reveal className="edu">
                <div className="job-h" style={{ border: 0, padding: 0 }}>
                  <div><h3>Chandigarh University</h3><div className="org">B.E. in Computer Science & Engineering</div></div>
                  <div className="meta">Aug 2021 - May 2025</div>
                </div>
                <p className="intro">A four-year B.E. focused on software engineering, systems programming and applied mathematics, with hands-on development through projects and an industry internship.</p>
                <ul className="courses">{COURSES.map(c => <li key={c}>{c}</li>)}</ul>
              </Reveal>
            </section>

            <section id="contact" className="ct"><Contact ck={ck}/></section>
          </main>

          <footer><div className="wrap">
            <span>© {new Date().getFullYear()} Mohammad Faraz</span>
            <code>while (alive) {"{"} learn(); build(); ship(); {"}"}</code>
          </div></footer>
        </div>
      </div>
    </div>
  );
}