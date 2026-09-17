import { useEffect, useRef } from "react";
import "./AICore.css";
 
const TAGS = [
  "WEB DEVELOPMENT",
  "ARTIFICIAL INTELLIGENCE",
  "PROBLEM SOLVING",
  "CREATIVE DEVELOPMENT",
];
 
export default function AICore() {
  const canvasRef = useRef(null);
 
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];
    let w, h, cx, cy, radius;
 
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      cx = w / 2;
      cy = h / 2;
      radius = Math.min(w, h) * 0.22;
 
      particles = Array.from({ length: 70 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const dist = radius * (1.1 + Math.random() * 0.9);
        return {
          angle,
          dist,
          speed: (Math.random() - 0.5) * 0.006,
          size: Math.random() * 1.6 + 0.4,
        };
      });
    };
 
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
 
      // core glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.4);
      grad.addColorStop(0, "rgba(0,255,176,0.55)");
      grad.addColorStop(0.5, "rgba(0,255,176,0.12)");
      grad.addColorStop(1, "rgba(0,255,176,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.4, 0, Math.PI * 2);
      ctx.fill();
 
      // core body
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = "#04120d";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,255,176,0.7)";
      ctx.lineWidth = 1;
      ctx.stroke();
 
      // orbit rings
      [1, 1.4, 1.8].forEach((mult, i) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * 0.0002 * (i % 2 === 0 ? 1 : -1));
        ctx.scale(1, 0.34);
        ctx.beginPath();
        ctx.arc(0, 0, radius * mult, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(127,220,255,${0.35 - i * 0.08})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      });
 
      // particles
      particles.forEach((p) => {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.dist;
        const y = cy + Math.sin(p.angle) * p.dist * 0.4;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(127,220,255,0.8)";
        ctx.fill();
      });
 
      raf = requestAnimationFrame(draw);
    };
 
    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
 
  return (
    <section id="ai-core" className="ai-core">
      <div className="section-inner ai-core-inner">
        <span className="section-kicker">03 / SYSTEM</span>
        <h2 className="section-title">AI CORE — SYSTEM ONLINE</h2>
 
        <div className="ai-core-stage">
          <canvas ref={canvasRef} className="ai-core-canvas" />
        </div>
 
        <ul className="ai-core-tags">
          {TAGS.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
 