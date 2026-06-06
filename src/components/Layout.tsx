import type { ReactNode } from 'react';
import { LanguageToggle } from './LanguageToggle';
import type { Language } from '../i18n/strings';

type LayoutProps = {
  appName: string;
  tagline: string;
  intro: string;
  privacy: string;
  privacyTitle: string;
  privacyItems: string[];
  toolSummaryLabel: string;
  toolSummaries: { id: string; name: string; summary: string }[];
  language: Language;
  onLanguageChange: (language: Language) => void;
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
  children: ReactNode;
};

export function Layout({
  appName,
  tagline,
  intro,
  privacy,
  privacyTitle,
  privacyItems,
  toolSummaryLabel,
  toolSummaries,
  language,
  onLanguageChange,
  tabs,
  activeTab,
  onTabChange,
  children,
}: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <h1>{appName}</h1>
          <p>{tagline}</p>
          <p className="intro-text">{intro}</p>
          <strong>{privacy}</strong>
        </div>
        <LanguageToggle language={language} onChange={onLanguageChange} />
      </header>

      <section className="landing-summary" aria-labelledby="privacy-title">
        <div className="privacy-summary">
          <h2 id="privacy-title">{privacyTitle}</h2>
          <ul>
            {privacyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="tool-summary" aria-label={toolSummaryLabel}>
          {toolSummaries.map((tool) => (
            <article key={tool.id} className={activeTab === tool.id ? 'active' : ''}>
              <h3>{tool.name}</h3>
              <p>{tool.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <nav className="tabs" aria-label="Tools" role="tablist">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            className={activeTab === tab.id ? 'active' : ''}
            aria-controls={`panel-${tab.id}`}
            aria-selected={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main>{children}</main>
    </div>
  );
}
