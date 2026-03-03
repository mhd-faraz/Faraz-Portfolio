import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Lenis from "@studio-freight/lenis";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const ROLES = ["Full Stack Developer","MERN Stack Engineer","Frontend Specialist","WebRTC Builder","Open Source Contributor"];

const ALL_SKILLS = [
  { name:"React.js",    color:"#61DAFB", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name:"Node.js",     color:"#68A063", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name:"MongoDB",     color:"#4DB33D", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name:"Express.js",  color:"#aaaaaa", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name:"JavaScript",  color:"#F7DF1E", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name:"Python",      color:"#3776AB", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name:"C++",         color:"#00599C", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name:"MySQL",       color:"#00758F", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name:"Git",         color:"#F05032", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name:"HTML5",       color:"#E34F26", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name:"CSS3",        color:"#1572B6", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name:"Tailwind CSS",color:"#38BDF8", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name:"Socket.io",   color:"#ffffff", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
  { name:"VS Code",     color:"#007ACC", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name:"Postman",     color:"#FF6C37", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name:"GSAP",        color:"#88CE02", icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
];

const PROFICIENCY = [
  { label:"Frontend Development", sublabel:"React · JS · HTML · CSS · Tailwind · GSAP", pct:88, color:"#00d4ff",  desc:"Interactive UIs, animations, responsive design" },
  { label:"Backend Development",  sublabel:"Node.js · Express · MongoDB · MySQL · APIs", pct:82, color:"#7b2fff",  desc:"RESTful APIs, authentication, database design" },
  { label:"DSA & Algorithms",     sublabel:"C++ · Python · Data Structures · LeetCode",  pct:74, color:"#00ffb3",  desc:"Problem solving, optimized logic, competitive coding" },
];

const PROJECTS = [
  { title:"Connectify", desc:"Real-time video communication platform with secure room-based group calls using WebRTC. Socket-based signaling for seamless peer-to-peer connectivity.", tags:["React","Node.js","Express","MongoDB","Socket.io","WebRTC"], live:"https://connectify-dev.netlify.app/lobby.html", github:"https://github.com/mhd-faraz/Connectify", accent:"#00d4ff", img:"https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80", num:"01" },
  { title:"Magma Real Estate", desc:"Visually immersive real estate platform with advanced scroll-based animations, smooth page transitions, and cinematic UI motion using GSAP.", tags:["React","GSAP","ScrollTrigger","Locomotive Scroll","Tailwind"], live:"https://magma-real-estate.vercel.app", github:"https://github.com/mhd-faraz/MAGMA-REAL-ESTATE", accent:"#7b2fff", img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", num:"02" },
  { title:"Weather Forecast App", desc:"Responsive real-time weather app using WeatherAPI. Displays dynamic temperature, humidity, wind speed and condition-based UI changes with smooth DOM updates and clean UX.", tags:["HTML","CSS","JavaScript","WeatherAPI","DOM"], live:"https://weather-app-ten-ochre-29.vercel.app", github:"https://github.com/mhd-faraz/weather-app", accent:"#00ffb3", img:"https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80", num:"03" },
  { title:"Sidcup Family Golf", desc:"Visually rich golf course website with immersive GSAP scroll animations, dynamic cursor effects, smooth locomotive scroll, and a premium interactive UI experience.", tags:["HTML","CSS","GSAP","Locomotive Scroll","JavaScript"], live:"https://sidcup-family-golf-tawny.vercel.app/", github:"https://github.com/mhd-faraz/SIDCUP-Family-Golf", accent:"#22c55e", img:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80", num:"04" },
  { title:"Smart Expense Tracker", desc:"Sleek, modern and responsive app to track income and expenses in real-time. Features animated transitions, futuristic UI, localStorage support, and reset functionality — perfect for managing personal finances with style.", tags:["HTML","CSS","JavaScript","localStorage","DOM"], live:"https://expensetracker-pied-pi.vercel.app", github:"https://github.com/mhd-faraz/EXPENSE-TRACKER", accent:"#f59e0b", img:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80", num:"05" },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────
const Styles = () => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"/>
    <style>{`
      *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
      html{scroll-behavior:smooth;}
      body{background:#050c1a;color:#d8e4f0;overflow-x:hidden;font-family:'Inter',sans-serif;font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased;}
      h1,h2,h3,h4{font-family:'Outfit',sans-serif;line-height:1.1;}
      ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#050c1a;}::-webkit-scrollbar-thumb{background:rgba(0,212,255,0.3);border-radius:2px;}
      .lbl{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#00d4ff;display:flex;align-items:center;gap:10px;margin-bottom:14px;}
      .lbl::before{content:'';width:28px;height:1px;background:#00d4ff;}

      /* ── REVEAL SYSTEM ── */
      .rev{opacity:0;transform:translateY(28px);}
      .rev.v{opacity:1;transform:translateY(0);transition:opacity .75s ease,transform .75s ease;}
      .rev-l{opacity:0;transform:translateX(-40px);}
      .rev-l.v{opacity:1;transform:translateX(0);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1);}
      .rev-r{opacity:0;transform:translateX(40px);}
      .rev-r.v{opacity:1;transform:translateX(0);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1);}

      /* ── NAV ── */
      .nav{position:fixed;top:0;width:100%;z-index:200;padding:18px 60px;display:flex;justify-content:space-between;align-items:center;backdrop-filter:blur(20px) saturate(180%);background:rgba(5,12,26,0.82);border-bottom:1px solid rgba(0,212,255,0.07);}
      .nlogo{font-family:'Space Mono',monospace;font-size:14px;color:#00d4ff;letter-spacing:.1em;display:flex;align-items:center;gap:5px;}
      .nlogo .d{color:rgba(255,255,255,0.2);}
      .nlinks{display:flex;gap:30px;list-style:none;}
      .nlinks a{font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:rgba(216,228,240,0.5);text-decoration:none;transition:color .25s;position:relative;}
      .nlinks a::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:#00d4ff;transition:width .25s;}
      .nlinks a:hover{color:#00d4ff;}.nlinks a:hover::after{width:100%;}
      .ncta{font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#050c1a;background:linear-gradient(135deg,#00d4ff,#0096b7);padding:10px 22px;border-radius:6px;text-decoration:none;transition:all .28s;}
      .ncta:hover{box-shadow:0 0 22px rgba(0,212,255,0.4);transform:translateY(-1px);}
      .ndl{font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#050c1a;background:linear-gradient(135deg,#00d4ff,#0096b7);padding:10px 18px;border-radius:6px;text-decoration:none;transition:all .28s;display:inline-flex;align-items:center;gap:6px;}
      .ndl:hover{box-shadow:0 0 22px rgba(0,212,255,0.5);transform:translateY(-1px);}
      .nav-right{display:flex;align-items:center;gap:10px;}

      /* ── HERO ── */
      .hw{position:relative;width:100vw;min-height:100vh;background:radial-gradient(ellipse at 50% 55%,#0c1830 0%,#050c1a 65%);overflow:hidden;display:flex;flex-direction:column;}
      canvas.hcv{position:absolute;top:0;left:0;width:100%!important;height:100%!important;z-index:1;}
      .gbg{position:absolute;inset:0;z-index:0;background-image:linear-gradient(rgba(0,212,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.025) 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(ellipse at center,black 15%,transparent 70%);mask-image:radial-gradient(ellipse at center,black 15%,transparent 70%);}
      .gl{position:absolute;top:10%;left:-8%;width:500px;height:500px;background:radial-gradient(circle,rgba(0,212,255,.065) 0%,transparent 70%);border-radius:50%;z-index:2;pointer-events:none;animation:gp 5s ease-in-out infinite;}
      .gr{position:absolute;bottom:0;right:-8%;width:580px;height:580px;background:radial-gradient(circle,rgba(123,47,255,.07) 0%,transparent 70%);border-radius:50%;z-index:2;pointer-events:none;}
      @keyframes gp{0%,100%{opacity:.5;transform:scale(1);}50%{opacity:1;transform:scale(1.07);}}
      .hc{position:relative;z-index:10;display:flex;align-items:center;min-height:100vh;padding:0 80px;}
      .hl{flex:1;max-width:660px;opacity:0;transform:translateY(32px);transition:opacity .85s ease,transform .85s ease;}
      .hl.in{opacity:1;transform:translateY(0);}
      .htag{display:inline-flex;align-items:center;gap:8px;font-family:'Space Mono',monospace;font-size:10px;color:#00d4ff;letter-spacing:.2em;text-transform:uppercase;margin-bottom:24px;padding:7px 15px;border:1px solid rgba(0,212,255,.22);background:rgba(0,212,255,.04);border-radius:4px;}
      .htag .dot{width:6px;height:6px;background:#00d4ff;border-radius:50%;animation:blink 1.6s ease-in-out infinite;}
      @keyframes blink{0%,100%{opacity:1;}50%{opacity:.1;}}
      .hname{font-family:'Outfit',sans-serif;font-size:clamp(54px,8vw,104px);font-weight:900;line-height:.95;letter-spacing:-.03em;margin-bottom:12px;color:#fff;}
      .hname .grad{background:linear-gradient(135deg,#00d4ff 0%,#7b2fff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
      .hrole{font-family:'Space Mono',monospace;font-size:clamp(13px,1.6vw,19px);color:rgba(216,228,240,.45);margin-bottom:28px;height:32px;display:flex;align-items:center;gap:6px;}
      .rv{color:#00d4ff;}.cr{display:inline-block;width:2px;height:1.1em;background:#00d4ff;border-radius:1px;}
      .hdesc{font-family:'Inter',sans-serif;font-size:17px;font-weight:400;color:rgba(216,228,240,.5);line-height:1.75;max-width:510px;margin-bottom:40px;}
      .hsts{display:flex;gap:44px;margin-bottom:44px;}
      .sv{font-family:'Outfit',sans-serif;font-size:clamp(22px,2.8vw,34px);font-weight:800;background:linear-gradient(135deg,#00d4ff,#7b2fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;letter-spacing:-.01em;}
      .sl{font-family:'Inter',sans-serif;font-size:12px;font-weight:500;color:rgba(216,228,240,.3);letter-spacing:.06em;text-transform:uppercase;margin-top:5px;}
      .hbtns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:32px;}
      .bpri{font-family:'Inter',sans-serif;font-size:14px;font-weight:600;color:#050c1a;background:linear-gradient(135deg,#00d4ff,#0096b7);padding:14px 32px;border-radius:6px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .28s;position:relative;overflow:hidden;}
      .bpri::after{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);transition:left .5s;}
      .bpri:hover::after{left:100%;}.bpri:hover{box-shadow:0 0 36px rgba(0,212,255,.38);transform:translateY(-2px);}
      .bsec{font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:rgba(216,228,240,.65);border:1px solid rgba(255,255,255,.13);padding:13px 32px;border-radius:6px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .28s;}
      .bsec:hover{border-color:rgba(123,47,255,.55);color:#fff;box-shadow:0 0 20px rgba(123,47,255,.2);transform:translateY(-2px);}
      .chips{display:flex;flex-wrap:wrap;gap:8px;}
      .chip{font-family:'Space Mono',monospace;font-size:10px;color:rgba(216,228,240,.35);border:1px solid rgba(255,255,255,.08);padding:5px 12px;border-radius:4px;letter-spacing:.08em;text-transform:uppercase;transition:all .28s;cursor:default;}
      .chip:hover{color:#00d4ff;border-color:rgba(0,212,255,.3);background:rgba(0,212,255,.04);}
      .scls{position:absolute;left:24px;bottom:44px;z-index:10;display:flex;flex-direction:column;gap:18px;align-items:center;opacity:0;transform:translateX(-18px);transition:all 1s ease .8s;}
      .scls.in{opacity:1;transform:translateX(0);}
      .scls::after{content:'';width:1px;height:52px;background:linear-gradient(to bottom,rgba(0,212,255,.5),transparent);margin-top:6px;}
      .sa{font-family:'Space Mono',monospace;font-size:9px;color:rgba(216,228,240,.28);text-decoration:none;letter-spacing:.1em;writing-mode:vertical-rl;transform:rotate(180deg);transition:color .28s;}
      .sa:hover{color:#00d4ff;}
      .si{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);z-index:10;display:flex;flex-direction:column;align-items:center;gap:7px;opacity:0;animation:fuy 1s ease 1.7s forwards;}
      .sitx{font-family:'Space Mono',monospace;font-size:8px;color:rgba(216,228,240,.2);letter-spacing:.22em;text-transform:uppercase;}
      .sib{width:1px;height:46px;background:linear-gradient(to bottom,rgba(0,212,255,.6),transparent);animation:siba 2s ease-in-out infinite;}
      @keyframes siba{0%{transform:scaleY(0);transform-origin:top;opacity:0;}50%{transform:scaleY(1);transform-origin:top;opacity:1;}100%{transform:scaleY(0);transform-origin:bottom;opacity:0;}}
      @keyframes fuy{from{opacity:0;transform:translateX(-50%) translateY(14px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
      .ctl{position:absolute;top:80px;left:60px;width:34px;height:34px;z-index:10;opacity:.3;border-top:1px solid #00d4ff;border-left:1px solid #00d4ff;}
      .cbr{position:absolute;bottom:56px;right:26px;width:34px;height:34px;z-index:10;opacity:.3;border-bottom:1px solid #7b2fff;border-right:1px solid #7b2fff;}

      /* ── SECTIONS ── */
      .sec{padding:120px 80px;position:relative;overflow:hidden;}
      .inn{max-width:1180px;margin:0 auto;}
      .sdiv{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(0,212,255,.1),transparent);}

      /* ── ABOUT ── */
      .ab-sec{background:#060e1f;overflow:hidden;}
      .ab-grid{display:grid;grid-template-columns:1fr 1fr;gap:90px;align-items:center;}

      /* Illustration */
      .illus-wrap{position:relative;display:flex;align-items:center;justify-content:center;}
      .blob{position:relative;width:420px;height:420px;display:flex;align-items:center;justify-content:center;}
      /* rotating outer ring */
      .blob-ring{position:absolute;inset:-20px;border-radius:50%;border:1px solid rgba(0,212,255,.12);animation:ringRotate 18s linear infinite;}
      .blob-ring::before{content:'';position:absolute;top:-4px;left:50%;width:8px;height:8px;background:#00d4ff;border-radius:50%;transform:translateX(-50%);box-shadow:0 0 10px #00d4ff;}
      .blob-ring2{position:absolute;inset:-50px;border-radius:50%;border:1px dashed rgba(123,47,255,.12);animation:ringRotate 28s linear infinite reverse;}
      .blob-ring2::before{content:'';position:absolute;bottom:-4px;left:30%;width:6px;height:6px;background:#7b2fff;border-radius:50%;box-shadow:0 0 8px #7b2fff;}
      @keyframes ringRotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}

      .blob-bg{position:absolute;inset:20px;background:radial-gradient(ellipse at 55% 40%,rgba(123,47,255,.22) 0%,rgba(0,212,255,.09) 55%,transparent 80%);border-radius:60% 40% 65% 35% / 50% 60% 40% 60%;animation:bm 8s ease-in-out infinite;}
      @keyframes bm{0%,100%{border-radius:60% 40% 65% 35% / 50% 60% 40% 60%;}33%{border-radius:40% 60% 35% 65% / 60% 40% 60% 40%;}66%{border-radius:65% 35% 50% 50% / 40% 65% 35% 60%;}}

      .dev-svg-wrap{position:relative;z-index:2;animation:devFloat 3.5s ease-in-out infinite;}
      @keyframes devFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}

      /* screen glow pulse */
      .screen-glow{animation:scrGlow 2.2s ease-in-out infinite;}
      @keyframes scrGlow{0%,100%{opacity:.6;}50%{opacity:1;}}

      /* particles around illustration */
      .iparticle{position:absolute;border-radius:50%;pointer-events:none;}
      .ip1{width:4px;height:4px;background:#00d4ff;top:15%;left:10%;animation:ipf 3s ease-in-out infinite;}
      .ip2{width:3px;height:3px;background:#7b2fff;bottom:20%;right:12%;animation:ipf 4s ease-in-out infinite .8s;}
      .ip3{width:5px;height:5px;background:#00ffb3;top:60%;left:5%;animation:ipf 3.5s ease-in-out infinite 1.5s;}
      .ip4{width:3px;height:3px;background:#00d4ff;top:25%;right:8%;animation:ipf 2.8s ease-in-out infinite .4s;}
      .ip5{width:4px;height:4px;background:#ff2d78;bottom:35%;left:15%;animation:ipf 4.2s ease-in-out infinite 1s;}
      @keyframes ipf{0%,100%{opacity:.3;transform:scale(1);}50%{opacity:1;transform:scale(1.8);}}

      .fc{position:absolute;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;color:#00d4ff;border:1px solid rgba(0,212,255,.35);background:rgba(5,12,26,.9);backdrop-filter:blur(12px);padding:8px 14px;border-radius:6px;white-space:nowrap;z-index:3;}
      .fc1{top:14%;right:2%;animation:flt 3.2s ease-in-out infinite;}
      .fc2{bottom:12%;left:-2%;animation:flt 3.2s ease-in-out 1.1s infinite;}
      @keyframes flt{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}

      /* Code lines animating in SVG screen */
      .code-line{animation:codeFlicker 3s ease-in-out infinite;}
      .code-line:nth-child(1){animation-delay:0s;}
      .code-line:nth-child(2){animation-delay:.4s;}
      .code-line:nth-child(3){animation-delay:.8s;}
      .code-line:nth-child(4){animation-delay:1.2s;}
      .code-line:nth-child(5){animation-delay:1.6s;}
      @keyframes codeFlicker{0%,100%{opacity:.9;}40%{opacity:.4;}60%{opacity:.95;}}

      /* About right */
      .ab-r h2{font-family:'Outfit',sans-serif;font-size:clamp(36px,4.5vw,54px);font-weight:800;margin-bottom:14px;}
      .tagline-wrap{border-left:3px solid #00d4ff;padding-left:16px;margin-bottom:34px;}
      .tagline-inner{font-family:'Inter',sans-serif;font-size:16px;color:rgba(216,228,240,.5);font-style:italic;line-height:1.6;}

      .wil{display:flex;flex-direction:column;gap:12px;}
      .wii{display:flex;gap:14px;align-items:flex-start;padding:16px 18px;border:1px solid rgba(255,255,255,.05);border-radius:8px;background:rgba(255,255,255,.015);transition:all .35s;opacity:0;transform:translateX(-30px);}
      .wii.v{opacity:1;transform:translateX(0);transition:opacity .55s ease,transform .55s cubic-bezier(.16,1,.3,1),border-color .35s,background .35s,box-shadow .35s;}
      .wii:hover{border-color:rgba(0,212,255,.2);background:rgba(0,212,255,.03);transform:translateX(8px)!important;box-shadow:0 4px 20px rgba(0,212,255,.06);}
      .wico{font-size:18px;flex-shrink:0;width:38px;height:38px;border-radius:7px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);transition:transform .35s;}
      .wii:hover .wico{transform:scale(1.2) rotate(8deg);}
      .wit{font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;color:#d8e4f0;margin-bottom:4px;}
      .wid{font-family:'Inter',sans-serif;font-size:14px;color:rgba(216,228,240,.42);line-height:1.55;}

      /* ── SKILLS ── */
      .sk-sec{background:#050c1a;position:relative;}
      .sk-sec::before{content:'';position:absolute;top:-200px;right:-200px;width:600px;height:600px;background:radial-gradient(circle,rgba(123,47,255,.055) 0%,transparent 70%);pointer-events:none;}

      /* Headline animated */
      .sk-head{font-family:'Outfit',sans-serif;font-size:clamp(36px,4.5vw,54px);font-weight:800;margin-bottom:12px;overflow:hidden;}
      .sk-head .w{display:inline-block;transform:translateY(110%);opacity:0;transition:transform .7s cubic-bezier(.16,1,.3,1),opacity .7s ease;margin-right:.22em;}
      .sk-head.v .w{transform:translateY(0);opacity:1;}
      .sk-head.v .w:nth-child(1){transition-delay:0s;}.sk-head.v .w:nth-child(2){transition-delay:.1s;}.sk-head.v .w:nth-child(3){transition-delay:.2s;}

      .sk-sub{font-family:'Inter',sans-serif;font-size:16px;color:rgba(216,228,240,.42);max-width:580px;line-height:1.7;overflow:hidden;margin-bottom:0;}
      .sk-sub .si{display:block;transform:translateY(100%);opacity:0;transition:transform .8s cubic-bezier(.16,1,.3,1) .35s,opacity .8s ease .35s;}
      .sk-sub.v .si{transform:translateY(0);opacity:1;}

      /* Skills icon grid */
      .sk-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:44px 0 56px;}
      .skc{display:flex;flex-direction:column;align-items:center;gap:10px;padding:22px 12px 16px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:10px;cursor:default;transition:all .35s;position:relative;overflow:hidden;opacity:0;transform:translateY(20px);}
      .skc.v{opacity:1;transform:translateY(0);transition:opacity .5s ease,transform .5s cubic-bezier(.34,1.56,.64,1);}
      .skc::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:var(--c,#00d4ff);opacity:0;transition:opacity .3s;}
      .skc:hover{transform:translateY(-6px)!important;border-color:rgba(255,255,255,.14);background:rgba(255,255,255,.045);box-shadow:0 12px 36px rgba(0,0,0,.3);}
      .skc:hover::after{opacity:1;}
      .sk-ic{width:44px;height:44px;object-fit:contain;filter:drop-shadow(0 2px 8px rgba(0,0,0,.5));transition:transform .35s;}
      .skc:hover .sk-ic{transform:scale(1.15) rotate(-4deg);}
      .sk-nm{font-family:'Inter',sans-serif;font-size:12px;font-weight:600;color:rgba(216,228,240,.65);text-align:center;}

      /* Proficiency section */
      .prof-wrap{margin-top:8px;}
      .prof-title{font-family:'Outfit',sans-serif;font-size:clamp(22px,2.5vw,30px);font-weight:700;margin-bottom:8px;}
      .prof-sub{font-family:'Inter',sans-serif;font-size:14px;color:rgba(216,228,240,.4);margin-bottom:36px;line-height:1.6;}

      .prof-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
      .pc{border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:28px 26px;background:rgba(255,255,255,.02);position:relative;overflow:hidden;transition:all .4s;opacity:0;transform:translateY(28px);}
      .pc.v{opacity:1;transform:translateY(0);transition:opacity .6s ease,transform .6s cubic-bezier(.16,1,.3,1);}
      .pc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--c),transparent);opacity:.6;}
      .pc:hover{border-color:var(--c-dim,rgba(0,212,255,.2));background:rgba(255,255,255,.035);transform:translateY(-5px)!important;box-shadow:0 16px 40px rgba(0,0,0,.25);}
      .pc-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;}
      .pc-label{font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;color:#d8e4f0;line-height:1.3;}
      .pc-sub{font-family:'Space Mono',monospace;font-size:9px;color:rgba(216,228,240,.35);letter-spacing:.08em;margin-top:5px;line-height:1.5;}
      .pc-pct{font-family:'Outfit',sans-serif;font-size:36px;font-weight:900;color:var(--c);line-height:1;transition:all .4s;}
      .pc:hover .pc-pct{transform:scale(1.1);}
      .pc-bar-bg{height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden;margin-bottom:14px;}
      .pc-bar-fill{height:100%;border-radius:3px;width:0;background:linear-gradient(90deg,var(--c),color-mix(in srgb,var(--c) 50%,transparent));transition:width 1.4s cubic-bezier(.16,1,.3,1);}
      .pc-desc{font-family:'Inter',sans-serif;font-size:13px;color:rgba(216,228,240,.38);line-height:1.55;}

      /* hover shimmer on prof card */
      .pc::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent 40%,rgba(255,255,255,.03) 50%,transparent 60%);opacity:0;transition:opacity .4s,transform .4s;transform:translateX(-100%);}
      .pc:hover::after{opacity:1;transform:translateX(100%);}

      /* ── EXPERIENCE ── */
      .ex-sec{background:#060e1f;}
      .ex-card{border:1px solid rgba(0,212,255,.15);border-radius:12px;overflow:hidden;background:rgba(0,212,255,.015);}
      .ex-hd{padding:36px 40px 28px;border-bottom:1px solid rgba(0,212,255,.08);display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;background:rgba(0,212,255,.02);}
      .ex-co{font-family:'Outfit',sans-serif;font-size:28px;font-weight:800;color:#d8e4f0;margin-bottom:8px;}
      .ex-co span{color:#00d4ff;}
      .ex-rl{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
      .ex-rol{font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:rgba(216,228,240,.55);}
      .ex-badge{font-family:'Space Mono',monospace;font-size:10px;color:#00d4ff;border:1px solid rgba(0,212,255,.3);padding:3px 10px;border-radius:20px;letter-spacing:.08em;text-transform:uppercase;}
      .ex-dt{font-family:'Space Mono',monospace;font-size:11px;color:rgba(216,228,240,.35);text-align:right;}
      .ex-dt span{display:block;font-size:10px;color:#7b2fff;margin-top:4px;}
      .ex-bd{padding:36px 40px;}
      .ex-sum{font-family:'Inter',sans-serif;font-size:16px;color:rgba(216,228,240,.5);line-height:1.75;margin-bottom:36px;max-width:800px;}
      .ex-sub{font-family:'Space Mono',monospace;font-size:10px;color:rgba(216,228,240,.3);letter-spacing:.2em;text-transform:uppercase;margin-bottom:18px;}
      .ex-achs{display:flex;flex-direction:column;gap:12px;margin-bottom:36px;}
      .ex-ach{display:flex;gap:14px;align-items:flex-start;padding:16px 20px;border-radius:8px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.04);transition:all .3s;opacity:0;transform:translateY(14px);}
      .ex-ach.v{opacity:1;transform:translateY(0);transition:opacity .55s ease,transform .55s ease,background .3s,border-color .3s;}
      .ex-ach:hover{background:rgba(0,212,255,.03);border-color:rgba(0,212,255,.1);}
      .ab{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:7px;}
      .at{font-family:'Inter',sans-serif;font-size:15px;color:rgba(216,228,240,.55);line-height:1.65;}
      .at strong{color:#d8e4f0;font-weight:600;}
      .ex-techs{display:flex;flex-wrap:wrap;gap:8px;}
      .ex-tech{font-family:'Space Mono',monospace;font-size:10px;color:rgba(0,212,255,.85);border:1px solid rgba(0,212,255,.22);background:rgba(0,212,255,.04);padding:5px 12px;border-radius:4px;letter-spacing:.06em;}

      /* ── PROJECTS ── */
      .pr-sec{background:#050c1a;}
      .pgrid{display:grid;grid-template-columns:1fr 1fr;gap:2px;}
      .pcard{position:relative;overflow:hidden;background:#060e1f;cursor:pointer;opacity:0;transform:translateY(32px);}
      .pcard.v{opacity:1;transform:translateY(0);transition:opacity .6s ease,transform .6s cubic-bezier(.16,1,.3,1);}
      .pcard:nth-child(1){border-radius:10px 0 0 0;}.pcard:nth-child(2){border-radius:0 10px 0 0;}
      .pcard:nth-child(3){border-radius:0;}.pcard:nth-child(4){border-radius:0;}
      .pcard:nth-child(5){border-radius:0 0 0 10px;}.pcard:nth-child(6){border-radius:0 0 10px 0;}
      .pimg{width:100%;height:240px;object-fit:cover;transition:transform .65s cubic-bezier(.16,1,.3,1),filter .45s;filter:grayscale(30%) brightness(.7);display:block;}
      .pcard:hover .pimg{transform:scale(1.06);filter:grayscale(0%) brightness(.85);}
      .pbody{padding:26px 26px 30px;position:relative;}
      .pnum{position:absolute;top:-22px;right:22px;font-family:'Outfit',sans-serif;font-size:56px;font-weight:900;line-height:1;color:rgba(255,255,255,.038);pointer-events:none;}
      .ptop{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;}
      .ptit{font-family:'Outfit',sans-serif;font-size:20px;font-weight:700;letter-spacing:-.01em;transition:color .28s;}
      .pcard:hover .ptit{color:var(--a);}
      .plks{display:flex;gap:8px;}
      .pl{font-family:'Space Mono',monospace;font-size:9px;color:rgba(216,228,240,.4);text-decoration:none;letter-spacing:.1em;text-transform:uppercase;padding:5px 12px;border:1px solid rgba(255,255,255,.07);border-radius:4px;transition:all .28s;white-space:nowrap;}
      .pl:hover{color:var(--a);border-color:var(--a);}
      .pdesc{font-family:'Inter',sans-serif;font-size:13px;color:rgba(216,228,240,.42);line-height:1.7;margin-bottom:14px;}
      .ptags{display:flex;flex-wrap:wrap;gap:6px;}
      /* ── PROJECT TAGS — hover readable ── */
      .ptag{
        font-family:'Space Mono',monospace;font-size:9px;
        color:rgba(216,228,240,.3);padding:4px 10px;
        border:1px solid rgba(255,255,255,.07);
        border-radius:3px;letter-spacing:.06em;text-transform:uppercase;
        transition:color .22s,border-color .22s,background .22s;
        cursor:default;
      }
      .pcard:hover .ptag:hover{
        color:#fff;
        border-color:var(--a);
        background:color-mix(in srgb,var(--a) 15%,transparent);
      }
      .pcard:hover .ptag{color:rgba(216,228,240,.55);border-color:rgba(255,255,255,.12);}
      .pline{position:absolute;bottom:0;left:0;height:2px;width:0;background:linear-gradient(90deg,var(--a),transparent);transition:width .5s cubic-bezier(.16,1,.3,1);}
      .pcard:hover .pline{width:100%;}


      /* ── EDUCATION ── */
      .edu-sec{background:#050c1a;position:relative;overflow:hidden;}
      .edu-sec::before{content:'';position:absolute;bottom:-200px;left:-150px;width:500px;height:500px;background:radial-gradient(circle,rgba(0,212,255,.04) 0%,transparent 70%);pointer-events:none;}

      .edu-card-main{
        border:1px solid rgba(255,255,255,.07);border-radius:16px;
        overflow:hidden;background:rgba(255,255,255,.02);
        transition:all .4s;
        opacity:0;transform:translateY(28px);
      }
      .edu-card-main.v{opacity:1;transform:translateY(0);transition:opacity .7s ease,transform .7s cubic-bezier(.16,1,.3,1);}
      .edu-card-main:hover{border-color:rgba(0,212,255,.15);background:rgba(0,212,255,.015);box-shadow:0 20px 60px rgba(0,0,0,.25);}

      .edu-top{
        display:flex;align-items:center;gap:28px;
        padding:36px 40px 28px;
        border-bottom:1px solid rgba(255,255,255,.05);
        position:relative;
      }
      .edu-top::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,rgba(0,212,255,.25),rgba(123,47,255,.25),transparent);}

      .edu-logo{
        width:72px;height:72px;border-radius:14px;
        background:#fff;display:flex;align-items:center;justify-content:center;
        flex-shrink:0;overflow:hidden;padding:8px;
        box-shadow:0 4px 20px rgba(0,0,0,.3);
      }
      .edu-logo img{width:100%;height:100%;object-fit:contain;}

      .edu-uni{font-family:'Outfit',sans-serif;font-size:clamp(18px,2.2vw,26px);font-weight:800;color:#d8e4f0;margin-bottom:6px;line-height:1.2;}
      .edu-deg{font-family:'Inter',sans-serif;font-size:15px;font-weight:600;color:#00d4ff;margin-bottom:5px;}
      .edu-dates{font-family:'Space Mono',monospace;font-size:11px;color:rgba(216,228,240,.35);letter-spacing:.1em;}

      .edu-body{padding:32px 40px;}
      .edu-intro{font-family:'Inter',sans-serif;font-size:15px;color:rgba(216,228,240,.45);line-height:1.75;margin-bottom:28px;max-width:750px;}

      .edu-courses-lbl{font-family:'Space Mono',monospace;font-size:9px;color:#00d4ff;letter-spacing:.22em;text-transform:uppercase;display:flex;align-items:center;gap:8px;margin-bottom:18px;}
      .edu-courses-lbl::before{content:'';width:20px;height:1px;background:#00d4ff;}

      .edu-courses{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;}
      .edu-course{
        display:flex;align-items:center;gap:10px;
        padding:11px 16px;
        border:1px solid rgba(255,255,255,.05);
        border-radius:8px;background:rgba(255,255,255,.015);
        font-family:'Inter',sans-serif;font-size:14px;
        color:rgba(216,228,240,.5);
        transition:all .3s;
        opacity:0;transform:translateX(-16px);
      }
      .edu-course.v{opacity:1;transform:translateX(0);transition:opacity .5s ease,transform .5s ease,border-color .3s,background .3s,color .3s;}
      .edu-course:hover{border-color:rgba(0,212,255,.2);background:rgba(0,212,255,.03);color:rgba(216,228,240,.8);}
      .edu-course-dot{width:5px;height:5px;border-radius:50%;background:#00d4ff;flex-shrink:0;opacity:.7;}

      /* ── CONTACT ── */
      .ct-sec{background:#060e1f;}
      .ctg{display:grid;grid-template-columns:1fr 1fr;gap:90px;align-items:start;}
      .cttit{font-family:'Outfit',sans-serif;font-size:clamp(36px,4.5vw,56px);font-weight:800;line-height:1.1;margin-bottom:18px;}
      .ctdsc{font-family:'Inter',sans-serif;font-size:16px;color:rgba(216,228,240,.45);line-height:1.75;margin-bottom:40px;}
      .ctlks{display:flex;flex-direction:column;gap:12px;}
      .ctlk{display:flex;align-items:center;gap:16px;padding:18px 22px;border-radius:8px;text-decoration:none;border:1px solid rgba(255,255,255,.05);background:rgba(255,255,255,.015);transition:all .3s;}
      .ctlk:hover{border-color:rgba(0,212,255,.22);background:rgba(0,212,255,.03);transform:translateX(6px);}
      .ctico{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);flex-shrink:0;}
      .ctlbl{font-family:'Space Mono',monospace;font-size:9px;color:rgba(216,228,240,.3);letter-spacing:.15em;text-transform:uppercase;margin-bottom:3px;}
      .ctval{font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:rgba(216,228,240,.75);}
      .ctar{margin-left:auto;color:rgba(216,228,240,.2);font-size:15px;transition:all .28s;}
      .ctlk:hover .ctar{color:#00d4ff;transform:translateX(4px);}
      .avb{border:1px solid rgba(0,212,255,.15);border-radius:10px;padding:28px;background:rgba(0,212,255,.02);margin-bottom:28px;}
      .avhd{font-family:'Space Mono',monospace;font-size:10px;color:#00d4ff;letter-spacing:.2em;text-transform:uppercase;display:flex;align-items:center;gap:8px;margin-bottom:10px;}
      .pls{width:7px;height:7px;background:#00d4ff;border-radius:50%;animation:blink 1.6s ease-in-out infinite;}
      .avb p{font-family:'Inter',sans-serif;font-size:15px;color:rgba(216,228,240,.45);line-height:1.7;}
      .hbtn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;color:#050c1a;background:linear-gradient(135deg,#00d4ff,#0096b7);padding:15px 36px;border-radius:6px;text-decoration:none;transition:all .28s;}
      .hbtn:hover{box-shadow:0 0 36px rgba(0,212,255,.38);transform:translateY(-2px);}

      /* ── SKILLS QUOTE ── */
      .sk-quote-wrap{overflow:hidden;}
      .sk-quote-inner{display:flex;align-items:center;gap:8px;padding:14px 20px;border:1px solid rgba(0,212,255,.12);border-radius:8px;background:rgba(0,212,255,.025);width:fit-content;}
      .sk-quote-inner.v-in{animation:quoteIn .8s cubic-bezier(.16,1,.3,1) both;}
      @keyframes quoteIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
      .sk-q-mark{font-family:'Georgia',serif;font-size:28px;color:#00d4ff;line-height:1;opacity:.7;flex-shrink:0;}
      .sk-q-text{font-family:'Inter',sans-serif;font-size:15px;color:rgba(216,228,240,.55);font-style:italic;line-height:1.5;}

      /* ── CONTACT ENVELOPE ── */
      .ct-env-wrap{position:relative;width:280px;height:260px;display:flex;align-items:center;justify-content:center;}
      .ct-env{filter:drop-shadow(0 8px 32px rgba(123,47,255,.35));animation:envFloat 3.5s ease-in-out infinite;}
      @keyframes envFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
      .ct-shape{position:absolute;border-radius:50%;}
      .ct-sh1{width:12px;height:12px;background:rgba(123,47,255,.0);border:2px solid rgba(123,47,255,.5);top:14%;right:10%;animation:shFloat 3s ease-in-out infinite;}
      .ct-sh2{width:8px;height:8px;background:rgba(0,212,255,.6);border-radius:50%;bottom:22%;left:8%;animation:shFloat 3s ease-in-out infinite .8s;}
      .ct-sh3{width:16px;height:3px;background:rgba(123,47,255,.5);border-radius:2px;top:38%;left:2%;animation:shFloat 4s ease-in-out infinite .4s;}
      .ct-sh4{width:10px;height:10px;border:2px solid rgba(0,212,255,.4);border-radius:50%;bottom:15%;right:5%;animation:shFloat 3.5s ease-in-out infinite 1.2s;}
      @keyframes shFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}

      /* ── ACHIEVEMENTS ── */
      .ach-sec{background:#060e1f;position:relative;overflow:hidden;}
      .ach-canvas{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:.55;}

      /* heading */
      .ach-head{font-family:'Outfit',sans-serif;font-size:clamp(36px,4.5vw,54px);font-weight:800;line-height:1.1;margin-bottom:12px;}
      .ach-head .w{display:inline-block;transform:translateY(110%);opacity:0;transition:transform .7s cubic-bezier(.16,1,.3,1),opacity .7s ease;margin-right:.22em;}
      .ach-head.v .w{transform:translateY(0);opacity:1;}
      .ach-head.v .w:nth-child(1){transition-delay:0s;}.ach-head.v .w:nth-child(2){transition-delay:.12s;}.ach-head.v .w:nth-child(3){transition-delay:.24s;}

      /* cert grid */
      .cert-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:32px;}

      /* flip card */
      .flip-card{height:260px;perspective:1000px;cursor:pointer;opacity:0;transform:translateY(30px);}
      .flip-card.v{opacity:1;transform:translateY(0);transition:opacity .6s ease,transform .6s cubic-bezier(.16,1,.3,1);}
      .flip-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .65s cubic-bezier(.4,0,.2,1);}
      .flip-card:hover .flip-inner{transform:rotateY(180deg);}

      .flip-front,.flip-back{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:12px;padding:28px 24px;display:flex;flex-direction:column;justify-content:space-between;}
      .flip-front{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);overflow:hidden;}
      .flip-front::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--ac),transparent);}
      .flip-back{background:linear-gradient(135deg,rgba(var(--acr),.15) 0%,rgba(5,12,26,.95) 100%);border:1px solid var(--ac);transform:rotateY(180deg);align-items:center;justify-content:center;text-align:center;gap:16px;}

      .cert-badge{width:48px;height:48px;border-radius:10px;background:rgba(var(--acr),.12);border:1px solid rgba(var(--acr),.25);display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:6px;transition:transform .35s;}
      .flip-card:hover .cert-badge{transform:scale(1.1) rotate(5deg);}
      .cert-org{font-family:'Space Mono',monospace;font-size:9px;color:var(--ac);letter-spacing:.18em;text-transform:uppercase;margin-bottom:8px;}
      .cert-title{font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;color:#d8e4f0;line-height:1.3;flex:1;}
      .cert-year{font-family:'Space Mono',monospace;font-size:10px;color:rgba(216,228,240,.3);letter-spacing:.1em;}

      /* shimmer on front */
      .flip-front::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent 30%,rgba(255,255,255,.04) 50%,transparent 70%);transform:translateX(-100%);transition:transform .6s ease;}
      .flip-card:hover .flip-front::after{transform:translateX(100%);}

      .back-icon{font-size:36px;margin-bottom:4px;}
      .back-text{font-family:'Inter',sans-serif;font-size:14px;color:rgba(216,228,240,.7);line-height:1.55;margin-bottom:4px;}
      .back-cta{font-family:'Space Mono',monospace;font-size:10px;color:var(--ac);letter-spacing:.15em;text-transform:uppercase;display:flex;align-items:center;gap:6px;padding:8px 18px;border:1px solid var(--ac);border-radius:4px;text-decoration:none;transition:all .28s;background:rgba(var(--acr),.07);}
      .back-cta:hover{background:rgba(var(--acr),.18);}

      /* LeetCode card */
      .lc-card{border:1px solid rgba(255,165,0,.2);border-radius:14px;padding:36px 40px;background:rgba(255,165,0,.02);display:flex;align-items:center;gap:48px;position:relative;overflow:hidden;transition:all .45s;opacity:0;transform:translateY(24px);}
      .lc-card.v{opacity:1;transform:translateY(0);transition:opacity .7s ease,transform .7s cubic-bezier(.16,1,.3,1);}
      .lc-card:hover{border-color:rgba(255,165,0,.35);background:rgba(255,165,0,.04);box-shadow:0 16px 48px rgba(255,165,0,.06);}
      .lc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#f59e0b,transparent);}
      .lc-left{display:flex;flex-direction:column;align-items:center;gap:10px;flex-shrink:0;}
      .lc-logo{font-size:52px;line-height:1;filter:drop-shadow(0 0 12px rgba(255,165,0,.4));animation:lcPulse 2.5s ease-in-out infinite;}
      @keyframes lcPulse{0%,100%{filter:drop-shadow(0 0 8px rgba(255,165,0,.3));}50%{filter:drop-shadow(0 0 20px rgba(255,165,0,.6));}}
      .lc-divider{width:1px;height:80px;background:linear-gradient(to bottom,transparent,rgba(255,165,0,.2),transparent);flex-shrink:0;}
      .lc-right{flex:1;}
      .lc-title{font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;color:#d8e4f0;margin-bottom:6px;}
      .lc-sub{font-family:'Inter',sans-serif;font-size:15px;color:rgba(216,228,240,.45);line-height:1.65;margin-bottom:20px;}

      /* animated counter */
      .lc-counter{font-family:'Outfit',sans-serif;font-size:52px;font-weight:900;color:#f59e0b;line-height:1;display:inline-block;text-shadow:0 0 30px rgba(245,158,11,.3);}
      .lc-counter-label{font-family:'Space Mono',monospace;font-size:10px;color:rgba(216,228,240,.3);letter-spacing:.2em;text-transform:uppercase;margin-top:4px;}
      .lc-tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:18px;}
      .lc-tag{font-family:'Space Mono',monospace;font-size:10px;padding:5px 12px;border-radius:4px;letter-spacing:.06em;}
      .lc-easy{color:#22c55e;border:1px solid rgba(34,197,94,.3);background:rgba(34,197,94,.05);}
      .lc-med{color:#f59e0b;border:1px solid rgba(245,158,11,.3);background:rgba(245,158,11,.05);}
      .lc-hard{color:#ef4444;border:1px solid rgba(239,68,68,.3);background:rgba(239,68,68,.05);}
      .lc-link{font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#f59e0b;text-decoration:none;display:inline-flex;align-items:center;gap:6px;padding:9px 20px;border:1px solid rgba(245,158,11,.35);border-radius:6px;transition:all .28s;margin-top:18px;}
      .lc-link:hover{background:rgba(245,158,11,.1);box-shadow:0 0 20px rgba(245,158,11,.2);transform:translateX(4px);}

      /* ── FOOTER ── */
      .foot{background:#050c1a;padding:26px 60px;border-top:1px solid rgba(255,255,255,.04);display:flex;justify-content:space-between;align-items:center;}
      .flo{font-family:'Space Mono',monospace;font-size:12px;color:rgba(216,228,240,.2);letter-spacing:.08em;display:flex;align-items:center;gap:5px;}
      .flo .fd{color:rgba(255,255,255,.1);}
      .fco{font-family:'Inter',sans-serif;font-size:12px;color:rgba(216,228,240,.2);}
      .flk{display:flex;gap:22px;}
      .flk a{font-family:'Inter',sans-serif;font-size:12px;color:rgba(216,228,240,.3);text-decoration:none;transition:color .25s;}
      .flk a:hover{color:#00d4ff;}

      .hbg{display:none;}
      /* mob-menu always in DOM but hidden via opacity+pointer-events */
      /* ══ RESPONSIVE ══════════════════════════════════════════════════════ */

      /* Tablet — 1024px */
      @media(max-width:1024px){
        .hc{padding:0 52px;}
        .sec{padding:100px 52px;}
        .ab-grid{gap:52px;}
        .sk-cols{gap:40px;}
        .cert-grid{grid-template-columns:1fr 1fr;gap:16px;}
        .lc-card{padding:28px 28px;gap:32px;}
      }

      /* Mobile — 900px */
      @media(max-width:900px){
        /* Nav */
        .nav{padding:12px 16px;}
        .nlinks{display:none;}
        .ncta{padding:7px 12px;font-size:11px;}
        .ndl{padding:6px 10px;font-size:11px;}
        .ndl span.dl-txt{display:none;}
        .hbg{display:flex!important;}
        /* Hamburger */
        .hbg{display:flex;flex-direction:column;gap:5px;cursor:pointer;padding:6px;z-index:300;background:none;border:none;}
        .hbg span{display:block;width:22px;height:2px;background:#d8e4f0;border-radius:2px;transition:all .3s ease;}
        .hbg.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
        .hbg.open span:nth-child(2){opacity:0;transform:translateX(-6px);}
        .hbg.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
        /* Mobile drawer */
        .mob-menu{
          position:fixed;top:0;left:0;width:100%;height:100%;
          background:rgba(5,12,26,0.97);backdrop-filter:blur(20px);
          z-index:250;display:flex;flex-direction:column;
          align-items:center;justify-content:center;gap:12px;
          opacity:0;pointer-events:none;transform:translateY(-8px);
          transition:opacity .3s ease,transform .3s ease;
        }
        .mob-menu.open{opacity:1;pointer-events:all;transform:translateY(0);}
        .mob-link{
          font-family:'Outfit',sans-serif;font-size:28px;font-weight:700;
          color:rgba(216,228,240,.7);text-decoration:none;
          padding:10px 24px;letter-spacing:-.01em;
          transition:color .2s,transform .2s;
          border-bottom:1px solid rgba(255,255,255,.05);width:200px;text-align:center;
        }
        .mob-link:hover{color:#00d4ff;transform:scale(1.04);}
        .mob-cta{
          margin-top:18px;font-family:'Inter',sans-serif;font-size:15px;font-weight:600;
          color:#050c1a;background:linear-gradient(135deg,#00d4ff,#0096b7);
          padding:13px 36px;border-radius:6px;text-decoration:none;
        }

        /* Hero */
        .hc{padding:90px 22px 70px;min-height:100svh;}.scls{display:none;}
        .hname{font-size:clamp(48px,13vw,72px);}
        .hdesc{font-size:15px;}
        .hsts{gap:28px;flex-wrap:wrap;}
        .sv{font-size:clamp(18px,5vw,26px);}
        .hbtns{gap:10px;}
        .bpri,.bsec{padding:12px 22px;font-size:13px;}
        .chips{gap:6px;}
        .chip{font-size:9px;padding:4px 10px;}

        /* Sections */
        .sec{padding:80px 20px;}
        .inn{max-width:100%;}

        /* About */
        .ab-grid{grid-template-columns:1fr;gap:36px;}
        .blob{width:260px;height:260px;}
        .illus-wrap{justify-content:center;}

        /* Skills */
        .sk-grid{grid-template-columns:repeat(4,1fr);gap:8px;}
        .skc{padding:16px 8px 12px;}
        .sk-ic{width:32px;height:32px;}
        .sk-nm{font-size:10px;}
        .sk-cols{grid-template-columns:1fr;gap:32px;}
        .prof-cards{grid-template-columns:1fr;gap:14px;}
        .pc-pct{font-size:26px;}

        /* Experience */
        .ex-hd{padding:22px 22px 18px;}
        .ex-bd{padding:22px 22px;}
        .ex-co{font-size:20px;}
        .lc-card{flex-direction:column;gap:18px;padding:24px 20px;text-align:center;}
        .lc-divider{display:none;}
        .lc-tags{justify-content:center;}
        .lc-link{margin:auto;}
        .lc-counter{font-size:40px;}

        /* Projects */
        .pgrid{grid-template-columns:1fr;}
        .pcard:nth-child(1){border-radius:10px 10px 0 0;}
        .pcard:nth-child(2){border-radius:0;}
        .pcard:nth-child(3){border-radius:0;}
        .pcard:nth-child(4){border-radius:0;}
        .pcard:nth-child(5){border-radius:0;}
        .pcard:nth-child(6){border-radius:0 0 10px 10px;}

        /* Achievements */
        .cert-grid{grid-template-columns:1fr;gap:14px;}
        .flip-card{height:230px;}

        /* Education */
        .edu-top{flex-wrap:wrap;padding:22px 20px 18px;gap:16px;}
        .edu-logo{width:56px;height:56px;}
        .edu-uni{font-size:18px;}
        .edu-body{padding:22px 20px;}
        .edu-courses{grid-template-columns:1fr;}

        /* Contact */
        .ctg{grid-template-columns:1fr;gap:40px;}
        .ct-env-wrap{width:220px;height:200px;}
        .ct-env{width:170px;height:140px;}

        /* Footer */
        .foot{flex-direction:column;gap:12px;padding:20px;text-align:center;}
        .flk{justify-content:center;}

        /* Preloader */
        .ach-canvas{display:none;}
      }

      /* Small Mobile — 480px */
      @media(max-width:480px){
        .hname{font-size:clamp(40px,14vw,60px);}
        .sec{padding:64px 16px;}
        .sk-grid{grid-template-columns:repeat(3,1fr);}
        .cert-grid{grid-template-columns:1fr;}
        .flip-card{height:210px;}
        .ex-co{font-size:18px;}
        .edu-top{gap:12px;}
        .edu-courses{grid-template-columns:1fr;}
        .cttit{font-size:32px;}
        .hsts{gap:20px;}
      }
    `}</style>
  </>
);

// ─── DEV SVG ──────────────────────────────────────────────────────────────────
function DevSVG() {
  return (
    <svg width="290" height="290" viewBox="0 0 300 300" fill="none" style={{display:"block"}}>
      <defs>
        <radialGradient id="bg2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7b2fff" stopOpacity="0.3"/><stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/></radialGradient>
        <radialGradient id="scr2" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor="#00d4ff" stopOpacity="0.22"/><stop offset="100%" stopColor="#7b2fff" stopOpacity="0.08"/></radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <circle cx="150" cy="150" r="118" fill="url(#bg2)" opacity="0.6"/>
      {/* Desk */}
      <rect x="42" y="200" width="216" height="13" rx="5" fill="#1a2540"/>
      <rect x="64" y="213" width="9" height="55" rx="3" fill="#152033"/>
      <rect x="227" y="213" width="9" height="55" rx="3" fill="#152033"/>
      {/* Laptop base */}
      <rect x="74" y="172" width="152" height="30" rx="5" fill="#0f1a2e"/>
      <rect x="76" y="174" width="148" height="26" rx="4" fill="#1a2845"/>
      {/* Screen */}
      <rect x="80" y="91" width="140" height="84" rx="7" fill="#0a1220"/>
      <rect x="82" y="93" width="136" height="80" rx="6" fill="#080f1c"/>
      <rect x="82" y="93" width="136" height="80" rx="6" fill="url(#scr2)" className="screen-glow"/>
      {/* Code lines with flicker */}
      <rect x="92" y="105" width="55" height="4" rx="2" fill="#00d4ff" className="code-line" opacity="0.9" filter="url(#glow)"/>
      <rect x="92" y="115" width="40" height="4" rx="2" fill="#7b2fff" className="code-line" opacity="0.8"/>
      <rect x="96" y="125" width="68" height="4" rx="2" fill="#00ffb3" className="code-line" opacity="0.7"/>
      <rect x="96" y="135" width="48" height="4" rx="2" fill="#00d4ff" className="code-line" opacity="0.6"/>
      <rect x="92" y="145" width="32" height="4" rx="2" fill="#ff2d78" className="code-line" opacity="0.7"/>
      <rect x="92" y="155" width="60" height="4" rx="2" fill="#7b2fff" className="code-line" opacity="0.5"/>
      <rect x="92" y="161" width="3" height="10" rx="1.5" fill="#00d4ff" filter="url(#glow)"><animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/></rect>
      {/* Pixel grid */}
      {[0,1,2,3,4].flatMap(r=>[0,1,2,3,4,5].map(c=><rect key={`p${r}${c}`} x={166+c*7} y={97+r*7} width="5" height="5" rx="1" fill={r*c%3===0?"#7b2fff":"#00d4ff"} opacity={[0.7,0.15,0.5,0.2,0.65,0.1][c%6]}/>))}
      {/* Hinge */}
      <rect x="80" y="172" width="140" height="5" rx="2" fill="#0a1220"/>
      {/* Chair */}
      <rect x="122" y="202" width="56" height="52" rx="9" fill="#1a2540"/>
      {/* Body */}
      <rect x="126" y="178" width="48" height="38" rx="9" fill="#1e3a60"/>
      <path d="M138 178 Q150 190 162 178" stroke="#2d5080" strokeWidth="2.5" fill="none"/>
      <line x1="150" y1="190" x2="150" y2="216" stroke="#2d5080" strokeWidth="2" opacity="0.6"/>
      {/* Arms */}
      <path d="M126 183 Q104 196 90 190" stroke="#c8a27a" strokeWidth="11" strokeLinecap="round" fill="none"/>
      <path d="M174 183 Q196 196 210 190" stroke="#c8a27a" strokeWidth="11" strokeLinecap="round" fill="none"/>
      <ellipse cx="90" cy="187" rx="11" ry="8" fill="#c8a27a"/>
      <ellipse cx="210" cy="187" rx="11" ry="8" fill="#c8a27a"/>
      {/* Neck */}
      <rect x="143" y="158" width="14" height="20" rx="7" fill="#c8a27a"/>
      {/* Head */}
      <ellipse cx="150" cy="143" rx="23" ry="25" fill="#c8a27a"/>
      {/* Hair */}
      <path d="M127 136 Q128 110 150 108 Q172 110 173 136 Q172 116 150 114 Q128 116 127 136Z" fill="#1a1a2e"/>
      {/* Headphones */}
      <path d="M127 140 Q126 120 150 118 Q174 120 173 140" stroke="#4f46e5" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <rect x="122" y="137" width="9" height="13" rx="4.5" fill="#4f46e5"/>
      <rect x="169" y="137" width="9" height="13" rx="4.5" fill="#4f46e5"/>
      {/* Eyes */}
      <circle cx="143" cy="143" r="2.5" fill="#1a1a2e"/><circle cx="157" cy="143" r="2.5" fill="#1a1a2e"/>
      <circle cx="144" cy="142" r="1" fill="white"/><circle cx="158" cy="142" r="1" fill="white"/>
      {/* Smile */}
      <path d="M145 150 Q150 154 155 150" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const cvs = useRef(null);
  const [ri,setRi]=useState(0);const [disp,setDisp]=useState("");const [del,setDel]=useState(false);const [ci,setCi]=useState(0);const [cur,setCur]=useState(true);const [ld,setLd]=useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(()=>{const t=setInterval(()=>setCur(v=>!v),520);return()=>clearInterval(t);},[]);
  useEffect(()=>{const r=ROLES[ri];let to;if(!del&&ci<=r.length){setDisp(r.slice(0,ci));to=setTimeout(()=>setCi(i=>i+1),75);}else if(!del&&ci>r.length){to=setTimeout(()=>setDel(true),1800);}else if(del&&ci>=0){setDisp(r.slice(0,ci));to=setTimeout(()=>setCi(i=>i-1),38);}else{setDel(false);setRi(i=>(i+1)%ROLES.length);to=setTimeout(()=>setCi(0),200);}return()=>clearTimeout(to);},[ci,del,ri]);
  useEffect(()=>{setTimeout(()=>setLd(true),80);},[]);
  useEffect(()=>{
    const c=cvs.current;if(!c)return;
    const R=new THREE.WebGLRenderer({canvas:c,alpha:true,antialias:true});R.setPixelRatio(Math.min(window.devicePixelRatio,2));R.setSize(window.innerWidth,window.innerHeight);
    const S=new THREE.Scene();const C=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100);C.position.z=3;
    const isMobile = window.innerWidth < 768;
    const N = isMobile ? 800 : 3500;
    const p=new Float32Array(N*3),col=new Float32Array(N*3),sz=new Float32Array(N);
    for(let i=0;i<N;i++){const r=6+Math.random()*4,t=Math.random()*Math.PI*2,f=Math.acos(2*Math.random()-1);p[i*3]=r*Math.sin(f)*Math.cos(t);p[i*3+1]=r*Math.sin(f)*Math.sin(t);p[i*3+2]=r*Math.cos(f);const v=Math.random();if(v<.4){col[i*3]=0;col[i*3+1]=.8;col[i*3+2]=1;}else if(v<.7){col[i*3]=.4;col[i*3+1]=.2;col[i*3+2]=1;}else{col[i*3]=1;col[i*3+1]=1;col[i*3+2]=1;}sz[i]=Math.random()*2+.5;}
    const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(p,3));g.setAttribute("color",new THREE.BufferAttribute(col,3));g.setAttribute("size",new THREE.BufferAttribute(sz,1));
    const m=new THREE.ShaderMaterial({vertexColors:true,transparent:true,depthWrite:false,vertexShader:`attribute float size;varying vec3 vColor;varying float vA;void main(){vColor=color;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=size*(200.0/-mv.z);gl_Position=projectionMatrix*mv;vA=smoothstep(8.0,2.0,length(position));}`,fragmentShader:`varying vec3 vColor;varying float vA;void main(){float d=length(gl_PointCoord-vec2(.5));if(d>.5)discard;gl_FragColor=vec4(vColor,pow(1.0-d*2.0,2.0)*vA*.88);}`});
    const pts=new THREE.Points(g,m);S.add(pts);
    const ico=new THREE.Mesh(new THREE.IcosahedronGeometry(1.2,1),new THREE.MeshBasicMaterial({color:0x00d4ff,wireframe:true,transparent:true,opacity:.1}));S.add(ico);
    const rng=new THREE.Mesh(new THREE.TorusGeometry(1.8,.007,16,200),new THREE.MeshBasicMaterial({color:0x00d4ff,transparent:true,opacity:.2}));rng.rotation.x=Math.PI/2.5;S.add(rng);
    const rng2=new THREE.Mesh(new THREE.TorusGeometry(2.4,.004,16,200),new THREE.MeshBasicMaterial({color:0x7b2fff,transparent:true,opacity:.13}));rng2.rotation.x=Math.PI/3;rng2.rotation.y=Math.PI/5;S.add(rng2);
    const ms={x:0,y:0};const onM=e=>{ms.x=(e.clientX/window.innerWidth-.5)*2;ms.y=-(e.clientY/window.innerHeight-.5)*2;};const onRS=()=>{C.aspect=window.innerWidth/window.innerHeight;C.updateProjectionMatrix();R.setSize(window.innerWidth,window.innerHeight);};
    window.addEventListener("mousemove",onM);window.addEventListener("resize",onRS);
    let fr=0,id;const anim=()=>{id=requestAnimationFrame(anim);fr+=.005;pts.rotation.y=fr*.1+ms.x*.15;pts.rotation.x=fr*.05+ms.y*.1;ico.rotation.y=fr*.4;ico.rotation.x=fr*.2;rng.rotation.z=fr*.18;rng2.rotation.z=-fr*.12;rng2.rotation.y=fr*.08;ico.scale.setScalar(1+Math.sin(fr*1.5)*.04);C.position.x+=(ms.x*.28-C.position.x)*.05;C.position.y+=(ms.y*.18-C.position.y)*.05;C.lookAt(S.position);R.render(S,C);};anim();
    return()=>{cancelAnimationFrame(id);window.removeEventListener("mousemove",onM);window.removeEventListener("resize",onRS);R.dispose();};
  },[]);

  const navLinks = [
    ["About","#about"],["Skills","#skills"],["Experience","#experience"],
    ["Projects","#projects"],["Achievements","#achievements"],
    ["Education","#education"],["Contact","#contact"],
  ];

  return (
    <section id="home" className="hw">
      <div className="gbg"/><div className="gl"/><div className="gr"/>
      <canvas className="hcv" ref={cvs}/>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nlogo"><span className="d">&lt;</span>MF<span className="d">/&gt;</span></div>
        <ul className="nlinks">
          {navLinks.map(([label,href])=><li key={label}><a href={href}>{label}</a></li>)}
        </ul>
        {/* Desktop right buttons */}
        <div className="nav-right">
          <a
            href="/Faraz20_cv.pdf"
            target="_blank" rel="noreferrer"
            download="Mohammad_Faraz_CV.pdf"
            className="ndl"
          >
            ↓ <span className="dl-txt">Download CV</span><span className="dl-icon" style={{fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:".05em"}}>CV</span>
          </a>
          <a href="#contact" className="ncta">Hire Me ↓</a>
          {/* Hamburger — mobile only */}
          <button className={`hbg ${menuOpen?"open":""}`} onClick={()=>setMenuOpen(v=>!v)} aria-label="Toggle menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div className={`mob-menu ${menuOpen?"open":""}`}>
        {/* close tap on backdrop */}
        <div style={{position:"absolute",inset:0,zIndex:-1}} onClick={closeMenu}/>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#00d4ff",letterSpacing:".2em",marginBottom:18,opacity:.6}}>&lt; MF /&gt;</div>
        {navLinks.map(([label,href])=>(
          <a key={label} href={href} className="mob-link" onClick={closeMenu}>{label}</a>
        ))}
        <a href="#contact" className="mob-cta" onClick={closeMenu}>Hire Me ↓</a>
        <a href="/Faraz20_cv.pdf" target="_blank" rel="noreferrer" download="Mohammad_Faraz_CV.pdf"
          style={{marginTop:8,fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:600,color:"#00d4ff",border:"1px solid rgba(0,212,255,.3)",padding:"11px 32px",borderRadius:6,textDecoration:"none",letterSpacing:".02em"}}
          onClick={closeMenu}>↓ Download CV</a>
      </div>

      <div className="ctl"/><div className="cbr"/>
      <div className="hc">
        <div className={`hl ${ld?"in":""}`}>
          <div className="htag"><span className="dot"/> B.E. Computer Science · 2025 Graduate</div>
          <h1 className="hname">Mohammad<br/><span className="grad">Faraz</span></h1>
          <div className="hrole"><span style={{color:"rgba(216,228,240,.25)",marginRight:6}}>&gt;_</span><span className="rv">{disp}</span><span className="cr" style={{opacity:cur?1:0}}/></div>
          <p className="hdesc">A passionate Software Developer with a strong foundation in Full Stack Web Development, Data Structures & Algorithms, and building real-world applications. Eager to contribute, learn, and grow in a product-driven engineering team.</p>
          <div className="hsts">
            <div><div className="sv">MERN</div><div className="sl">Stack</div></div>
            <div><div className="sv">DSA</div><div className="sl">Problem Solver</div></div>
            <div><div className="sv">200+</div><div className="sl">LeetCode</div></div>
          </div>
          <div className="hbtns">
            <a href="#projects" className="bpri">⬡ View Projects</a>
            <a href="https://github.com/mhd-faraz" target="_blank" rel="noreferrer" className="bsec">◈ GitHub</a>
          </div>
          <div className="chips">
            {["React","Node.js","MongoDB","Express","JavaScript","C++","Python","Git","GSAP","Three.js"].map(t=><span key={t} className="chip">{t}</span>)}
          </div>
        </div>
      </div>
      <div className={`scls ${ld?"in":""}`}>
        <a href="https://github.com/mhd-faraz" target="_blank" rel="noreferrer" className="sa">GitHub</a>
        <a href="https://linkedin.com/in/mohammad-faraz-a27176223/" target="_blank" rel="noreferrer" className="sa">LinkedIn</a>
        <a href="https://mail.google.com/mail/?view=cm&to=rfaraz5678@gmail.com" target="_blank" rel="noreferrer" className="sa">Email</a>
      </div>
      <div className="si"><span className="sitx">Scroll</span><div className="sib"/></div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const ref = useRef(null);
  useEffect(() => {
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = ref.current; if (!el) return;
        el.querySelectorAll(".rev,.rev-l,.rev-r").forEach((n,i)=>setTimeout(()=>n.classList.add("v"),i*90));
        el.querySelector(".tagline-inner")?.classList.add("v");
        el.querySelectorAll(".wii").forEach((n,i)=>setTimeout(()=>n.classList.add("v"),280+i*110));
      });
    }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const bullets = [
    "I design and build responsive, interactive web applications using the MERN stack — crafting clean UIs, scalable REST APIs, and seamless user experiences from frontend to backend.",
    "I have a strong foundation in Data Structures & Algorithms and apply problem-solving skills to write efficient, optimized, and maintainable code in C++ and JavaScript.",
    "I am skilled in version control with Git and have hands-on experience working with databases like MongoDB and MySQL — designing schemas and writing efficient queries for production systems.",
    "I am passionate about creating immersive frontend experiences using animations, scroll effects, and 3D visuals — constantly exploring modern web technologies to push creative boundaries.",
  ];

  return (
    <section id="about" className="sec ab-sec" ref={ref}>
      <div className="inn">
        <div className="ab-grid">
          {/* ── ILLUSTRATION ── */}
          <div className="illus-wrap" style={{opacity:1,transform:"none"}}>
            <div className="blob">
              <div className="blob-ring"/>
              <div className="blob-ring2"/>
              <div className="blob-bg"/>
              <div className="iparticle ip1"/><div className="iparticle ip2"/>
              <div className="iparticle ip3"/><div className="iparticle ip4"/>
              <div className="iparticle ip5"/>
              <div className="dev-svg-wrap"><DevSVG/></div>
              <div className="fc fc1">🚀 Full Stack Dev</div>
              <div className="fc fc2">🟢 Open to Hire</div>
            </div>
          </div>

          {/* ── TEXT ── */}
          <div className="ab-r">
            <div className="lbl rev">About Me</div>
            <h2 className="rev">What I <span style={{color:"#00d4ff"}}>do</span></h2>
            <div className="tagline-wrap">
              <div className="tagline-inner">" Software Developer with a Passion for Building Scalable Web Applications and Learning New Technologies. "</div>
            </div>

            {/* icon row */}
            <div className="rev" style={{display:"flex",gap:18,alignItems:"center",flexWrap:"wrap",marginBottom:28}}>
              {[
                {icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",label:"React"},
                {icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",label:"Node.js"},
                {icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",label:"MongoDB"},
                {icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",label:"JavaScript"},
                {icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",label:"Git"},
                {icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",label:"MySQL"},
              ].map(s=>(
                <div key={s.label} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,opacity:.7,transition:"opacity .25s",cursor:"default"}}
                  onMouseEnter={e=>e.currentTarget.style.opacity=1}
                  onMouseLeave={e=>e.currentTarget.style.opacity=.7}>
                  <img src={s.icon} alt={s.label} style={{width:32,height:32,objectFit:"contain",filter:"drop-shadow(0 2px 6px rgba(0,0,0,.5))"}}/>
                  <span style={{fontFamily:"'Space Mono',monospace",fontSize:8,color:"rgba(216,228,240,.4)",letterSpacing:".08em",textTransform:"uppercase"}}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* bullet points */}
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {bullets.map((b,i)=>(
                <div key={i} className="wii" style={{padding:"14px 18px",background:"none",border:"none",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                  <div style={{color:"#00d4ff",fontSize:16,flexShrink:0,marginTop:2}}>☞</div>
                  <p style={{fontFamily:"'Inter',sans-serif",fontSize:15,color:"rgba(216,228,240,.55)",lineHeight:1.7,margin:0}}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function Skills() {
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting || done.current) return;
        done.current = true;
        const el = ref.current; if (!el) return;

        el.querySelector(".sk-head")?.classList.add("v");
        setTimeout(()=>el.querySelector(".sk-sub")?.classList.add("v"), 250);
        setTimeout(()=>el.querySelector(".sk-quote-inner")?.classList.add("v-in"), 300);
        el.querySelectorAll(".rev,.rev-l,.rev-r").forEach((n,i)=>setTimeout(()=>n.classList.add("v"),i*80));

        // skill icon cards — staggered pop
        el.querySelectorAll(".skc").forEach((n,i)=>setTimeout(()=>n.classList.add("v"),300+i*45));

        // proficiency cards
        el.querySelectorAll(".pc").forEach((n,i) => {
          setTimeout(() => {
            n.classList.add("v");
            const fill = n.querySelector(".pc-bar-fill");
            if (fill) fill.style.width = fill.dataset.w;
          }, 600 + i * 160);
        });
      });
    }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section id="skills" className="sec sk-sec" ref={ref}>
      <div className="inn">
        <div className="lbl rev">Technical Skills</div>
        <h2 className="sk-head">
          <span className="w">Skills</span><span className="w">&</span><span className="w" style={{color:"#7b2fff"}}>Technologies</span>
        </h2>
        <div className="sk-quote-wrap rev" style={{margin:"18px 0 0",overflow:"hidden"}}>
          <div className="sk-quote-inner">
            <span className="sk-q-mark">"</span>
            <span className="sk-q-text">From frontend animations to backend architecture, databases, and algorithms — the full picture.</span>
            <span className="sk-q-mark">"</span>
          </div>
        </div>

        {/* ── ICON GRID ── */}
        <div className="sk-grid">
          {ALL_SKILLS.map(s=>(
            <div key={s.name} className="skc" style={{"--c":s.color}}>
              <img src={s.icon} alt={s.name} className="sk-ic" onError={e=>{e.target.style.opacity=".3";}}/>
              <span className="sk-nm">{s.name}</span>
            </div>
          ))}
        </div>

        {/* ── PROFICIENCY SECTION ── */}
        <div className="prof-wrap">
          <div className="lbl rev" style={{marginBottom:8}}>Proficiency</div>
          <h3 className="prof-title rev">Domain <span style={{color:"#00d4ff"}}>Expertise</span></h3>
          <p className="prof-sub rev">Proficiency levels based on real project experience — hover a card to explore.</p>

          <div className="prof-cards">
            {PROFICIENCY.map((p,i) => (
              <div key={p.label} className="pc" style={{"--c":p.color,"--c-dim":`color-mix(in srgb,${p.color} 30%,transparent)`}}>
                <div className="pc-top">
                  <div>
                    <div className="pc-label">{p.label}</div>
                    <div className="pc-sub">{p.sublabel}</div>
                  </div>
                  <div className="pc-pct">{p.pct}%</div>
                </div>
                <div className="pc-bar-bg">
                  <div className="pc-bar-fill" data-w={`${p.pct}%`}/>
                </div>
                <div className="pc-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  const ref = useRef(null);
  useEffect(() => {
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        ref.current?.querySelectorAll(".rev,.rev-l,.rev-r").forEach((n,i)=>setTimeout(()=>n.classList.add("v"),i*80));
        ref.current?.querySelectorAll(".ex-ach").forEach((n,i)=>setTimeout(()=>n.classList.add("v"),350+i*90));
      });
    }, { threshold: 0.08 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const achs = [
    {c:"#00d4ff",t:<>Developed <strong>dynamic, responsive web applications</strong> for small salon businesses — streamlining booking workflows and improving <strong>customer engagement by 30%</strong>.</>},
    {c:"#7b2fff",t:<>Integrated <strong>RESTful APIs</strong> for booking requests, payments, and user data — <strong>optimizing backend performance by 15%</strong> and ensuring seamless data flow.</>},
    {c:"#00ffb3",t:<>Collaborated on <strong>UI/UX enhancements</strong>, delivering intuitive interfaces — resulting in a <strong>20% increase in customer retention</strong>.</>},
    {c:"#ff2d78",t:<>Implemented <strong>JWT-based authentication</strong> and secure session management following industry-standard security practices.</>},
    {c:"#f59e0b",t:<>Worked in <strong>Agile sprints</strong> — planning, standups, and code reviews — delivering features iteratively on schedule.</>},
  ];

  return (
    <section id="experience" className="sec ex-sec" ref={ref}>
      <div className="inn">
        <div className="lbl rev">Work Experience</div>
        <h2 style={{fontSize:"clamp(36px,4.5vw,54px)",fontWeight:800,marginBottom:44}} className="rev">Where I've <span style={{color:"#00d4ff"}}>worked</span></h2>
        <div className="ex-card rev">
          <div className="ex-hd">
            <div>
              <div className="ex-co">Zylu Business <span>Solutions</span> Pvt. Ltd.</div>
              <div className="ex-rl"><span className="ex-rol">Software Developer Intern</span><span className="ex-badge">Remote</span></div>
            </div>
            <div className="ex-dt">Apr 2024 – Jun 2024<span>3 Months Internship</span></div>
          </div>
          <div className="ex-bd">
            <p className="ex-sum">At Zylu Business Solutions I was part of the core development team building a full-stack MERN application for small salon businesses. I contributed end-to-end — designing responsive UIs, building backend APIs, optimizing database queries, and ensuring smooth user experience. The role gave me strong exposure to real-world production systems and fast-paced startup development.</p>
            <div className="ex-sub">Key Contributions</div>
            <div className="ex-achs">
              {achs.map((a,i)=><div key={i} className="ex-ach"><div className="ab" style={{background:a.c}}/><div className="at">{a.t}</div></div>)}
            </div>
            <div className="ex-sub">Technologies Used</div>
            <div className="ex-techs">
              {["MongoDB","Express.js","React.js","Node.js","RESTful APIs","JWT Auth","Tailwind CSS","Git","Postman"].map(t=><span key={t} className="ex-tech">{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  const ref = useRef(null);
  useEffect(() => {
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        ref.current?.querySelectorAll(".rev,.rev-l").forEach((n,i)=>setTimeout(()=>n.classList.add("v"),i*80));
        ref.current?.querySelectorAll(".pcard").forEach((n,i)=>setTimeout(()=>n.classList.add("v"),160+i*110));
      });
    }, { threshold: 0.08 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return (
    <section id="projects" className="sec pr-sec" ref={ref}>
      <div className="inn">
        <div style={{marginBottom:48}}>
          <div className="lbl rev">Featured Projects</div>
          <h2 style={{fontSize:"clamp(36px,4.5vw,54px)",fontWeight:800}} className="rev">Things I've <span style={{color:"#7b2fff"}}>built</span></h2>
        </div>
        <div className="pgrid">
          {PROJECTS.map(p=>(
            <div key={p.title} className="pcard" style={{"--a":p.accent}}>
              <div style={{overflow:"hidden"}}><img src={p.img} alt={p.title} className="pimg"/></div>
              <div className="pbody">
                <div className="pnum">{p.num}</div>
                <div className="ptop">
                  <h3 className="ptit">{p.title}</h3>
                  <div className="plks">
                    {p.live!=="#"&&<a href={p.live} target="_blank" rel="noreferrer" className="pl">Live ↗</a>}
                    {p.github!=="#"&&<a href={p.github} target="_blank" rel="noreferrer" className="pl">GitHub</a>}
                  </div>
                </div>
                <p className="pdesc">{p.desc}</p>
                <div className="ptags">{p.tags.map(t=><span key={t} className="ptag">{t}</span>)}</div>
              </div>
              <div className="pline"/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ACHIEVEMENTS & CERTIFICATES ─────────────────────────────────────────────
function Achievements() {
  const ref = useRef(null);
  const cvs = useRef(null);
  const counterRef = useRef(null);
  const done = useRef(false);

  // Three.js floating geometry background
  useEffect(() => {
    const canvas = cvs.current; if (!canvas) return;
    const R = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    R.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const setSize = () => R.setSize(canvas.parentElement.offsetWidth, canvas.parentElement.offsetHeight);
    setSize();
    const S = new THREE.Scene();
    const C = new THREE.PerspectiveCamera(60, canvas.parentElement.offsetWidth / canvas.parentElement.offsetHeight, 0.1, 100);
    C.position.z = 5;

    // floating wireframe geometries
    const geos = [
      new THREE.OctahedronGeometry(0.5, 0),
      new THREE.TetrahedronGeometry(0.45, 0),
      new THREE.IcosahedronGeometry(0.4, 0),
      new THREE.OctahedronGeometry(0.3, 0),
      new THREE.TetrahedronGeometry(0.35, 0),
      new THREE.IcosahedronGeometry(0.28, 0),
      new THREE.OctahedronGeometry(0.22, 0),
    ];
    const colors = [0x00d4ff, 0x7b2fff, 0x00ffb3, 0xf59e0b, 0x00d4ff, 0x7b2fff, 0xff2d78];
    const meshes = geos.map((geo, i) => {
      const mat = new THREE.MeshBasicMaterial({ color: colors[i], wireframe: true, transparent: true, opacity: 0.18 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 4);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      S.add(mesh);
      return { mesh, speed: 0.003 + Math.random() * 0.007, floatSpeed: 0.5 + Math.random() * 0.5, floatAmp: 0.3 + Math.random() * 0.5, initY: mesh.position.y };
    });

    // small particles
    const pCount = 800, pp = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pp[i*3] = (Math.random()-0.5)*20; pp[i*3+1] = (Math.random()-0.5)*12; pp[i*3+2] = (Math.random()-0.5)*8;
    }
    const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pp, 3));
    const pm = new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.025, transparent: true, opacity: 0.35 });
    const particles = new THREE.Points(pg, pm); S.add(particles);

    const onR = () => { setSize(); C.aspect = canvas.parentElement.offsetWidth / canvas.parentElement.offsetHeight; C.updateProjectionMatrix(); };
    window.addEventListener("resize", onR);
    let fr = 0, id;
    const anim = () => {
      id = requestAnimationFrame(anim); fr += 0.01;
      meshes.forEach(({ mesh, speed, floatSpeed, floatAmp, initY }) => {
        mesh.rotation.x += speed; mesh.rotation.y += speed * 1.3;
        mesh.position.y = initY + Math.sin(fr * floatSpeed) * floatAmp;
      });
      particles.rotation.y = fr * 0.015;
      R.render(S, C);
    }; anim();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", onR); R.dispose(); };
  }, []);

  // animated counter
  const animateCounter = () => {
    const el = counterRef.current; if (!el) return;
    let count = 0; const target = 200; const duration = 1800;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = Math.floor(count) + "+";
      if (count >= target) clearInterval(interval);
    }, 16);
  };

  useEffect(() => {
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting || done.current) return;
        done.current = true;
        ref.current?.querySelector(".ach-head")?.classList.add("v");
        ref.current?.querySelectorAll(".rev,.rev-l,.rev-r").forEach((n,i)=>setTimeout(()=>n.classList.add("v"),i*80));
        ref.current?.querySelectorAll(".flip-card").forEach((n,i)=>setTimeout(()=>n.classList.add("v"),250+i*130));
        setTimeout(() => {
          ref.current?.querySelector(".lc-card")?.classList.add("v");
          animateCounter();
        }, 700);
      });
    }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const certs = [
    {
      icon:"⚡", org:"Infosys Springboard", year:"2024",
      title:"Comprehensive JavaScript Development",
      desc:"Deep dive into modern JavaScript — ES6+, async/await, closures, DOM manipulation, and browser APIs.",
      link:"https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_18109698366332810000_shared/1-05761df0-1004-44ab-b29b-4017cf9439f9.pdf",
      accent:"#00d4ff", acr:"0,212,255",
    },
    {
      icon:"⚛️", org:"Infosys Springboard", year:"2024",
      title:"Advanced React.js Development",
      desc:"Hooks, context API, performance optimization, custom hooks, state management, and production-level React patterns.",
      link:"https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_10648877150323546000_shared/1-6e34963a-e48e-457d-a63e-4cbf6d8369eb.pdf",
      accent:"#7b2fff", acr:"123,47,255",
    },
    {
      icon:"🌐", org:"Johns Hopkins · Coursera", year:"2024",
      title:"Front-End Web Development Essentials",
      desc:"HTML5, CSS3, responsive design, Bootstrap, JavaScript integration, and modern web development fundamentals.",
      link:"https://www.coursera.org/account/accomplishments/certificate/839HVLPM88FK",
      accent:"#00ffb3", acr:"0,255,179",
    },
  ];

  return (
    <section id="achievements" className="sec ach-sec" ref={ref}>
      <canvas ref={cvs} className="ach-canvas"/>
      <div className="inn" style={{position:"relative",zIndex:1}}>
        <div className="lbl rev">Achievements</div>
        <h2 className="ach-head">
          <span className="w">Certificates</span>
          <span className="w">&</span>
          <span className="w" style={{color:"#00d4ff"}}>Milestones</span>
        </h2>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:16,color:"rgba(216,228,240,.42)",marginBottom:48,maxWidth:560,lineHeight:1.7}} className="rev">
          Verified credentials and coding achievements — hover a card to view details, click to open the certificate.
        </p>

        {/* ── CERTIFICATE FLIP CARDS ── */}
        <div className="cert-grid">
          {certs.map((c,i) => (
            <div key={i} className="flip-card" onClick={()=>window.open(c.link,"_blank")}>
              <div className="flip-inner">
                {/* FRONT */}
                <div className="flip-front" style={{"--ac":c.accent,"--acr":c.acr}}>
                  <div>
                    <div className="cert-badge" style={{"--acr":c.acr}}>{c.icon}</div>
                    <div className="cert-org" style={{color:c.accent}}>{c.org}</div>
                    <div className="cert-title">{c.title}</div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div className="cert-year">{c.year}</div>
                    <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"rgba(216,228,240,.3)",letterSpacing:".12em"}}>HOVER TO SEE →</div>
                  </div>
                </div>
                {/* BACK */}
                <div className="flip-back" style={{"--ac":c.accent,"--acr":c.acr}}>
                  <div className="back-icon">{c.icon}</div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:700,color:"#d8e4f0",marginBottom:4}}>{c.title}</div>
                  <div className="back-text">{c.desc}</div>
                  <a href={c.link} target="_blank" rel="noreferrer" className="back-cta"
                     onClick={e=>e.stopPropagation()}
                     style={{"--ac":c.accent,"--acr":c.acr}}>
                    Open Certificate ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── LEETCODE CARD ── */}
        <div className="lc-card">
          <div className="lc-left">
            <div className="lc-logo">🧠</div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"rgba(245,158,11,.5)",letterSpacing:".15em",textTransform:"uppercase",textAlign:"center"}}>LeetCode</div>
          </div>
          <div className="lc-divider"/>
          <div className="lc-right">
            <div className="lc-title">LeetCode Problem Solving</div>
            <div className="lc-sub">Consistently solving algorithmic challenges across difficulty levels — strengthening DSA foundations in C++ and Python.</div>
            <div>
              <div ref={counterRef} className="lc-counter">0</div>
              <div className="lc-counter-label">Problems Solved</div>
            </div>
            <div className="lc-tags">
              <span className="lc-tag lc-easy">✓ Easy</span>
              <span className="lc-tag lc-med">◈ Medium</span>
              <span className="lc-tag lc-hard">⬡ Hard</span>
              <span className="lc-tag" style={{color:"rgba(216,228,240,.4)",border:"1px solid rgba(255,255,255,.08)",background:"transparent",fontFamily:"'Space Mono',monospace",fontSize:10,padding:"5px 12px",borderRadius:4,letterSpacing:".06em"}}>Arrays · DP · Graphs · Trees</span>
            </div>
            <a href="https://leetcode.com/u/Faraz_20/" target="_blank" rel="noreferrer" className="lc-link">
              View LeetCode Profile ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EDUCATION ────────────────────────────────────────────────────────────────
function Education() {
  const ref = useRef(null);
  useEffect(() => {
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        ref.current?.querySelectorAll(".rev,.rev-l").forEach((n,i)=>setTimeout(()=>n.classList.add("v"),i*80));
        setTimeout(()=>ref.current?.querySelector(".edu-card-main")?.classList.add("v"), 150);
        ref.current?.querySelectorAll(".edu-course").forEach((n,i)=>setTimeout(()=>n.classList.add("v"),450+i*60));
      });
    }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const courses = [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Computer Networks",
    "Operating Systems",
    "Software Engineering",
    "Web Technologies",
    "Discrete Mathematics",
  ];

  return (
    <section id="education" className="sec edu-sec" ref={ref}>
      <div className="inn">
        <div className="lbl rev">Education</div>
        <h2 style={{fontSize:"clamp(36px,4.5vw,54px)",fontWeight:800,marginBottom:44}} className="rev">
          Academic <span style={{color:"#00d4ff"}}>Background</span>
        </h2>

        <div className="edu-card-main">
          {/* ── TOP: Logo + Info ── */}
          <div className="edu-top">
            <div className="edu-logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Chandigarh_University_seal.svg/200px-Chandigarh_University_seal.svg.png"
                alt="Chandigarh University"
                onError={e=>{e.target.style.display="none";e.target.parentElement.innerHTML="<span style='font-size:28px'>🎓</span>";}}
              />
            </div>
            <div style={{flex:1}}>
              <div className="edu-uni">Chandigarh University</div>
              <div className="edu-deg">Bachelor of Engineering — Computer Science & Engineering</div>
              <div className="edu-dates">Aug 2021 &nbsp;→&nbsp; May 2025</div>
            </div>
            {/* badge */}
            <div style={{
              fontFamily:"'Space Mono',monospace",fontSize:9,
              color:"#00ffb3",border:"1px solid rgba(0,255,179,.25)",
              background:"rgba(0,255,179,.05)",padding:"6px 14px",
              borderRadius:20,letterSpacing:".1em",textTransform:"uppercase",
              flexShrink:0,whiteSpace:"nowrap",
            }}>Graduated 2025</div>
          </div>

          {/* ── BODY ── */}
          <div className="edu-body">
            <p className="edu-intro">
              Completed a 4-year B.E. in Computer Science with a strong focus on software engineering, systems programming, and applied mathematics. Built a solid foundation in core CS concepts alongside hands-on development experience through projects and an industry internship.
            </p>

            <div className="edu-courses-lbl">Key Coursework</div>
            <div className="edu-courses">
              {courses.map((c,i)=>(
                <div key={i} className="edu-course">
                  <div className="edu-course-dot"/>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useRef(null);
  useEffect(() => {
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        ref.current?.querySelectorAll(".rev,.rev-l,.rev-r").forEach((n,i)=>setTimeout(()=>n.classList.add("v"),i*90));
      });
    }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const GMAIL = "https://mail.google.com/mail/?view=cm&to=rfaraz5678@gmail.com";
  const lnks = [
    {icon:"📧",lbl:"Email",val:"rfaraz5678@gmail.com",href:GMAIL},
    {icon:"💼",lbl:"GitHub",val:"github.com/mhd-faraz",href:"https://github.com/mhd-faraz"},
    {icon:"🔗",lbl:"LinkedIn",val:"linkedin.com/in/mohammad-faraz-a27176223",href:"https://linkedin.com/in/mohammad-faraz-a27176223/"},
  ];

  return (
    <section id="contact" className="sec ct-sec" ref={ref}>
      <div className="inn">
        <div className="ctg">
          {/* LEFT */}
          <div>
            <div className="lbl rev">Get In Touch</div>
            <h2 className="cttit rev">Contact <span style={{color:"#00d4ff"}}>Me</span></h2>
            <p className="ctdsc rev" style={{textTransform:"none",fontSize:15,fontWeight:400,letterSpacing:0,color:"rgba(216,228,240,.5)"}}>
              Discuss a project or just want to say hi?<br/>My inbox is open for all.
            </p>
            <a href="https://mail.google.com/mail/?view=cm&to=rfaraz5678@gmail.com" target="_blank" rel="noreferrer" style={{fontFamily:"'Inter',sans-serif",fontSize:22,fontWeight:700,color:"rgba(216,228,240,.7)",marginBottom:28,letterSpacing:"-.01em",textDecoration:"none",display:"block",transition:"color .25s"}}
              onMouseEnter={e=>e.currentTarget.style.color="#00d4ff"}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(216,228,240,.7)"}
              className="rev">
              rfaraz5678@gmail.com
            </a>
            <div className="ctlks rev">
              {lnks.map(l=>(
                <a key={l.lbl} href={l.href} target="_blank" rel="noreferrer" className="ctlk">
                  <div className="ctico">{l.icon}</div>
                  <div><div className="ctlbl">{l.lbl}</div><div className="ctval">{l.val}</div></div>
                  <span className="ctar">→</span>
                </a>
              ))}
            </div>
            <div className="avb" style={{marginTop:24}}>
              <div className="avhd"><span className="pls"/> Currently Available</div>
              <p>Actively looking for Full Stack / Frontend Developer roles. Open to remote, hybrid, or on-site positions.</p>
            </div>
          </div>

          {/* RIGHT — Envelope SVG */}
          <div className="rev-r" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:32}}>
            <div className="ct-env-wrap">
              {/* Floating shapes */}
              <div className="ct-shape ct-sh1"/>
              <div className="ct-shape ct-sh2"/>
              <div className="ct-shape ct-sh3"/>
              <div className="ct-shape ct-sh4"/>
              {/* Envelope SVG */}
              <svg width="220" height="180" viewBox="0 0 220 180" fill="none" className="ct-env">
                <defs>
                  <linearGradient id="envG" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7b2fff"/>
                    <stop offset="100%" stopColor="#5b0fff"/>
                  </linearGradient>
                  <filter id="envGlow">
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                {/* shadow */}
                <ellipse cx="110" cy="168" rx="72" ry="8" fill="rgba(123,47,255,.2)"/>
                {/* envelope body */}
                <rect x="18" y="44" width="184" height="120" rx="10" fill="url(#envG)" filter="url(#envGlow)"/>
                {/* darker bottom flap */}
                <path d="M18 120 L110 160 L202 120 L202 154 Q202 164 192 164 L28 164 Q18 164 18 154 Z" fill="rgba(0,0,0,.25)"/>
                {/* white paper peek */}
                <rect x="58" y="30" width="104" height="70" rx="5" fill="white" opacity="0.92"/>
                <rect x="68" y="42" width="60" height="4" rx="2" fill="#e0e0e0"/>
                <rect x="68" y="52" width="84" height="3" rx="1.5" fill="#e8e8e8"/>
                <rect x="68" y="61" width="72" height="3" rx="1.5" fill="#e8e8e8"/>
                <rect x="68" y="70" width="50" height="3" rx="1.5" fill="#e8e8e8"/>
                {/* envelope V flap */}
                <path d="M18 44 L110 112 L202 44" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" fill="none"/>
                {/* top fold lines */}
                <path d="M18 44 L18 44 L110 112 L202 44" fill="rgba(0,0,0,.12)"/>
                {/* bottom diagonal lines */}
                <path d="M18 164 L90 120" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
                <path d="M202 164 L130 120" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
              </svg>
            </div>
            <a href="https://mail.google.com/mail/?view=cm&to=rfaraz5678@gmail.com" target="_blank" rel="noreferrer" className="hbtn" style={{width:"100%",justifyContent:"center",maxWidth:280}}>
              ✉ Send a Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
// ─── PRELOADER ────────────────────────────────────────────────────────────────
function Preloader({ onDone }) {
  const cvs = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = cvs.current; if (!canvas) return;
    const W = window.innerWidth, H = window.innerHeight;
    const R = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
    R.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    R.setSize(W, H);
    R.setClearColor(0x000000, 1);
    const S = new THREE.Scene();
    const C = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    C.position.set(0, 0, 7);

    // Build 3 isometric-style cubes arranged like the screenshot (pyramid: top, bottom-left, bottom-right)
    const boxGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);

    const mkCube = (color, ex, ey) => {
      const edges = new THREE.EdgesGeometry(boxGeo);
      const mat = new THREE.LineBasicMaterial({ color, linewidth: 1.5 });
      const wire = new THREE.LineSegments(edges, mat);
      const solid = new THREE.Mesh(boxGeo, new THREE.MeshBasicMaterial({ color: 0x000000 }));
      const grp = new THREE.Group();
      grp.add(solid); grp.add(wire);
      grp.position.set(ex, ey, 0);
      grp.rotation.x = 0.6; grp.rotation.y = Math.PI / 4;
      S.add(grp);
      return grp;
    };

    // 3 cubes: top center, bottom-left, bottom-right (like 3-cube logo)
    const c1 = mkCube(0xffffff, 0, 1.05);
    const c2 = mkCube(0xffffff, -1.05, -0.55);
    const c3 = mkCube(0xffffff, 1.05, -0.55);
    const cubes = [c1, c2, c3];

    // entrance: start invisible, scale from 0
    cubes.forEach(g => { g.scale.set(0, 0, 0); });

    let frame = 0, animId;
    const anim = () => {
      animId = requestAnimationFrame(anim);
      frame++;

      // staggered scale-in
      cubes.forEach((g, i) => {
        const startF = i * 8;
        if (frame > startF) {
          const t = Math.min((frame - startF) / 18, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          g.scale.setScalar(ease);
        }
      });

      // gentle continuous rotation once loaded
      if (frame > 40) {
        const s = (frame - 40) * 0.004;
        cubes.forEach(g => { g.rotation.y = Math.PI / 4 + Math.sin(s) * 0.3; });
      }

      R.render(S, C);
    };
    anim();

    // exit after 2.6s
    const exitT = setTimeout(() => {
      const wrap = wrapRef.current; if (!wrap) return;
      wrap.style.transition = "opacity .65s ease, transform .65s ease";
      wrap.style.opacity = "0";
      wrap.style.transform = "scale(1.04)";
      setTimeout(() => {
        cancelAnimationFrame(animId);
        R.dispose();
        onDone();
      }, 680);
    }, 2600);

    return () => { clearTimeout(exitT); cancelAnimationFrame(animId); R.dispose(); };
  }, [onDone]);

  return (
    <div ref={wrapRef} style={{
      position:"fixed",inset:0,zIndex:9999,
      background:"#000000",
      display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",gap:36,
    }}>
      <canvas ref={cvs} style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/>
      {/* signature tag */}
      <div style={{
        position:"relative",zIndex:1,
        marginTop:220,
        display:"flex",alignItems:"center",gap:10,
        animation:"plFadeIn .6s ease 1.2s both",
      }}>
        <span style={{fontFamily:"'Space Mono',monospace",fontSize:16,color:"rgba(255,255,255,.35)",letterSpacing:2}}>&lt;</span>
        <span style={{
          fontFamily:"Georgia,'Times New Roman',serif",
          fontSize:38,fontStyle:"italic",fontWeight:400,
          color:"rgba(255,255,255,.88)",letterSpacing:2,
          textShadow:"0 0 30px rgba(255,255,255,.15)",
        }}>Mohammad Faraz</span>
        <span style={{fontFamily:"'Space Mono',monospace",fontSize:16,color:"rgba(255,255,255,.35)",letterSpacing:2}}>/&gt;</span>
      </div>
      <style>{`
        @keyframes plFadeIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
      `}</style>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{const l=new Lenis({smooth:true,duration:1.2});const r=t=>{l.raf(t);requestAnimationFrame(r);};requestAnimationFrame(r);return()=>l.destroy();},[]);
  return (
    <>
      <Styles/>
      {!loaded && <Preloader onDone={()=>setLoaded(true)}/>}
      <div style={{visibility: loaded ? "visible" : "hidden", opacity: loaded ? 1 : 0, transition:"opacity .5s ease"}}>
      <Hero/>
      <div className="sdiv"/>
      <About/>
      <div className="sdiv"/>
      <Skills/>
      <div className="sdiv"/>
      <Experience/>
      <div className="sdiv"/>
      <Projects/>
      <div className="sdiv"/>
      <Achievements/>
      <div className="sdiv"/>
      <Education/>
      <div className="sdiv"/>
      <Contact/>
      <footer className="foot">
        <div className="flo"><span className="fd">&lt;</span>MF<span className="fd">/&gt;</span></div>
        <div className="fco">© {new Date().getFullYear()} Mohammad Faraz — Built with React & Three.js</div>
        <div className="flk">
          <a href="https://github.com/mhd-faraz" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/mohammad-faraz-a27176223/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://mail.google.com/mail/?view=cm&to=rfaraz5678@gmail.com" target="_blank" rel="noreferrer">Email</a>
        </div>
      </footer>
      </div>
    </>
  );
}