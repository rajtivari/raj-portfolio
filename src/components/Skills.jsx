import { SKILLS } from "../data/siteContent";
import "./Skills.css";
 
export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="section-inner">
        <span className="section-kicker">05 / CAPABILITIES</span>
        <h2 className="section-title">Skills</h2>
 
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category} className="skills-card hud-panel">
              <h3>{category}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 