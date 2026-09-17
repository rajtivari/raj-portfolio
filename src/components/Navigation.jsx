import { useEffect, useState } from "react";
import "./Navigation.css";
 
const SECTIONS = [
  { id: "home", num: "01", label: "HOME" },
  { id: "about", num: "02", label: "ABOUT" },
  { id: "ai-core", num: "03", label: "AI CORE" },
  { id: "projects", num: "04", label: "PROJECTS" },
  { id: "skills", num: "05", label: "SKILLS" },
  { id: "certificates", num: "06", label: "CERTIFICATES" },
  { id: "experience", num: "07", label: "EXPERIENCE" },
  { id: "contact", num: "08", label: "CONTACT" },
];
 
export default function Navigation() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
 
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
 
    return () => observer.disconnect();
  }, []);
 
  const goTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
 
  return (
    <>
      <nav className="nav-desktop" aria-label="Section navigation">
        <ul>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                className={active === s.id ? "nav-item nav-item--active" : "nav-item"}
                onClick={() => goTo(s.id)}
              >
                <span className="nav-num">{s.num}</span>
                <span className="nav-label">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
 
      <button
        className="nav-mobile-toggle"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>
 
      {mobileOpen && (
        <div className="nav-mobile-panel">
          <ul>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  className={active === s.id ? "nav-item nav-item--active" : "nav-item"}
                  onClick={() => goTo(s.id)}
                >
                  <span className="nav-num">{s.num}</span>
                  <span className="nav-label">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
 