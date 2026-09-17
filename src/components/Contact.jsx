import { PROFILE } from "../data/siteContent";
import "./Contact.css";
 
export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="section-inner contact-inner">
        <span className="section-kicker">08 / CONNECT</span>
        <h2 className="contact-title">LET'S BUILD SOMETHING</h2>
 
        <div className="contact-links">
          <a href={`mailto:${PROFILE.email}`}>Email</a>
          <a href={PROFILE.github}>GitHub</a>
          <a href={PROFILE.linkedin}>LinkedIn</a>
          <a href={PROFILE.resumeUrl}>Resume</a>
        </div>
 
        <p className="contact-footer">
          © {new Date().getFullYear()} {PROFILE.name} — {PROFILE.location}
        </p>
      </div>
    </section>
  );
}
 