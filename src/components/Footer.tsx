import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <a className="brand" href="#top">Richard<span> A T</span></a>
      <p>© 2026 Richard A. T. Built around data, decisions, and momentum.</p>
      <div className="social-links">
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
    </footer>
  );
}
