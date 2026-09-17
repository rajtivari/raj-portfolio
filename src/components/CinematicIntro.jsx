import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CINEMATIC_FRAMES, FRAME_COUNT } from "../data/cinematicFrames";
import "./CinematicIntro.css";
 
gsap.registerPlugin(ScrollTrigger);
 
// Narrative overlay steps. Each has a scroll-progress window [start, end]
// (0..1 across the whole pinned sequence) during which it's visible.
// side: "left" | "right" | "center"
const STEPS = [
  {
    id: "identity",
    side: "right",
    range: [0.28, 0.42],
    label: "IDENTITY DETECTED",
    heading: "RAJ TIVARI",
    body: "Software Developer",
  },
  {
    id: "mission",
    side: "left",
    range: [0.44, 0.56],
    label: "MISSION",
    body: "Building at the intersection of software, AI, and the web — focused on solving real problems and shipping things people actually use.",
  },
  {
    id: "system",
    side: "right",
    range: [0.58, 0.7],
    label: "CURRENT SYSTEM",
    tags: ["DEVELOPMENT", "AI / MACHINE LEARNING", "FULL STACK", "CREATIVE WEB EXPERIENCES"],
  },
  {
    id: "objective",
    side: "left",
    range: [0.72, 0.84],
    label: "OBJECTIVE",
    body: "Looking for opportunities to learn, build, and contribute as a software developer.",
  },
  {
    id: "aicore",
    side: "center",
    range: [0.87, 1],
    label: "AI CORE",
    heading: "SYSTEM ONLINE",
    tags: ["WEB DEVELOPMENT", "ARTIFICIAL INTELLIGENCE", "PROBLEM SOLVING", "CREATIVE DEVELOPMENT"],
  },
];
 
// fades in over the first 12% of its range and out over the last 12%
function stepOpacity(progress, [start, end]) {
  if (progress <= start || progress >= end) return 0;
  const span = end - start;
  const fade = Math.min(span * 0.35, 0.06);
  if (progress < start + fade) return (progress - start) / fade;
  if (progress > end - fade) return (end - progress) / fade;
  return 1;
}
 
export default function CinematicIntro() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
 
  // Preload all frames once
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const imgs = new Array(FRAME_COUNT);
 
    CINEMATIC_FRAMES.forEach((src, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      img.onload = img.onerror = () => {
        if (cancelled) return;
        loadedCount += 1;
        setLoaded(loadedCount);
        if (loadedCount === FRAME_COUNT) setReady(true);
      };
      imgs[i] = img;
    });
 
    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
  }, []);
 
  // Draw current frame to canvas, cover-fit
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
 
    const ctx = canvas.getContext("2d");
    const { width: cw, height: ch } = canvas;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
 
    let dw, dh, dx, dy;
    if (ir > cr) {
      dh = ch;
      dw = ch * ir;
      dx = (cw - dw) / 2;
      dy = 0;
    } else {
      dw = cw;
      dh = cw / ir;
      dx = 0;
      dy = (ch - dh) / 2;
    }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };
 
  // Resize canvas to viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(frameIndexRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
 
  // Scroll-scrub pin
  useEffect(() => {
    if (!ready) return;
 
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
 
    const wrapper = wrapperRef.current;
 
    if (reducedMotion) {
      drawFrame(FRAME_COUNT - 1);
      frameIndexRef.current = FRAME_COUNT - 1;
      setProgress(1);
      return;
    }
 
    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      pin: wrapper.querySelector(".cinematic-sticky"),
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);
        const idx = Math.min(
          FRAME_COUNT - 1,
          Math.round(p * (FRAME_COUNT - 1))
        );
        if (idx !== frameIndexRef.current) {
          frameIndexRef.current = idx;
          drawFrame(idx);
        }
      },
    });
 
    drawFrame(0);
 
    return () => st.kill();
  }, [ready]);
 
  return (
    <section
      ref={wrapperRef}
      className="cinematic-intro"
      style={{ height: "600vh" }}
    >
      <div id="home" className="cinematic-anchor" style={{ top: "0vh" }} />
      <div id="about" className="cinematic-anchor" style={{ top: "160vh" }} />
      <div className="cinematic-sticky">
        <canvas ref={canvasRef} className="cinematic-canvas" />
 
        {!ready && (
          <div className="cinematic-loader">
            <div className="cinematic-loader-bar">
              <div
                className="cinematic-loader-fill"
                style={{ width: `${(loaded / FRAME_COUNT) * 100}%` }}
              />
            </div>
            <span>LOADING SEQUENCE — {Math.round((loaded / FRAME_COUNT) * 100)}%</span>
          </div>
        )}
 
        <div className="cinematic-overlay">
          {STEPS.map((step) => {
            const o = stepOpacity(progress, step.range);
            if (o <= 0.001) return null;
            return (
              <div
                key={step.id}
                className={`cinematic-step cinematic-step--${step.side}`}
                style={{
                  opacity: o,
                  transform: `translateY(${(1 - o) * 16}px)`,
                }}
              >
                <span className="cinematic-step-label">{step.label}</span>
                {step.heading && (
                  <h2 className="cinematic-step-heading">{step.heading}</h2>
                )}
                {step.body && <p className="cinematic-step-body">{step.body}</p>}
                {step.tags && (
                  <ul className="cinematic-step-tags">
                    {step.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
 
        <div className="cinematic-scroll-hint" style={{ opacity: progress < 0.05 ? 1 : 0 }}>
          SCROLL
        </div>
      </div>
    </section>
  );
}
 