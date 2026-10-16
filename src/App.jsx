import CinematicIntro from "./components/CinematicIntro";
import Navigation from "./components/Navigation";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <Navigation />
      <CinematicIntro />
      <Projects />
      <Skills />
      <Certificates />
      <Experience />
      <Contact />
    </>
  );
}
