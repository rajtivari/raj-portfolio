import { CERTIFICATES } from "../data/siteContent";
import "./Certificates.css";
 
export default function Certificates() {
  return (
    <section id="certificates" className="certificates">
      <div className="section-inner">
        <span className="section-kicker">06 / CREDENTIALS</span>
        <h2 className="section-title">Certificates</h2>
 
        {CERTIFICATES.length === 0 ? (
          <p className="certificates-empty">
            No certificates added yet — add entries to{" "}
            <code>CERTIFICATES</code> in <code>src/data/siteContent.js</code>.
          </p>
        ) : (
          <div className="certificates-grid">
            {CERTIFICATES.map((c) => (
              <article key={c.title} className="certificate-card hud-panel">
                <h3>{c.title}</h3>
                <p className="certificate-meta">
                  {c.issuer} — {c.date}
                </p>
                {c.credentialId && (
                  <p className="certificate-id">ID: {c.credentialId}</p>
                )}
                {c.url && (
                  <a href={c.url} className="certificate-link">
                    View Certificate →
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
 