import { TIMELINE } from "../data/siteContent";
import "./Experience.css";
 
export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="section-inner">
        <span className="section-kicker">07 / TIMELINE</span>
        <h2 className="section-title">Experience &amp; Education</h2>
 
        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content hud-panel">
                <span className="timeline-type">{item.type}</span>
                <h3>{item.title}</h3>
                <p className="timeline-org">
                  {item.org} · {item.date}
                </p>
                {item.detail && <p className="timeline-detail">{item.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 