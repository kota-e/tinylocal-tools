import type { ReactNode } from 'react';
import { LanguageToggle } from './LanguageToggle';
import type { Language } from '../i18n/strings';

type LayoutProps = {
  appName: string;
  tagline: string;
  privacy: string;
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
  privacy,
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
          <strong>{privacy}</strong>
        </div>
        <LanguageToggle language={language} onChange={onLanguageChange} />
      </header>

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
