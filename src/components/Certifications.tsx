import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const issuer = 'Analytics Vidhya';
const certs = [
  { title: "Essentials of Excel", date: "Nov 2025", src: "certs/cert-1.webp" },
  { title: "The Complete Power BI Blueprint", date: "Jan 2026", src: "certs/cert-2.webp" },
  { title: "Data Analysis using SQL", date: "Feb 2026", src: "certs/cert-3.webp" },
  { title: "Introduction to Python", date: "Feb 2026", src: "certs/cert-4.webp" },
  { title: "Python for Data Science", date: "Mar 2026", src: "certs/cert-5.webp" },
  { title: "EDA & Statistics for Data Science", date: "Mar 2026", src: "certs/cert-6.webp" },
  { title: "Building Your First ML Model", date: "Mar 2026", src: "certs/cert-7.webp" },
  { title: "Foundational ML Algorithms I", date: "Mar 2026", src: "certs/cert-8.webp" },
  { title: "Foundational ML Algorithms II", date: "Mar 2026", src: "certs/cert-9.webp" },
];

const others = [
  'AWS Academy Cloud Foundations',
  'Introducing SAP Business Data Cloud (course completion)',
  'Discovering SAP IBP Foundation: Sales and Operations Process',
];

export default function Certifications() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const url = (p: string) => `${import.meta.env.BASE_URL}${p}`;

  return (
    <section className="section cert-section" id="certifications" data-section="certifications">
      <div className="system-panel">
        <div className="panel-header">
          <span className="section-label">07 / CERTIFICATIONS</span>
          <span className="system-tag">{certs.length} COURSE CERTIFICATES</span>
        </div>
        <h2 className="section-title">Courses <em>completed.</em></h2>
        <div className="cert-grid">
          {certs.map((c, i) => (
            <button type="button" className="cert-card" key={c.src} onClick={() => setOpen(i)} aria-label={`View certificate: ${c.title}`}>
              <img src={url(c.src)} alt={`${c.title} certificate`} loading="lazy" width={1100} height={778} />
              <span className="cert-title">{c.title}</span>
              <span className="cert-meta">{issuer} · {c.date}</span>
            </button>
          ))}
        </div>
        <p className="cert-others"><strong>Also completed:</strong> {others.join(' · ')}</p>
      </div>

      {open !== null && (
        <div className="cert-lightbox" role="dialog" aria-modal="true" aria-label={certs[open].title} onClick={() => setOpen(null)}>
          <button type="button" className="cert-close" aria-label="Close" onClick={() => setOpen(null)}><X size={22} /></button>
          <img src={url(certs[open].src)} alt={`${certs[open].title} certificate`} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
