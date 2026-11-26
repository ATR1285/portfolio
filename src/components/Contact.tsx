import React from 'react';
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';

export default function Contact() {
  return (
    <section className="contact" id="contact" data-section="contact">
      <p className="eyebrow"><Sparkles size={15}/> OPEN TO NEW OPPORTUNITIES</p>
      <h2>Have a data challenge<br/>worth solving?</h2>
      <a href="mailto:richardat125@gmail.com">Let’s make it useful <ArrowUpRight size={24}/></a>
      <div className="contact-meta">
        <span><MapPin size={15}/> Global remote / hybrid</span>
        <span><Mail size={15}/> richardat125@gmail.com</span>
      </div>
      <div className="social-links" style={{ marginTop: '36px' }}>
        <a 
          href="mailto:richardat125@gmail.com" 
          aria-label="Email"
          className="social-btn flex-center"
          id="email"
        >
          <Mail size={22} />
          <span>Email</span>
        </a>
        <a 
          href={`${import.meta.env.BASE_URL}Richard_AT_Resume.pdf`} 
          target="_blank" 
          rel="noreferrer" 
          aria-label="Resume"
          className="social-btn flex-center"
          id="resume"
        >
          <Download size={22} />
          <span>Resume</span>
        </a>
        <a 
          href="https://linkedin.com/in/richard-a-t" 
          target="_blank" 
          rel="noreferrer" 
          aria-label="LinkedIn"
          className="social-btn flex-center"
          id="linkedin"
        >
          <Linkedin size={22} />
          <span>LinkedIn</span>
        </a>
        <a 
          href="https://github.com/ATR1285" 
          target="_blank" 
          rel="noreferrer" 
          aria-label="GitHub"
          className="social-btn flex-center"
          id="github"
        >
          <Github size={22} />
          <span>GitHub</span>
        </a>
      </div>
    </section>
  );
}
