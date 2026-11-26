import React, { useState, useEffect, useRef } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundDataParticles from './components/BackgroundDataParticles';
import ExplainGuide from './components/ExplainGuide';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id || entry.target.getAttribute('data-section') || 'hero';
            setActiveSection(sectionId);
          }
        });
      },
      { threshold: 0.25 }
    );

    const sections = document.querySelectorAll('section, main#top, [data-section]');
    sections.forEach((section) => observer.current?.observe(section));

    return () => {
      observer.current?.disconnect();
    };
  }, [introFinished]);

  return (
    <div className="portfolio-app">
      <BackgroundDataParticles />

      {!introFinished && (
        <WelcomeScreen onComplete={() => setIntroFinished(true)} />
      )}

      <Header activeSection={activeSection} />

      <main id="top" data-section="hero">
        <Hero isSpeaking={isSpeaking} setIsSpeaking={setIsSpeaking} />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      <Footer />

      <ExplainGuide 
        activeSection={activeSection} 
        isSpeaking={isSpeaking} 
        setIsSpeaking={setIsSpeaking} 
      />
    </div>
  );
}
