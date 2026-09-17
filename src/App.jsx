import CinematicIntro from "./components/CinematicIntro";
import Navigation from "./components/Navigation";
import AICore from "./components/AICore";
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
      <AICore />
      <Projects />
      <Skills />
      <Certificates />
      <Experience />
      <Contact />
    </>
  );
}