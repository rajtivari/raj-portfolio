import { PROJECTS } from "../data/siteContent";
import "./Projects.css";
 
export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="section-inner">
        <span className="section-kicker">04 / WORK</span>
        <h2 className="section-title">Projects</h2>
 
        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <article key={p.name} className="project-card hud-panel">
              <h3>{p.name}</h3>
              <p className="project-desc">{p.description}</p>
              <ul className="project-tech">
                {p.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="project-links">
                <a href={p.github} className="project-link">
                  GitHub →
                </a>
                <a href={p.demo} className="project-link">
                  Live Demo →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
 