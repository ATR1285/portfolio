import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  activeSection?: string;
  onTalkClick?: () => void;
}

export default function Header({ activeSection, onTalkClick }: HeaderProps) {
  return (
    <header className="nav">
      <a className="brand" href="#top">
        RICHARD<span> A T</span>
      </a>

      <nav className="nav-links">
        <a href="#objective" className={activeSection === 'objective' ? 'active' : ''}>OBJECTIVE</a>
        <a href="#about" className={activeSection === 'about' ? 'active' : ''}>ABOUT</a>
        <a href="#capabilities" className={activeSection === 'capabilities' ? 'active' : ''}>SKILLS</a>
        <a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>EXPERIENCE</a>
        <a href="#work" className={activeSection === 'work' ? 'active' : ''}>PROJECTS</a>
        <a href="#education" className={activeSection === 'education' ? 'active' : ''}>EDUCATION</a>
        <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>CONTACT</a>
      </nav>

      <div className="nav-right">
        <div className="nav-status">
          <i /> <span>SYSTEM ONLINE</span>
        </div>
      </div>

      <button className="menu" aria-label="Open navigation menu">
        <Menu size={22} />
      </button>
    </header>
  );
}
